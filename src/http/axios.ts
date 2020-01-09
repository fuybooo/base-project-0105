import Vue from 'vue'
import axios, { AxiosInstance } from 'axios'
import { dc, deepCompare, deepTrim, gc, lg } from '@/util/fns/fns'
import { isDev, isProd } from '@/config/config.fn'
import { KEY_OPEN_STATIC, KEY_STATIC_INCLUDE, KEY_TOKEN } from '@/models/keys/keys'
import { debugReq } from '@/http/debugger'
import { baseURL, closeStatic, openStatic } from '@/http/http.model'
import { IUrl, staticPath, urlType } from '@/models/urls/url-util'

export function create (customOptions?: any, options?: any): AxiosInstance {
  const localAxios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    ...(options || {}),
  })
  localAxios.interceptors.request.use((req) => {
    if (isDev()) {
      debugReq(req)
    }
    const token = lg(KEY_TOKEN)
    if (token) {
      req.headers['x-access-token'] = token
    }
    return req
  })
  localAxios.interceptors.response.use((res) => {
    if (res.data.code === 40011) {
      if (isProd()) {
        // 正式环境跳转到登录界面
        window._vueInstance_.$router.push({ name: 'login' })
      }
    }
    if (res.data.code === 200) {
    }
    return res.data
  })
  return localAxios
}

const getSafeUrl = (url: string): string => {
  // return url.endsWith('/') ? url : url + '/'
  return url
}
export const getUrl = (url: urlType, closeStatic = false): IUrl => {
  let urlConfig: IUrl
  if (typeof url === 'string') {
    urlConfig = { url: getSafeUrl(url), isStatic: false }
  } else if (url.isStatic && !closeStatic) {
    urlConfig = {
      url: (url.staticPath || staticPath) + (url.prefix || '') + url.url + '.json',
      isStatic: true,
      isCommon: url.isCommon,
    }
  } else {
    urlConfig = { url: getSafeUrl((url.prefix || '') + url.url), isStatic: false }
  }
  return urlConfig
}

function getAxiosRes (url: urlType, params: any, fn: (closeStatic: boolean) => any, useCache = false) {
  const urlConfig = getUrl(url)
  const axiosResFn = () => {
    if (urlConfig.isStatic) {
      let staticUrl = urlConfig.url
      const successUrl = staticPath + 'result/success.json'
      const errorUrl = staticPath + 'result/error.json'
      if (urlConfig.isCommon) {
        staticUrl = successUrl
      }
      return create({
        url: urlConfig.url,
        data: params.params,
        // @ts-ignore
        _this: this,
        useCache,
      }, { baseURL: '/' }).get(staticUrl, {
        params: {
          ...params.params, url: urlConfig.url,
        },
      })
    } else {
      return fn(true)
    }
  }
  // 强制开启所有静态数据
  if (openStatic) {
    return axiosResFn()
  }
  // 在没有设置 localStorage 时，开发环境开启静态数据 生产环境关闭静态数据
  // 若想在生产环境使用静态数据，或者想在开发环境使用后台数据 则可以通过设置 localStorage 达到目的
  if (closeStatic) {
    // 强制开启静态数据
    if (lg(KEY_OPEN_STATIC) === '1') {
      return axiosResFn()
    } else if (lg(KEY_STATIC_INCLUDE)) {
      // 在关闭静态数据，且没有强制开启所有静态数据d情况下，判断是否有强制开启部分静态数据的配置
      try {
        const includeList = JSON.parse(lg(KEY_STATIC_INCLUDE))
        if (Array.isArray(includeList)) {
          if (includeList.some(item => urlConfig.isStatic && urlConfig.url.startsWith(staticPath + item))) {
            return axiosResFn()
          }
        } else {
        }
      } catch (e) {
        throw new Error(`KEY_STATIC_INCLUDE 应该配置为数组：localStorage.setItem('S_FE_STATIC_INCLUDE', '["campus/", "staff/"]')`)
      }
    }
  } else {
    // 判断是否需要强制关闭静态数据
    if (lg(KEY_OPEN_STATIC) !== '0') {
      return axiosResFn()
    }
  }
  return fn(true)
}

const methods: any = {
  get (url: urlType, params = {}, axiosInstance: AxiosInstance, useCache: boolean): any {
    return getAxiosRes.bind(this)(url, { params }, (closeStatic = false) => axiosInstance.get(getUrl(url, closeStatic).url, { params }), useCache)
  },
  post (url: urlType, data = {}, axiosInstance: AxiosInstance, useCache: boolean): any {
    return getAxiosRes.bind(this)(url, { params: data }, (closeStatic = false) => axiosInstance.post(getUrl(url, closeStatic).url, data), useCache)
  },
  put (url: urlType, data = {}, axiosInstance: AxiosInstance): any {
    return getAxiosRes(url, { params: data }, (closeStatic = false) => axiosInstance.put(getUrl(url, closeStatic).url, data))
  },
  delete (url: urlType, data = {}, axiosInstance: AxiosInstance): any {
    return getAxiosRes(url, { params: data }, (closeStatic = false) => axiosInstance.delete(getUrl(url, closeStatic).url, data))
  },
}

function findCache (url: urlType, data: any) {
  // @ts-ignore
  const me = this
  const cacheData = me.$store.state.cache[getUrl(url).url]
  if (cacheData && deepCompare(cacheData.params, deepTrim(data, true))) {
    return cacheData.result
  }
}

// @ts-ignore
function request (url: urlType, data = {}, useCache = false, method = 'post', axiosInstance?) {
  // @ts-ignore
  const me = this
  const axiosInst = axiosInstance || create({
    url,
    data,
    useCache,
    _this: me,
  })
  if (useCache) {
    // 如果使用缓存策略，则先判断是否有可用的缓存，若有，则直接返回缓存内容，否则发送请求获取数据，并将数据加入到缓存
    const cacheResult = findCache.bind(me)(url, data)
    if (cacheResult) {
      return new Promise(resolve => resolve(cacheResult))
    }
  }
  return methods[method].bind(me)(url, deepTrim(data, true), axiosInst, useCache)
}

export default {
  request,
  create,
}
// 在vue原型上挂载常用函数
Vue.prototype.$req = request

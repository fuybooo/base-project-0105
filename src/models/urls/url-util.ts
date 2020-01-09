export interface IUrl {
  url: string
  prefix?: string
  isStatic?: boolean
  staticPath?: string
  isCommon?: boolean
}

/**
 * 需要根据打包时的配置设置静态资源的路径
 */
export const staticPath = '/mock/'
export declare type urlType = string | IUrl
export const prefix = {
  demo: 'demo/',
}

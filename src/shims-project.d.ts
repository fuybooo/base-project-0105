import { Vue } from 'vue/types/vue'
import { AxiosInstance } from 'axios'
import { HttpRes } from '@/models/common/models'
import { Urls } from '@/models/urls/urls'
import { urlType } from '@/models/urls/url-util'
import GlobalEvent from '@/models/global-event/global-event'

interface VueEvent {
  // tslint:disable-next-line:ban-types
  $on (event: string | string[], callback: Function): this

  $emit (event: string, ...args: any[]): this
}

interface Config {
  baseURL: string
  uploadUrl: string
}

declare module 'vue/types/vue' {
  interface Vue {
    // 自定义vue实例属性
    readonly $urls: Urls
    readonly $req: (url: urlType, data?: any, useCache?: boolean, method?: string, axiosInstance?: AxiosInstance) => Promise<any>
    // 自定义提示方法
    readonly $error: (message?: string, title?: string) => void
    readonly $success: (message?: string, title?: string) => void
    readonly $tip: (res: HttpRes) => void
    readonly $globalEvent: VueEvent
    readonly $event: GlobalEvent
    readonly $ws: WebSocket
    readonly $config: Config
  }
}
//
// declare global {
//   interface Window {
//     _vueInstance_: Vue
//     _projectPrefix_: string
//   }
// }

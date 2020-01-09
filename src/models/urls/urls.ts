import Vue from 'vue'
import { prefix, urlType } from '@/models/urls/url-util'

// 该接口与urls保持一致，保证使用this.$urls时能够通过"."得到提示
export interface Urls {
  demo: {
    table: {
      list: urlType
    }
  }
}

const urls: Urls = {
  demo: {
    table: {
      list: { url: 'table/list', isStatic: true, prefix: prefix.demo },
    },
  },
}
Vue.prototype.$urls = urls

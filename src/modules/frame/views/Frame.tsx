import { Component, Vue } from 'vue-property-decorator'
import Layout from '@/components/layout/Layout'
import FrameHeader from '@/modules/frame/views/FrameHeader'
import FrameAside from '@/modules/frame/views/FrameAside'
import FrameBreadcrumb from '@/modules/frame/views/FrameBreadcrumb'
import FrameMain from '@/modules/frame/views/FrameMain'
import '@/modules/frame/assets/scss/index.scss'

/**
 * 主框架布局方案
 */
@Component({})
export default class Frame extends Vue {
  public render () {
    return (
      <Layout headerClassName={ 'app-header-box' }>
        <FrameHeader slot={ 'header' }/>
        <Layout direction={ 'horizontal' } asideClassName={ 'app-aside-box' }>
          <FrameAside slot={ 'aside' }/>
          <Layout headerClassName={ 'app-breadcrumb-box' } mainClassName={ 'app-main-box' } headerHeight={ '44px' }>
            <FrameBreadcrumb slot={ 'header' }/>
            <FrameMain/>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

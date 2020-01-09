import { Component, Vue } from 'vue-property-decorator'
import Layout from '@/components/layout/Layout'

@Component({})
export default class LayoutExample extends Vue {
  /**
   * 这个例子展示了如何向组件批量传递属性
   */
  public props = {
    attrs: {
      headerHeight: '30px',
      headerClassName: 'header-class-name',
      direction: 'horizontal',
    }
  }
  public render () {
    return (
      <Layout {...this.props}>
        <div slot={'aside'}>
          aside
        </div>
        main
      </Layout>
    )
  }
}

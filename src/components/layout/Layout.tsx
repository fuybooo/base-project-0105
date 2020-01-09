import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Layout extends Vue {
  @Prop({ default: 'vertical' }) public direction!: string
  @Prop() public headerHeight!: string
  @Prop() public headerClassName!: string
  @Prop() public mainClassName!: string
  @Prop() public asideClassName!: string
  @Prop() public asideWidth!: string
  @Prop() public footerHeight!: string
  @Prop() public footerClassName!: string

  public render () {
    return (
      <el-container class={ 'h' } direction={ this.direction }>
        {
          this.$slots.header ? <el-header height={ this.headerHeight } class={ this.headerClassName }>
            { this.$slots.header }
          </el-header> : ''
        }
        {
          this.$slots.aside ? <el-aside width={ this.asideWidth } class={ this.asideClassName }>
            { this.$slots.aside }
          </el-aside> : ''
        }
        <el-main class={ this.mainClassName }>
          { this.$slots.default }
        </el-main>
        {
          this.$slots.footer ? <el-footer height={ this.footerHeight } class={ this.footerClassName }>
            { this.$slots.footer }
          </el-footer> : ''
        }
      </el-container>
    )
  }
}

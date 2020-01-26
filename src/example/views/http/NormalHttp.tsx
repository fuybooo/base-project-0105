import { Component, Vue } from 'vue-property-decorator'
import { HttpRes } from '@/models/common/models'

@Component({})
export default class NormalHttpExample extends Vue {
  public results = []

  public render () {
    return (
      <div>
        { JSON.stringify(this.results) }
      </div>
    )
  }

  public created () {
    this.$req(this.$urls.demo.table.list).then((res: HttpRes) => {
      if (res.code === 200) {
        this.results = res.data.results
      }
      // this.$tip(res)
    })
  }
}

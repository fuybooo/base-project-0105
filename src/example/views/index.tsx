import { Component, Vue } from 'vue-property-decorator'
import '@/example/assets/style.scss'

@Component({})
export default class Example extends Vue {
  public render () {
    return (
      <router-view class={'example-layout'}/>
    )
  }
}

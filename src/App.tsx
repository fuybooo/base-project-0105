import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {
  public render () {
    return (
      <router-view class={'app-' + this.$route.name}/>
    )
  }
}

import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class DialogExample extends Vue {
  public render () {
    return (
      <router-view/>
    )
  }
}

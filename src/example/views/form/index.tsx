import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class FormExample extends Vue {
  public render () {
    return (
      <router-view/>
    )
  }
}

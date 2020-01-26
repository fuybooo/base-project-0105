import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class TableExample extends Vue {
  public render () {
    return (
      <router-view/>
    )
  }
}

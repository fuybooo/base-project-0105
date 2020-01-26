import { Component, Vue } from 'vue-property-decorator'
import { Column } from '@/components/table/table.model'

@Component({})
export default class BaseTableExample extends Vue {
  public columns: Column[] = [
    {
      prop: 'id',
      label: 'id',
    },
    {
      prop: 'name',
      label: 'name',
    },
  ]
  public data = [
    {
      id: '1',
      name: 'p1',
    },
    {
      id: '2',
      name: 'p2',
    },
  ]

  public render () {
    return (
      <div>
        <div class={'example-introduce'}>这是最简单的表格使用方式</div>
        <base-table columns={ this.columns } data={ this.data }/>
      </div>
    )
  }
}

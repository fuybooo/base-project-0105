import { Component, Vue } from 'vue-property-decorator'
import { Column } from '@/components/table/table.model'

@Component({})
export default class FormTableExample extends Vue {
  public columns: Column[] = [
    {
      prop: 'id',
      label: 'id',
    },
    {
      prop: 'name',
      label: 'name',
      contentSlot: 'name',
    },
  ]
  public tableProps = {
    data: [
      {
        id: '1',
        name: 'p1',
      },
      {
        id: '2',
        name: 'p2',
      },
    ],
  }
  public queryForm = {}

  public events () {
    const me: any = this
    return {
      'row-click' ({ row }: any) {
        // console.log(row, me, 'row-click')
      },
    }
  }

  public render () {
    return (
      <div>
        <base-table columns={ this.columns }
                   params={ this.queryForm }
                   url={ this.$urls.demo.table.list }
                   tableProps={ this.tableProps }
                   events={ this.events() }
                   scopedSlots={ this.getScopedSlots() }
        >
        </base-table>
      </div>
    )
  }

  public getScopedSlots () {
    return {
      name: ({ row }: any) => <div class={ 'tar' }>{ row.name }</div>,
    }
  }
}

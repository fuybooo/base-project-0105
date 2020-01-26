export const UUID_KEY = '_uuid'
export const MIN_WIN_HEIGHT = 450
export declare type Pattern = 'create' | 'view' | 'edit' | ''

// 返回结果的结构
export interface HttpRes {
  code: string | number
  head: {
    errCode: number,
  }
  msg: string
  data: any | {
    results: any[],
    total?: number,
  }
}

export interface Menu {
  id?: string
  parentId?: any
  parent?: any
  index?: string
  title?: string
  hidden?: boolean // 不在菜单中显示
  icon?: string
  parentName?: string
  children?: Menu[]
  meta?: any

  [p: string]: any
}

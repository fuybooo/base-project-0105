export const UUID_KEY = '_uuid'
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

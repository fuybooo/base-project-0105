import { Component, Vue } from 'vue-property-decorator'
import { Schema } from '@/components/form/form.model'
import { fb, setProperty } from '@/components/fns/fns'
import '../assets/style.scss'
import { login } from '@/modules/login/services/login.service'

@Component({})
export default class Login extends Vue {
  public schema: Schema[] = [
    {
      prop: 'name',
      label: '帐号',
      nodeProperty: {},
    },
    {
      prop: 'pwd',
      label: '密码',
      props: {
        type: 'password',
        showPassword: true,
      },
      nodeProperty: {},
    },
  ]
  public form = fb(this.schema)

  public render () {
    return (
      <div class={ 'login-wrap' }>
        <div class={ 'login-box' }>
          <h1 class={'login-title'}>登录系统</h1>
          <base-form schema={ this.schema } v-model={ this.form } formProps={ { labelWidth: '0' } }>
            {
              this.form.name && this.form.pwd ? <el-button class={ 'login-button' } onClick={ this.submitLogin }>登录</el-button> : ''
            }
          </base-form>
        </div>
      </div>
    )
  }
  public created () {
    const me = this
    const nodeProperty = {
      nodeProperty: {
        nativeOn: {
          keydown: (e: any) => {
            if (e.which === 13) {
              me.submitLogin()
            }
          },
        },
      }
    }
    setProperty(this.schema, 'name', nodeProperty)
    setProperty(this.schema, 'pwd', nodeProperty)
  }

  public submitLogin () {
    if (this.form.name && this.form.pwd) {
      login.bind(this)(this.form)
    }
  }
}

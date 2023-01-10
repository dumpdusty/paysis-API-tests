import 'dotenv/config'
import AuthHelper from "../helpers/auth.helper";
import {deleteConfig} from "../helpers/common.helper";


before(async function(){
    const authHelper =  new AuthHelper()
    await authHelper.logIn(process.env.LOGIN, process.env.PASSWORD)
    process.env['TOKEN'] = authHelper.response.body.token
    console.log('before from setup')
})

after(async function(){
    await deleteConfig()
    console.log('after from setup')
})

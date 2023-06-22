import { expect } from 'chai'
import AuthHelper from "../helpers/auth.helper"

describe('Auth', function() {
    describe.only('Successful login', function(){
        let authHelper = new AuthHelper()

        before(async function(){
            await authHelper.logIn(process.env.LOGIN, process.env.PASSWORD)
        })

        it('response status code is 200', function(){
            expect(authHelper.response.status).eql(200)
        })

        it('response body contains auth token', function(){
            expect(authHelper.response.body.token).not.to.be.undefined
        })
    })

    describe('Log in with invalid credentials', function(){
        let authHelper = new AuthHelper()

        before(async function (){
            await authHelper.logIn("invalid", "invalid")
        })

        it('response status code is 404', function (){
            expect(authHelper.response.status).eql(404)
        })

        it('body message contain error message', function (){
               expect(authHelper.response.body.message).eql('Wrong login or password.')
        })
    })
})

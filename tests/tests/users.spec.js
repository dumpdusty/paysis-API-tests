import UsersHelper from '../helpers/users.helper'
import { expect } from 'chai'
import { randomId } from '../helpers/common.helper';

describe('Users', function() {
    describe('User Creation', function () {
        let usersHelper = new UsersHelper()

        before(async function () {
        await usersHelper.create()
      })

        it('response status code is 200', function (){
            expect(usersHelper.response.status).to.eq(200)
        })

        it('response body contains user id', function (){
            expect(usersHelper.response.body.id).to.be.a('string')
        })

        it('response body contains initial amount', function (){
            expect(usersHelper.response.body.amount).to.be.a('number')
        })
    })

    describe('Get user', function () {
        let usersHelper = new UsersHelper()
        let user

        before(async function () {
            await usersHelper.create()
            user = usersHelper.response.body
            await usersHelper.get(user.id)
        })

        it('response status code is 200', function (){
            expect(usersHelper.response.status).to.eq(200)
        })

        it('response body contains user id', function (){
            expect(usersHelper.response.body.id).to.eq(user.id)
        })

        it('response body contains initial amount', function (){
            expect(usersHelper.response.body.amount).to.eq(user.amount)
        })
    })

    describe('Get all user', function () {
        let usersHelper = new UsersHelper()


        before(async function () {
            for(let i=0; i<2; i++){
                await usersHelper.create()
            }
            await usersHelper.get()
        })

        it('response status code is 200', function (){
            expect(usersHelper.response.status).to.eq(200)
        })

        it('response body contains user id', function (){
            expect(randomId(usersHelper.response.body).id).not.to.be.undefined
        })

        it('response body contains initial amount', function (){
            expect(randomId(usersHelper.response.body).amount).not.to.be.undefined
        })
        it('response contains more than one users', function (){
            expect(usersHelper.response.body.length).to.be.at.least(2)
        })
    })

    describe('Delete user', function () {
        let usersHelper = new UsersHelper()
        let userId

        before(async function () {
            await usersHelper.create()
            userId = usersHelper.response.body.id
            await usersHelper.delete(userId)
        })

        it('response status code is 200', function (){
            expect(usersHelper.response.status).to.eq(200)
        })

        it('response body message', function (){
            expect(usersHelper.response.body.message).to.eq('User deleted.')
        })

    })

})

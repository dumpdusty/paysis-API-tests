import UsersHelper from "../helpers/users.helper";
import TransHelper from "../helpers/trans.helper";
import { expect } from "chai";



describe('Positive transactions tests', function (){
    describe('Create transaction', function () {

        let usersHelper = new UsersHelper
        let transHelper = new TransHelper
        let userFromBefore
        let userToBefore
        let transaction
        let userFromAfter
        let userToAfter
        let transId

        before(async function(){

            //creating userFrom
            await usersHelper.create()
            userFromBefore = usersHelper.response.body

            //creating userTo
            await usersHelper.create()
            userToBefore = usersHelper.response.body

            //creating transaction
            await transHelper.create(userFromBefore.id, userToBefore.id, 200)
            transaction = transHelper.response

            //getting userFrom after transaction
            await usersHelper.get(userFromBefore.id)
            userFromAfter = usersHelper.response.body

            //getting userTo after transaction
            await usersHelper.get(userToBefore.id)
            userToAfter = usersHelper.response.body

           //getting transaction id
            transId = transaction.body.id

        })

        it('response status code is 200', function () {
            expect(transaction.status).to.eq(200)
        })

        it('response body contains transaction id', function () {
            expect(transId).to.be.a('string')
        })

        it('userFrom amount decreased', function () {
            expect(userFromAfter.amount).to.eq(userFromBefore.amount - 200)
        })

        it('userTo amount increased', function () {
            expect(userToAfter.amount).to.eq(userToBefore.amount + 200)
        })

        it('userFrom in creation correspond to userFrom in transaction', function () {
            expect(userFromBefore.id).to.eq(userFromAfter.id)
        })

        it('userTo in creation correspond to userTo in transaction', function () {
            expect(userToBefore.id).to.eq(userToAfter.id)
        })


    })

     describe('Get single transaction',function () {
        let usersHelper = new UsersHelper()
        let transHelper = new TransHelper()
        let userFrom
        let userTo
        let transaction
        let transId

        before(async function () {

            //create userFrom
            await usersHelper.create()
            userFrom = usersHelper.response.body

            //create userTo
            await usersHelper.create()
            userTo = usersHelper.response.body

            //create transaction
            await transHelper.create(userFrom.id, userTo.id, 250)
            transaction = transHelper.response

            //getting created transaction id
            await transHelper.get(transaction.body.id)
            transId = transHelper.response
        })

        it('response status code is 200', function () {
            expect(transId.status).to.eq(200)
        })

        it('transaction id correspond to sent transaction id', function () {
            expect(transId.body.id).to.eq(transaction.body.id)
        })
        it('response body contains amount', function () {
            expect(transId.body.amount).to.be.a('number')
        })

        it('userFrom in transaction response correspond to created userFrom', function () {
            expect(transId.body.from).to.eq(userFrom.id)
        })
        it('userTo in transaction response correspond to created userTo', function () {
            expect(transId.body.to).to.eq(userTo.id)
        })


    })

    describe('Get all transaction',function () {
        let usersHelper = new UsersHelper()
        let transHelper = new TransHelper()
        let userFrom
        let userTo
        let transaction
        let transAll

        before(async function () {

            //create userFrom
            await usersHelper.create()
            userFrom = usersHelper.response.body

            //create userTo
            await usersHelper.create()
            userTo = usersHelper.response.body

            //create transaction
            await transHelper.create(userFrom.id, userTo.id, 250)
            transaction = transHelper.response

            //getting created transaction id
            await transHelper.get()
            transAll = transHelper.response
        })

        it('response status code is 200', function () {
            expect(transAll.status).to.eq(200)
        })

        it('response body contains array', function () {
            expect(transAll.body).to.be.a('array')
        })

    })
})


describe('Negative transaction tests', function () {

    describe('Transaction creation: Sending over initial amount', function () {

        let usersHelper = new UsersHelper
        let transHelper = new TransHelper
        let userFromBefore
        let userToBefore
        let negativeTransaction


        before(async function(){

            //creating userFrom
            await usersHelper.create()
            userFromBefore = usersHelper.response.body

            //creating userTo
            await usersHelper.create()
            userToBefore = usersHelper.response.body

            //creating transaction
            await transHelper.create(userFromBefore.id, userToBefore.id, 1001)
            negativeTransaction = transHelper.response


        })


        it('response status code is 400', function () {
            expect(negativeTransaction.status).to.eq(400)
        })

         it('response message is correct', function () {
            expect(negativeTransaction.body.message).to.eq('Sender does not have enough money.')
        })


    })

    describe('Transaction creation: Sending negative amount', function () {

        let usersHelper = new UsersHelper
        let transHelper = new TransHelper
        let userFromBefore
        let userToBefore
        let negativeTransaction


        before(async function(){

            //creating userFrom
            await usersHelper.create()
            userFromBefore = usersHelper.response.body

            //creating userTo
            await usersHelper.create()
            userToBefore = usersHelper.response.body

            //creating transaction
            await transHelper.create(userFromBefore.id, userToBefore.id, -500)
            negativeTransaction = transHelper.response

        })

        it('response status code is 400', function () {
            expect(negativeTransaction.status).to.eq(400)
        })

        it('response message is correct', function () {
            expect(negativeTransaction.body.message).to.eq('Amount should be positive number.')
        })

    })

    describe('Get transaction with invalid id', function () {

        let transHelper = new TransHelper()
        let transaction

        before(async function () {
            await transHelper.get('invalid_id')
            transaction = transHelper.response
        })

        it('response status code is 400', function () {
            expect(transaction.status).to.eq(400)
        })
        it('response body message is correct', function () {
            expect(transaction.body.message).to.eq('No transaction found.')
        })


    })


})

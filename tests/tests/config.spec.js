import ConfigHelper from "../helpers/config.helper";
import {expect} from "chai";
import {deleteConfig} from "../helpers/common.helper";


describe('Server configuration', function(){

    describe('Get config', function(){
        let configHelper = new ConfigHelper()
        let config

        before(async function(){

            //"get server configuration" request
            await configHelper.get()
            config = configHelper.response
        })

        it('response status code is 200', function () {
            expect(config.status).to.eq(200)
        });

        it('response body "numbers_of_entries" key equal 25', function (){
            expect(config.body.number_of_entries).to.eq(25)
        })

        it('response body "initial_amount" key equal 1000', function (){
            expect(config.body.initial_amount).to.eq(1000)
        })


    })

    describe('Delete config', function(){
        let configHelper = new ConfigHelper()
        let result

        before(async function(){

            //"delete server configuration" request
            await configHelper.delete()
            result = configHelper.response
        })


        it('response status code is 200', function(){
            expect(result.status).to.eq(200)
        })
        it('response message is correct', function(){
            expect(result.body.message).to.eq('Data wiped out.')
        })


    })

    describe('Update config', function(){
        let configHelper = new ConfigHelper()
        let result
        let numEn
        let inAm
        let numEnAfter
        let inAmAfter

        before(async function(){
            //"get server configuration" request
            await configHelper.get()

             numEn = configHelper.response.body.number_of_entries - 10
             inAm = configHelper.response.body.initial_amount + 1000

            //"patch server configuration" request
            await configHelper.patch(numEn, inAm)
            result = configHelper.response
            console.log(result.body)

            //"get updated server configuration" request
            await configHelper.get()
            numEnAfter = configHelper.response.body.number_of_entries
            inAmAfter = configHelper.response.body.initial_amount
        })


        it('response status code is 200', function(){
            expect(result.status).to.eq(200)
        })

        it('number of entries updated', function () {
            expect(numEnAfter).to.eq(numEn)
        })

        it('initial amount updated', function () {
            expect(inAmAfter).to.eq(inAm)
        })
    })

    after(async function(){
        await deleteConfig()
    })

})

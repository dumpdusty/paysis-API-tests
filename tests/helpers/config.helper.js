import supertest from 'supertest'

export default class ConfigHelper{
    response

    async get(){
    this.response = await supertest(process.env.BASE_URL)
        .get('/config')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
    return this.response
    }

    async patch(numEn, inAm){
    this.response = await supertest(process.env.BASE_URL)
        .patch('/config')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .send({'number_of_entries': numEn, 'initial_amount': inAm})
    return this.response
    }

    async delete(){
    this.response = await supertest(process.env.BASE_URL)
        .delete('/config')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
    return this.response
    }


}


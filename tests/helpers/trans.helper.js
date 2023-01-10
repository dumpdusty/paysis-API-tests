import supertest from 'supertest'


export default class TransHelper{
    response

    async create(userFromId, userToId, amount) {
        this.amount = amount
        this.response = await supertest(process.env.BASE_URL)
            .post('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send({'from': userFromId, 'to': userToId, 'amount': amount})
        return this.response
    }

    async get(transId = '') {
        this.response = await supertest(process.env.BASE_URL)
            .get('/transactions' + ((transId !=='') ? `?id=${transId}` : ''))
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
        return this.response
    }

}

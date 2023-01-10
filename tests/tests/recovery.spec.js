import supertest from 'supertest'
import {expect} from 'chai'

describe('recovery suit', () => {
    let res
    it('auth', async() => {
        res = await supertest(process.env.BASE_URL)
            .post('/auth')
            .send({login: 'admin', password: 'admin'})
        expect(res.statusCode).to.eq(200)
    });
});

import supertest from 'supertest'

export default class UsersHelper {
    response

    async createUserBody(firstName, lastName, email, password) {
        return {
            'firstName': firstName || 'John',
            'lastName': lastName || 'Doe',
            'email': email || `user_${Date.now()}@pirate.com`,
            'password': password || 'Pirate666!'
        }
    }

    async create() {
        this.response = await supertest(process.env.BASE_URL)
            .post('/users')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send(await this.createUserBody())
        return this.response
    }

    async get(userId = '') {
        this.response = await supertest(process.env.BASE_URL)
            .get('/users' + ((userId !== '') ? `?id=${userId}` : ''))
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
        return this.response
    }

    async delete(userId) {
        this.response = await supertest(process.env.BASE_URL)
            .delete('/users')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send({"id": userId})
        return this.response
    }
}
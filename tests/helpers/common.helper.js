import supertest from 'supertest'

function randomId (array) {
    return array[Math.floor(Math.random()*array.length)]
}


async function deleteConfig(){
    await supertest(process.env.BASE_URL)
        .delete('/config')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
    }


export { randomId, deleteConfig }


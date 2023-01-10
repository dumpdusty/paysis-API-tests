// import express from 'express'
// import bodyParser from 'body-parser'
//
// function start(port) {
//     const app = express()
//     let server
//     app.use(bodyParser.json())
//     app.use(bodyParser.urlencoded({ extended: true }))
//
//     app.post('/auth', async function (req, res) {
//         const login = req.body.login
//         const password = req.body.password
//         if (login === process.env.LOGIN && password === process.env.PASSWORD)
//             await res.status(200).send({token: 'skldfklsdnf'})
//         else
//             await res.status(404).send({message:"Wrong login or password."})
//
//     })
//
//     before(async function(){
//         server = await app.listen(port)
//         console.log(`Mock server is running on port ${port}`)
//     })
//
//     after(function () {
//         server.close()
//     })
// }
//
// export { start }

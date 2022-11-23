const Channels = require('pusher')

const {
    APP_ID: appId,
    KEY: key,
    SECRET: secret,
    CLUSTER: cluster,
} = process.env

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

const channels = new Channels({
    appId,
    key,
    secret,
    cluster
})

export default async function handler(req, res) {
    const socketId = req.body.socket_id
    const message = req.body.message
    const chatId = req.body.chat_id
    await channels.trigger(`${chatId}`, 'message', message, {
        socket_id: socketId
    })
    return res.status(200).end('sent event successfully')
}

module.exports = allowCors(handler)
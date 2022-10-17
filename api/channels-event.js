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

export default async (req, res) => {
    const data = req.body
    await channels.trigger('event-channel', 'event-name', data)
    return res.status(200).end('sent event successfully')
}

module.exports = allowCors(handler)
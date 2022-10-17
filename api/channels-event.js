const Channels = require('pusher')

const {
    APP_ID: appId,
    KEY: key,
    SECRET: secret,
    CLUSTER: cluster,
} = process.env

const channels = new Channels({
    appId,
    key,
    secret,
    cluster
})

export default async (req, res) => {
    const data = req.body
    await channels.trigger('event-channel', 'event-name', data)
    return res.status(200).json('sent event successfully')
}
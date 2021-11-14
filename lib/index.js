const { WAConnection } = require("@adiwajshing/baileys")
const chalk = require('chalk')
const fs = require("fs")
const exec = require('child_process')

const client = new WAConnection()
exports.client = client

exports.connect = async() => {
    client.version = [2, 2873, 3]
    console.log(chalk.keyword("blue")('Conectando'))
    let auth = './chui.json'
    client.logger.level = 'warn'
    client.on("qr", () => {
       console.log(chalk.keyword("red")('Escanea el codigo de mas arriba'))
    })
    fs.existsSync(auth) && client.loadAuthInfo(auth)
    client.on('connecting', () => {
        console.log(chalk.whiteBright(".-."), chalk.keyword("red")(" "), chalk.keyword("aqua")("Escanea el codigo a continuacion"))
    })

    await client.connect({timeoutMs: 30*1000})
    fs.writeFileSync('./chui.json', JSON.stringify(client.base64EncodedAuthInfo(), null, 2))  }

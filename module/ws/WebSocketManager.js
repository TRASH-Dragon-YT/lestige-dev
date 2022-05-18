const WebSocket = require("ws")
const socket = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json")
const platfrom = require("os").platform
var url = "https://discord.com/api"
const { isArray } = require('util')
const fetch = require("node-fetch")
const { type } = require("os")
module.exports = (data) => {

    let payload = {
        op: 2,
        d: {
            token: data.token,
            intents: data.intents,
            properties: {
                $os: platfrom,
                $browser: "Lestige",
                $device: "Lestige"
            }
        }
    }

    const heartbeat = (data2) => {
        payload = {
            op: 1,
            d: data.s
        }

        return setInterval(() => {
            socket.send(JSON.stringify(payload))
        }, data2.d.heartbeat_interval)
    }

    socket.on("open", function open() {
        socket.send(JSON.stringify(payload))
    })

    socket.on("message", async function incoming(data2) {
        let jsonData = JSON.parse(data2)
        const { t, s, op, d } = jsonData
        switch (op) {
            case 10:
                heartbeat(jsonData)
        }
        switch (t) {

            case "READY":
                async function get(id) {
                    await fetch(`https://discord.com/api/guilds/${id}`, {
                        headers: {
                            "Authorization": `Bot ${data.token}`
                        }
                    })
                }
                data.me = jsonData.d.user
                data.me.id = jsonData.d.user.id
                data.me.username = jsonData.d.user.username
                data.me.tag = jsonData.d.user.username + '#' + jsonData.d.user.discriminator

                data.emit("ready", data)
                break
            case "MESSAGE_CREATE":

                let message = jsonData.d
                let msg = jsonData.d
                let author_tag = msg.author.username + '#' + msg.author.discriminator

                async function deleteMessage() {
                    await fetch(`https://discord.com/api/channels/${msg.channel_id}/messages/${msg.id}`, {
                        method: 'DELETE',
                        headers: {
                            "Authorization": `Bot ${data.token}`
                        }
                    })
                }

                
                async function createMessage(content, options = {}){
                 if(!content){
                     throw new Error('[Lestige]: Cannot send an empty message.')
                 }

                 if(typeof(content) === "string" && !content.embeds && !content.buttons){
                    fetch(`https://discord.com/api/channels/${jsonData.d.channel_id}/messages`, {
                        method: "POST",
                        body: JSON.stringify({
                            content: `${content}`
                        }),
                        headers: {
                            authorization: `Bot ${data.token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                 }

                 if(typeof(content) !== "string" && !content.buttons && content.embeds){
                    var embeds;

                    if(isArray(content.embeds)){
                        content.embeds.forEach(embed => {
                            embeds = embed.getJSON()
                        })
                    }else{
                        throw new Error('[Lestige]: Embeds must be put in an Array.');
                    }

                    fetch(`${url}/channels/${jsonData.d.channel_id}/message`, {
                        method: "POST",
                        body: JSON.stringify({
                            embeds: embeds,
                        }),
                        headers: {
                            "authorization": `Bot ${data.token}`,
                            "Content-Type": "application/json",
                        },
                    })
                 }

                 if(typeof(content) !== "string" && !content.embeds && content.buttons){
                    var buttons;

                    if(isArray(content.buttons)){
                        content.buttons.forEach(button => {
                            buttons = button.getJSON()
                        })
                    }else{
                        throw new Error('[Lestige]: Buttons must be put in an Array.')
                    }

                    fetch(`${url}/channels/${jsonData.d.channel_id}/messages`, {
                        method: "POST",
                        body: JSON.stringify({
                            components: [{
                                "type": 1,
                                "components": buttons
                            }]
                        }),
                        headers: {
                            authorization: `Bot ${data.token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                 }
                 /*
                    if(typeof(content) !== "string" && !content.buttons && !content.embeds && content.menus){
                 

                    if(isArray(content.menus)){
                        content.menus.forEach(menu => {
                            
                            console.log(menu.getJSON())


                            fetch(`${url}/channels/${jsonData.d.channel_id}/messages`, {
                                method: "POST",
                                body: JSON.stringify({
                                    components: [{
                                        "type": 1,
                                        "components": menu.getJSON()
                                    }]
                                }),
                                headers: {
                                    authorization: `Bot ${data.token}`,
                                    'Content-Type': 'application/json',
                                },
                            })
                        })
                    }else{
                        throw new Error('[Lestige]: Menus must be put in an Array.')
                    }
                 }
                 */
                }

                

                /* Author */
                message.author.tag = author_tag
                message.author.username = msg.author.username

                /* Channel Information */
                message.channel = await fetch(url + `/channels/${msg.channel_id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bot ${data.token}`
                    }
                }).then(req => req.json()).then(json => { return json })


                /* Messaging */
                message.channel.send = createMessage
                //message.reply = createReply_message
                message.delete = deleteMessage

                /* .on */
                data.emit('message', message)
                break
            case "INTERACTION_CREATE":

            var interaction = d

           //console.log(interaction)

            interaction.user = d.user
            interaction.name = null

            interaction.isCommand = () => {
                if(interaction.data.type == 1) {
                    interaction.name = interaction.data.name
                    return true;
                }
                else return false;
            }

            interaction.isButton = () => {
                if(interaction.data.component_type == 2) {
                    interaction.message.components.forEach(OBJECT => {
                        OBJECT.components.forEach(obj => {
                            interaction.name = obj.label
                        })
                      });
                    return true;
                }
                else return false;
            }

            interaction.reply = (_replyData) => {
                if(!_replyData) throw new Error('No reply provided!')
                fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${d.token}/callback`, {
                    method: "POST",
                    body: JSON.stringify({
                        type: 4,
                        data: {
                            content: _replyData.content || "None provided"
                        },
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }

 

            data.emit('interactionCreate', interaction)

     
        }
    })


}

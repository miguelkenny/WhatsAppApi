const fs = require('fs');

const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));

const whatsappService = require('../services/whatsappService')

const verifyToken = (req, res) => {

    try {
        const accessToken = "EABWDlnMnOBEBO6BNiws1HxLZBRPwZAZAQeeVuZAuZBZCogHd8Be1J4edBqAwig0L4TFKEf9YRHwQGzPUeB7WiT0aECZBoe7bLrBLvWb82zZClsDDsILLr6BiSqeewgIP550SfFnZBirQcnwm4NeysnmotvIT2bcnUrPmGdCkAHQyVjpUnrBG5c152KxPD5as7etM3KZA2TBxrrq0kBvlvh";
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == accessToken) {
            res.send(challenge);
        } else {
            res.status(400).send();
        }

    } catch (error) {
        res.status(400).send();
    }
}

const receivedMessage = (req, res) => {
    try {

        let entry = (req.body["entry"])[0];
        let changes = (entry["changes"])[0];
        let value = changes["value"];
        let messageObject = value["messages"]

        if (typeof messageObject != "undefined") {

            const messages = messageObject[0];
            const number = messages["from"];

            const text = GetTextUser(messages);

            myConsole.log(text);
            whatsappService.SendMessageWhatsApp("El usuario respondió: " + text, number)
        }

        res.send("EVENT_RECEIVED");

    } catch (error) {
        myConsole.log(error);
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages) {
    const typeMessage = messages["type"];

    if (typeMessage == "text") {
        return (messages["text"])["body"];

    } else if (typeMessage == "interactive") {

        const interactiveObject = messages["interactive"];
        const typeInteractive = interactiveObject["type"];
        myConsole.log(interactiveObject);
        
        if (typeInteractive == "button_reply") {
            return (interactiveObject["button_reply"])["title"];

        } else if (typeInteractive == "list_reply") {
            return (interactiveObject["list_reply"])["title"];

        } else {
            myConsole.log('Sin Mensaje')
        }
    } else {
        myConsole.log('Sin Mensaje')
    }
}

module.exports = {
    verifyToken,
    receivedMessage
}
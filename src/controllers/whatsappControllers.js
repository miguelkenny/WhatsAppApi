const fs = require('fs');

const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));

const whatsappService = require('../services/whatsappService');
const samples = require('../shared/sampleModels');

const verifyToken = (req, res) => {

    try {
        const accessToken = "EABWDlnMnOBEBO6BNiws1HxLZBRPwZAZAQeeVuZAu";
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

            let messages = messageObject[0];
            let number = messages["from"];
            number = number.replace('549', '54');

            let text = GetTextUser(messages);

            if (text == "text") {
                let data = samples.SampleText("Hola usuario", number);
                whatsappService.SendMessageWhatsApp(data)
            } else if (text == "image") {
                let data = samples.SampleImage(number);
                whatsappService.SendMessageWhatsApp(data)
            } else if (text == "video") {
                let data = samples.SampleVideo(number);
                whatsappService.SendMessageWhatsApp(data)
            } else if (text == "audio") {
                let data = samples.SampleAudio(number);
                whatsappService.SendMessageWhatsApp(data)
            } else if (text == "document") {
                let data = samples.SampleDocument(number);
                whatsappService.SendMessageWhatsApp(data)
            } else if (text == "button") {
                let data = samples.SampleButtons(number);
                whatsappService.SendMessageWhatsApp(data)
            } else {
                let data = samples.SampleText("No entiendo", number);
                whatsappService.SendMessageWhatsApp(data)
            }

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
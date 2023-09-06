const whatsappModel = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const ChatGPTService = require('../services/chatgpt-service');

async function Process(textUser, number) {
    textUser = textUser.toLowerCase();
    let models = [];

    //#region sin chatGPT
    if (textUser.includes('hola')) {
        let model = whatsappModel.MessageText("Hola, un gusto saludarte", number);
        models.push(model);

        let modelList = whatsappModel.MessageList(number);
        models.push(modelList);
    }
    else if (textUser.includes('gracias')) {
        let model = whatsappModel.MessageText("Gracias a tí por escribir", number);
        models.push(model);
    }
    else if (textUser.includes('adios') ||
        textUser.includes('adiós') ||
        textUser.includes('bye') ||
        textUser.includes('me voy') ||
        textUser.includes('chau')) {
        let model = whatsappModel.MessageText("Hasta luego, que estés muy bien!", number);
        models.push(model);
    }
    else if (textUser.includes('comprar')) {
        let model = whatsappModel.MessageButtons(number);
        models.push(model);
    }
    else if (textUser.includes('vender')) {
        let model = whatsappModel.MessageText("Regístrate en el siguiente formulario para poder evaluar como ayudarte a vender: https://www.typeform.com/es/plantillas/t/formulario-de-registro-online/", number);
        models.push(model);
    }
    else if (textUser.includes('agencia') || textUser.includes('local')) {
        let model = whatsappModel.MessageLocation(number);
        models.push(model);
    }
    else if (textUser.includes('contacto')) {
        let model = whatsappModel.MessageText("*Centro de Contacto:*\nCel 264-5501706", number);
        models.push(model);
    }
    else {
        let model = whatsappModel.MessageText("Perdón, no entiendo lo que dices!", number);
        models.push(model);
    }
    //#endregion

    //#region ChatGPT

    // const resultChatGPT = await ChatGPTService.GetMessageChatGPT(textUser)
    // console.log('CONSOLE LOG ' + resultChatGPT);

    // if (resultChatGPT != null) {
    //     let model = whatsappModel.MessageText(resultChatGPT, number);
    //     models.push(model);
    // }
    // else {
    //     let model = whatsappModel.MessageText("Lo siento, algo salió mal. Intentalo más tarde.", number);
    //     models.push(model);
    // }

    //#endregion

    models.forEach(data => {
        whatsappService.SendMessageWhatsApp(data)
    });
}

module.exports = {
    Process
}
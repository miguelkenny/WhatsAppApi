function MessageText(textResponse, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "preview_url": true,
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        }
    });
    return data;
}

function MessageList(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Tengo estas opciones"
            },
            "footer": {
                "text": "Selecciona una de las opciones para poder atenderte"
            },
            "action": {
                "button": "Ver Opciones",
                "sections": [
                    {
                        "title": "Comprar o Vender",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "Comprar",
                                "description": "Compra los mejores productos para tu vehículo"
                            },
                            {
                                "id": "mian-vender",
                                "title": "Vender",
                                "description": "Ta ayudamos a vender tu vehículo"
                            }
                        ]
                    },
                    {
                        "title": "Centro de Atención",
                        "rows": [
                            {
                                "id": "main-agencia",
                                "title": "Local Comercial",
                                "description": "Puedes visitar nuestro local"
                            },
                            {
                                "id": "main-contacto",
                                "title": "Centro de Contacto",
                                "description": "Te atendera un de nuestros agentes"
                            }
                        ]
                    }
                ]
            }
        }
    });
    return data;
}

function MessageButtons(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "preview_url": false,
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "Selecciona una de las Marcas en Promoción"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Cubiertas Fate"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": "Cubiertas Michelin"
                        }
                    }
                ]
            }
        }
    });
    return data;
}

module.exports = {
    MessageText,
    MessageList,
    MessageButtons
}
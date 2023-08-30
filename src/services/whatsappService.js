const https = require('https');

function SendMessageWhatsApp(textResponse, number) {
    console.log('SendMessageWhatsApp' + number);
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "preview_url": false,
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        }
    });

    const options = {
        host: "graph.facebook.com",
        path: "/v17.0/114736955056380/messages",
        method: "POST",
        body: data,
        headers: {
            Authorization: "Bearer EABWDlnMnOBEBO6BNiws1HxLZBRPwZAZAQeeVuZAuZBZCogHd8Be1J4edBqAwig0L4TFKEf9YRHwQGzPUeB7WiT0aECZBoe7bLrBLvWb82zZClsDDsILLr6BiSqeewgIP550SfFnZBirQcnwm4NeysnmotvIT2bcnUrPmGdCkAHQyVjpUnrBG5c152KxPD5as7etM3KZA2TBxrrq0kBvlvh",
            "Content-Type": "application/json"
        }
    };

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

module.exports = {
    SendMessageWhatsApp
}
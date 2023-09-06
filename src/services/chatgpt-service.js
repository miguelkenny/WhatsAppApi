// const { Configuration, OpenAIApi } = require('openai');

// async function GetMessageChatGPT(text) {

//     try {
//         const configuration = new Configuration({ apiKey: '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' });

//         const openAi = new OpenAIApi(configuration);

//         const response = await openAi.createCompletion({
//             model: 'gpt-3.5-turbo',
//             prompt: text,
//             max_tokens: 100
//         });

//         if (response.status == 200 && response.data.choices.length > 0)
//             return response.data.choices[0].text;

//         return null;

//     } catch (error) {
//         console.error(error);
//     }
// }

// module.exports = {
//     GetMessageChatGPT
// };

const axios = require('axios');

async function GetMessageChatGPT(text) {
    try {
        const apiKey = process.env.APIKEY; // Reemplaza con tu clave API
        const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

        const requestData = {
            prompt: text,
            max_tokens: 100
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const response = await axios.post(apiUrl, requestData, { headers: headers });

        if (response.status == 200 && response.data.choices.length > 0) {
            return response.data.choices[0].text;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    GetMessageChatGPT
};

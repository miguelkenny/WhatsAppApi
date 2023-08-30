const express = require('express');
const axios = require('axios');
const apiRoute = require('./routes/routes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/wabot', apiRoute);

/*
app.get('/send-message', async (req, res) => {
    const apiUrl = 'https://graph.facebook.com/v17.0/114736955056380/messages';
    const accessToken = 'EABWDlnMnOBEBO6BNiws1HxLZBRPwZAZAQeeVuZAuZBZCogHd8Be1J4edBqAwig0L4TFKEf9YRHwQGzPUeB7WiT0aECZBoe7bLrBLvWb82zZClsDDsILLr6BiSqeewgIP550SfFnZBirQcnwm4NeysnmotvIT2bcnUrPmGdCkAHQyVjpUnrBG5c152KxPD5as7etM3KZA2TBxrrq0kBvlvh';
    const to = req.query.numCel;

    try {
        const response = await axios.post(apiUrl, {
            messaging_product: 'whatsapp',
            preview_url: false,
            recipient_type: "individual",
            to,
            type: 'text',
            text: {
                body: 'Hola estimado cliente, su turno fué reservado'
            },
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
});
*/

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

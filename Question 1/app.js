const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url || [];
    const mergedNumbers = [];

    for (const url of urls) {
        try {
            const response = await axios.get(url, { timeout: 5000 });
            if (response.status === 200) {
                const { numbers } = response.data;
                mergedNumbers.push(...numbers);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const uniqueSortedNumbers = Array.from(new Set(mergedNumbers)).sort((a, b) => a - b);

    res.json({ numbers: uniqueSortedNumbers });
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
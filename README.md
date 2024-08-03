# esp32-telegram


### Configuration file
Create a config file for backend at "backend/src/config/config.js"

```
module.exports = {
    port: process.env.PORT || 3000,
    telegramToken: process.env.TELEGRAM_TOKEN,
    apiUrl: process.env.API_URL || 'http://localhost:3000/api'
};
```

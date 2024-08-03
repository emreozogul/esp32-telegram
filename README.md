# esp32-telegram


### Configuration file
Create a config file for backend at "backend/src/config/config.js"

```
require('dotenv').config();

module.exports = {
    apiUrl: process.env.API_URL,
    telegramToken: process.env.TELEGRAM_TOKEN,
    port: process.env.PORT,
    botName: process.env.BOT_NAME
};
```

### Enviorentment variables 
Create a config file for backend at "backend/src/config/config.js"

```
API_URL= https://api.telegram.org/bot<TOKEN>
TELEGRAM_TOKEN=<TOKEN>
PORT=3000
BOT_NAME=<BOT NAME>
```

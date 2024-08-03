const express = require('express');
const telegramController = require('../controllers/telegramController');

const router = express.Router();

router.post('/webhook', (req, res) => {
    telegramController.handleMessage(req.body.message);
    res.sendStatus(200);
});

module.exports = router;
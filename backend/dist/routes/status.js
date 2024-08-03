"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bot_1 = require("../bot");
const router = (0, express_1.Router)();
// Endpoint to get the current status of the watering system
router.get('/', (req, res) => {
    res.json({ status: bot_1.wateringStatus });
});
exports.default = router;

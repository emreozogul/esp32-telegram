"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Define your API endpoints here
router.get('/data', (req, res) => {
    res.json({ message: 'This is your API endpoint!' });
});
exports.default = router;

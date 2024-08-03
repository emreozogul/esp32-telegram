"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.wateringStatus = void 0;
const grammy_1 = require("grammy");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let wateringStatus = 'close';
exports.wateringStatus = wateringStatus;
// Create a new bot
exports.bot = new grammy_1.Bot(process.env.TELEGRAM_TOKEN);
// This function handles the /open command
exports.bot.command("open", (ctx) => {
    exports.wateringStatus = wateringStatus = 'open';
    ctx.reply("Watering system turned on");
    console.log("Watering system turned on");
});
// This function handles the /close command
exports.bot.command("close", (ctx) => {
    exports.wateringStatus = wateringStatus = 'close';
    ctx.reply("Watering system turned off");
    console.log("Watering system turned off");
});
// Pre-assign menu text
const firstMenu = "<b>Main Menu</b>\n\nControl the watering system.";
const secondMenu = "<b>Status Menu</b>\n\nCheck the current status of the watering system.";
// Pre-assign button text
const statusButton = "Status";
const backButton = "Back";
const tutorialButton = "Tutorial";
// Build keyboards
const firstMenuMarkup = new grammy_1.InlineKeyboard().text(statusButton, statusButton);
const secondMenuMarkup = new grammy_1.InlineKeyboard().text(backButton, backButton).url(tutorialButton, "https://core.telegram.org/bots/tutorial");
// This handler sends a menu with the inline buttons we pre-assigned above
exports.bot.command("menu", async (ctx) => {
    await ctx.reply(firstMenu, {
        parse_mode: "HTML",
        reply_markup: firstMenuMarkup,
    });
});
// This handler processes the status button on the menu
exports.bot.callbackQuery(statusButton, async (ctx) => {
    // Update message content with corresponding menu section
    await ctx.editMessageText(`<b>Current Status</b>\n\nWatering system is currently ${wateringStatus}.`, {
        reply_markup: secondMenuMarkup,
        parse_mode: "HTML",
    });
});
// This handler processes the back button on the menu
exports.bot.callbackQuery(backButton, async (ctx) => {
    // Update message content with corresponding menu section
    await ctx.editMessageText(firstMenu, {
        reply_markup: firstMenuMarkup,
        parse_mode: "HTML",
    });
});
exports.bot.on("message", async (ctx) => {
    var _a, _b;
    // Print to console
    console.log(`${ctx.from.first_name} wrote ${"text" in ctx.message ? ctx.message.text : ""}`);
    // Handle specific commands and texts
    const messageText = (_b = (_a = ctx.message.text) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
    if (messageText === "/open" || messageText === "open") {
        exports.wateringStatus = wateringStatus = 'open';
        await ctx.reply("Watering system turned on");
    }
    else if (messageText === "/close" || messageText === "close") {
        exports.wateringStatus = wateringStatus = 'close';
        await ctx.reply("Watering system turned off");
    }
    else {
        await ctx.reply('Invalid command. Use "/open", "/close", "open", or "close".');
    }
});
// Error handling
exports.bot.catch((err) => {
    console.error('Error occurred:', err);
});
// Start the Bot (only if not using webhook)
if (!process.env.PUBLIC_URL) {
    exports.bot.start();
}

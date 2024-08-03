import { Bot, InlineKeyboard } from "grammy";
import { config } from 'dotenv';

config();

let wateringStatus: 'open' | 'close' = 'close';
export { wateringStatus };

// Create a new bot
export const bot = new Bot(process.env.TELEGRAM_TOKEN!);

// This function handles the /open command
bot.command("open", (ctx) => {
    wateringStatus = 'open';
    ctx.reply("Watering system turned on");
    console.log("Watering system turned on");
});

// This function handles the /close command
bot.command("close", (ctx) => {
    wateringStatus = 'close';
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
const firstMenuMarkup = new InlineKeyboard().text(statusButton, statusButton);
const secondMenuMarkup = new InlineKeyboard().text(backButton, backButton).url(tutorialButton, "https://core.telegram.org/bots/tutorial");

// This handler sends a menu with the inline buttons we pre-assigned above
bot.command("menu", async (ctx) => {
    await ctx.reply(firstMenu, {
        parse_mode: "HTML",
        reply_markup: firstMenuMarkup,
    });
});

// This handler processes the status button on the menu
bot.callbackQuery(statusButton, async (ctx) => {
    // Update message content with corresponding menu section
    await ctx.editMessageText(`<b>Current Status</b>\n\nWatering system is currently ${wateringStatus}.`, {
        reply_markup: secondMenuMarkup,
        parse_mode: "HTML",
    });
});

// This handler processes the back button on the menu
bot.callbackQuery(backButton, async (ctx) => {
    // Update message content with corresponding menu section
    await ctx.editMessageText(firstMenu, {
        reply_markup: firstMenuMarkup,
        parse_mode: "HTML",
    });
});

bot.on("message", async (ctx) => {
    // Print to console
    console.log(
        `${ctx.from.first_name} wrote ${"text" in ctx.message ? ctx.message.text : ""}`
    );

    // Handle specific commands and texts
    const messageText = ctx.message.text?.toLowerCase() ?? '';

    if (messageText === "/open" || messageText === "open") {
        wateringStatus = 'open';
        await ctx.reply("Watering system turned on");
    } else if (messageText === "/close" || messageText === "close") {
        wateringStatus = 'close';
        await ctx.reply("Watering system turned off");
    } else {
        await ctx.reply('Invalid command. Use "/open", "/close", "open", or "close".');
    }
});

// Error handling
bot.catch((err) => {
    console.error('Error occurred:', err);
});

// Start the Bot (only if not using webhook)
if (!process.env.PUBLIC_URL) {
    bot.start();
}
# Telegram Watering System

This project is a Telegram bot integrated with a watering system, built using TypeScript, Express, and the `grammy` framework. The bot can be used to control and monitor a garden watering system via Telegram commands. Additionally, the server provides API endpoints for interacting with the system.

## Features

- Control the watering system with `/open` and `/close` commands.
- View the status of the watering system.
- A dynamic webhook setup using ngrok.
- REST API endpoints for additional functionality.

## Project Structure

```
app/backend/
├── .env
├── package.json
├── tsconfig.json
├── start-ngrok.sh
├── src/
│   ├── index.ts
│   ├── bot.ts
│   ├── routes/
│   │   ├── api.ts
│   │   ├── status.ts

app/esp32
├── esp32_watering.ino
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- TypeScript
- ngrok
- jq

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/telegram-watering-system.git
   cd telegram-watering-system
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Install ngrok**:
   ```sh
   brew install ngrok   # macOS
   sudo apt-get install ngrok  # Linux
   ```

4. **Install jq**:
   ```sh
   brew install jq   # macOS
   sudo apt-get install jq  # Linux
   ```

### Configuration

1. **Create a `.env` file in the root directory**:
   ```plaintext
   TELEGRAM_TOKEN=your_bot_token_here
   PORT=3000
   DATABASE_URL=your_database_url_here
   PUBLIC_URL=https://your_ngrok_url_here
   ```

2. **Update the `.env` file with your actual Telegram bot token and other details**.

### Running the Project

1. **Make the script executable**:
   ```sh
   chmod +x start-ngrok.sh
   ```

2. **Run the script**:
   ```sh
   ./start-ngrok.sh
   ```

This script will start ngrok, update the `.env` file with the ngrok URL, and restart the server.

### API Endpoints

- **GET /status**: Get the current status of the watering system.
  ```sh
  curl http://localhost:3000/status
  ```

- **GET /api/data**: Example API endpoint.
  ```sh
  curl http://localhost:3000/api/data
  ```

## Project Details

### Bot Commands

- **/open**: Turn on the watering system.
- **/close**: Turn off the watering system.
- **/menu**: Show a menu with options to view status or other actions.

### Scripts

- **start-ngrok.sh**: Starts ngrok, updates the webhook URL, and restarts the server.

### Error Handling

- The project includes basic error handling for setting the webhook and handling bot commands.

### Environment Variables

- **TELEGRAM_TOKEN**: Your Telegram bot token.
- **PORT**: Port on which the server will run (default is 3000).
- **DATABASE_URL**: URL for your database (if applicable).
- **PUBLIC_URL**: Public URL for the webhook, updated dynamically by ngrok.

### Dependencies

- `express`: Web framework for Node.js.
- `body-parser`: Middleware for parsing request bodies.
- `dotenv`: Loads environment variables from a `.env` file.
- `axios`: Promise-based HTTP client for the browser and Node.js.
- `grammy`: Framework for building Telegram bots.
- `typescript`: Typed superset of JavaScript that compiles to plain JavaScript.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Copy and paste this content into your `README.md` file to provide a comprehensive guide for your project.
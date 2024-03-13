# Discord Voice Bot

This is a simple Discord bot written in JavaScript using the Discord.js library to perform voice-related tasks. The bot allows users to join a voice channel, disconnect from a voice channel, and get help information.

## Features

- **Join Voice Channel**: Users can use the `/join` command followed by the ID of the voice channel they want to join. This command enables the bot to join the specified voice channel.

- **Disconnect from Voice Channel**: Users can use the `/dc` command to disconnect the bot from the voice channel it is currently connected to.

- **Help Command**: Users can use the `/help` command to get information about how to use the `/join` and `/dc` commands.

## Prerequisites

- Node.js installed on your machine
- Discord bot token
- Discord application registered and bot added to your server

## Setup

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Replace `'CLIENT_ID'` and `'BOT_TOKEN'` placeholders in `index.js` with your bot's client ID and token respectively.
4. Ensure that the bot has necessary permissions to join and disconnect from voice channels.
5. Create a role named "Voice-Permission" and give it to users who should be able to use the `/join` and `/dc` commands.
6. Run the bot using `node bot.js`.

## Usage

- Invite the bot to your server using the OAuth2 link generated from the Discord Developer Portal.
- Use `/join <voice_channel_id>` to make the bot join a voice channel.
- Use `/dc` to disconnect the bot from the voice channel it's connected to.
- Use `/help` to get information on how to use the bot.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


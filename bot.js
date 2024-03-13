const {
	REST
} = require('@discordjs/rest');
const {
	Routes
} = require('discord-api-types/v9');
const {
	Client,
	Intents,
	Permissions
} = require('discord.js');
const {
	joinVoiceChannel,
	getVoiceConnection
} = require('@discordjs/voice');

const clientId = 'CLIENT_ID'; // Replace this with your bot's client ID
const token = 'BOT_TOKEN'; // Replace this with your bot's token

const rest = new REST({
	version: '9'
}).setToken(token);

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.once('ready', async () => {
	console.log('Bot is ready!');

	try {
		await registerCommands();
		console.log('Successfully registered global slash commands!');
	} catch (error) {
		console.error(error);
	}
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const {
		commandName,
		options
	} = interaction;

	if (commandName === 'join') {
		const voiceChannelId = options.getString('voice_channel_id');

		if (!voiceChannelId) {
			await interaction.reply({
				content: 'Please provide a voice channel ID!',
				ephemeral: true
			});
			return;
		}

		await interaction.deferReply({
			ephemeral: true
		});

		try {
			const connection = joinVoiceChannel({
				channelId: voiceChannelId,
				guildId: interaction.guild.id,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});
			console.log(`Joined voice channel!`);
			await interaction.editReply({
				content: 'Joined voice channel!',
				ephemeral: true
			});
		} catch (error) {
			console.error(error);
			await interaction.editReply({
				content: 'Error joining the voice channel!',
				ephemeral: true
			});
		}
	} else if (commandName === 'dc') {
		const voiceConnection = getVoiceConnection(interaction.guild.id);

		if (!voiceConnection) {
			await interaction.reply({
				content: 'Not connected to a voice channel!',
				ephemeral: true
			});
			return;
		}

		voiceConnection.destroy();
		await interaction.reply({
			content: 'Disconnected from the voice channel!',
			ephemeral: true
		});
	} else if (commandName === 'help') {
		await interaction.reply({
			content: 'To use the /join and /dc commands, create a role named "Voice-Permission" and give it to yourself or someone else. Only users with this role can use the /join and /dc commands. (Users with Administrator permission can access the commands without the "Voice-Permission" role.)',
			ephemeral: true
		});
	}
});

async function registerCommands() {
	try {
		const commands = [{
				name: 'join',
				description: 'Join a voice channel',
				options: [{
					name: 'voice_channel_id',
					description: 'The ID of the voice channel to join',
					type: 3, // Numeric value for STRING type
					required: true,
				}, ],
			},
			{
				name: 'dc',
				description: 'Disconnect from the voice channel',
			},
			{
				name: 'help',
				description: 'Get help information',
			}
		];

		await rest.put(
			Routes.applicationCommands(clientId), {
				body: commands
			},
		);
	} catch (error) {
		console.error(error);
	}
}

client.login(token);

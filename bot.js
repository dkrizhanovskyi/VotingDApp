const { Telegraf } = require('telegraf');
const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config({ path: './key.env' });

const { TELEGRAM_BOT_TOKEN } = process.env;

console.log("Loaded TELEGRAM_BOT_TOKEN:", TELEGRAM_BOT_TOKEN);

if (!TELEGRAM_BOT_TOKEN) {
  throw new Error("Please set your TELEGRAM_BOT_TOKEN in a .env file");
}

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Укажите адрес вашего контракта и ABI
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Замените на ваш развернутый адрес контракта
const abi = JSON.parse(fs.readFileSync('src/Voting.json', 'utf-8')).abi; // Убедитесь, что путь правильный

// Настройте подключение к локальному узлу Ethereum
const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

// Подключение к контракту
const contract = new web3.eth.Contract(abi, contractAddress);

bot.start((ctx) => ctx.reply('Welcome to the Voting DApp Bot! Use /candidates to see the list of candidates and /vote <id> to vote for a candidate.'));

bot.command('candidates', async (ctx) => {
    try {
        const count = await contract.methods.candidatesCount().call();
        let response = `There are ${count} candidates:\n`;
        for (let i = 1; i <= count; i++) { // Индексация начинается с 1
            const candidate = await contract.methods.getCandidate(i).call();
            response += `${candidate[0]}: ${candidate[1]} - ${candidate[2]} votes\n`;
        }
        ctx.reply(response);
    } catch (error) {
        console.error(error);
        ctx.reply('Error fetching candidates.');
    }
});

bot.command('vote', async (ctx) => {
    const args = ctx.message.text.split(' ');
    const candidateId = parseInt(args[1], 10); // Преобразование в число
    if (isNaN(candidateId)) {
        ctx.reply('Please provide a valid candidate ID.');
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.vote(candidateId).send({ from: accounts[0] });
        ctx.reply(`Successfully voted for candidate ${candidateId}.`);
    } catch (error) {
        console.error(error);
        ctx.reply('Error voting for candidate.');
    }
});

bot.command('addcandidate', async (ctx) => {
    const args = ctx.message.text.split(' ');
    const candidateName = args.slice(1).join(' ');
    if (!candidateName) {
        ctx.reply('Please provide a candidate name.');
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addCandidate(candidateName).send({ from: accounts[0] });
        ctx.reply(`Successfully added candidate ${candidateName}.`);
    } catch (error) {
        console.error(error);
        ctx.reply('Error adding candidate.');
    }
});

bot.launch().then(() => {
    console.log('Bot is running');
});

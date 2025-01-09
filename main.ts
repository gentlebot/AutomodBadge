// deno-ts-ignore
import {
    Client,
    GatewayIntentBits,
    Partials,
    AutoModerationRuleTriggerType,
    AutoModerationActionType,
    TextChannel,
} from "discord.js";
import "@std/dotenv/load";

const TOKEN = Deno.env.get("TOKEN");
const GUILD = Deno.env.get("GUILD");
const CHANNEL = Deno.env.get("CHANNEL");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    partials: [Partials.Channel],
});

client.once("ready", async () => {
    console.log("Bot is ready!");
    const guild = client.guilds.cache.get(GUILD!);
    if (!guild) {
        console.error("Guild not found!");
        return;
    }

    try {
        const rule = await guild.autoModerationRules.create({
            name: "Automod Badge Rule",
            eventType: 1,
            triggerType: AutoModerationRuleTriggerType.Keyword,
            triggerMetadata: { keywordFilter: ["karssmells"] },
            actions: [{ type: AutoModerationActionType.BlockMessage }],
        });
        console.log(`Rule created: ${rule.name}`);
    } catch (error) {
        console.error("Error creating rule:", error);
    }
});

client.on("autoModerationActionExecution", (execution) => {
    console.log("Action Excecuted");
    const guild = execution.guild;

    console.log("Found Guild")
    const channel = guild.channels.cache.get(CHANNEL!);
    if (!channel) return;

    if (channel instanceof TextChannel) {
        channel.send(`${execution.user} did a action. Woah`);
    }
});

if (import.meta.main) {
    await client.login(TOKEN);
}

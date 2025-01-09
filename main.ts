import {
    Client,
    GatewayIntentBits,
    Partials,
    AutoModerationRuleTriggerType,
    AutoModerationActionType,
} from "discord.js";
import "@std/dotenv/load";

const TOKEN = Deno.env.get("TOKEN");
const GUILD = Deno.env.get("GUILD");


if (import.meta.main) {
    // console.log("Add 2 + 3 =", add(2, 3));
}

/// <reference types="../../../CTAutocomplete" />

import config from "../../config";
import { prefix } from "../../utils/utils";

let cripple = false;

register("chat", (name, terminal) => {
    if (name !== Player.getName() || !config.crippleAddons) return
    if (Math.floor(Math.random() * 100) + 1 === 1) {
        cripple = true;
        prefix("&a&lCRIPPLE ADDONS ACTIVATED! &d(1/100)")
        ChatLib.say("CRIPPLE ADDONS ACTIVATED! (1/100)")
    }
}).setCriteria(/(.+) activated a terminal! (.+)/);

register("command", () => {
    
    cripple = true;
    prefix("&a&lCRIPPLE ADDONS ACTIVATED! &d(1/100)")
    ChatLib.say("CRIPPLE ADDONS ACTIVATED! (1/100)")
}).setName("crippleaddons")

register("tick", () => {
    if (cripple) Player.getPlayer().func_70016_h(0, Player.getPlayer().field_70181_x, 0);
});

register("worldLoad", () => {
    cripple = false;
})
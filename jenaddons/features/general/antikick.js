/// <reference types="../../../CTAutocomplete" />

import config from "../../config";
import { prefix } from "../../utils/utils";
import packetChat from "../../events/packetChat";

function listener(message) {
    if (message === "You were kicked while joining that server!")
    if (config.antiKick){
        ChatLib.command("l")
        prefix("&aCancelling wait time")
    }
}

packetChat.addListener(listener);
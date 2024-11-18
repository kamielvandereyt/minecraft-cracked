/// <reference types="../../../CTAutocomplete" />

import { rightClick, swapFromName, prefix, swap } from "../../utils/utils";
import config from "../../config";
import packetChat from "../../events/packetChat";

let swapping = false;

function listener(message) {
    if (message == "Starting in 3 seconds." && config.autoTac){
        tacswap.start();
        swapping = true;
    }
}

const tacswap = new Thread(() => {
    if (swapping){
        prefix("&cAlready swapping!")
        return;
    }
    if (Client.isInGui()) return;
    prefix("&aUsing Tac Insert...")
    if (!Client.isInGui()){
        let previousItem = Player.getHeldItemIndex()
        swapFromName("tactical insertion")
        tacswap.sleep(15)
        if (Player.getHeldItem().getName().toLowerCase().includes("tactical insertion")){
            rightClick()
            tacswap.sleep(50)
            swap(previousItem)
        }
    }
    swapping = false;
})

packetChat.addListener(listener)
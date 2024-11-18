/// <reference types="../../../CTAutocomplete" />

import { getEtherwarpBlockSuccess, getSkyblockItemID } from "../../../BloomCore/utils/Utils"
import config from "../../config"

const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent")
const isHoldingEtherwarpItem = ()=>{
    const held = Player.getHeldItem()
    const sbId = getSkyblockItemID(held)

    if (sbId !== "ASPECT_OF_THE_END" && sbId !== "ASPECT_OF_THE_VOID" && sbId !== "ETHERWARP_CONDUIT") return false
    return held.getNBT()?.toObject()?.tag?.ExtraAttributes?.ethermerge == 1 || sbId == "ETHERWARP_CONDUIT"
}

register("soundPlay", (_0, name, _1, _2, _3, event)=>{
    if (!config.meowEtherwarp) return;
    if (name == "mob.enderdragon.hit") cancel(event)
})

register(MouseEvent, (event)=>{
    if (!config.meowEtherwarp) return
    const btn = event.button
    const state = event.buttonstate
    const [success] = getEtherwarpBlockSuccess(false, 61)
    if (btn !== 1 || !state || !isHoldingEtherwarpItem() || !Client.isTabbedIn()) return
    if (Player.isSneaking() && success){
        World.playSound("mob.cat.meow", 1, 1);
    }
})
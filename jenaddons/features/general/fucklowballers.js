/// <reference types="../../../CTAutocomplete" />

import * as packetOpenWindow from "../../events/packetOpenWindow";
import { prefix } from "../../utils/utils";
import config from "../../config";

const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow");
let cwid = -1;
let reporting = false;

register("chat", (rank, name, msg)=>{
    if (!config.fuckLowballers || reporting || Client.isInGui()) return
    prefix(`&aReporting ${name}!`)
    reporting = true;
    ChatLib.command(`chatreport ${name}`)
    setTimeout(()=>{
        reporting = false;
    }, 410)
}).setCriteria(/(\[.+\])? ?(.+): (lowballing|Lowballing|LOWBALLING|LOWBALLNG|lowball) ?(.+)/)

register("chat", (event)=>{
    if (!config.fuckLowballers) return
    cancel(event)
}).setCriteria("lowballing").setContains()

register("chat", (event)=>{
    if (!config.fuckLowballers) return
    cancel(event)
}).setCriteria("LOWBALLING").setContains()

register("chat", (event)=>{
    if (!config.fuckLowballers) return
    cancel(event)
}).setCriteria("Lowballing").setContains()

register("chat", (event)=>{
    if (!config.fuckLowballers) return
    cancel(event)
}).setCriteria("lowball").setContains()

register("renderOverlay", () => {
	if (!reporting) return;
	const scale = 2;
	Renderer.scale(scale);
	Renderer.drawStringWithShadow("&bReporting...", (Renderer.screen.getWidth() / scale - Renderer.getStringWidth("&bReporting...")) / 2, Renderer.screen.getHeight() / scale / 2 + 16);
});

function click(slot, button) {
	if (slot === undefined || button === undefined) return;
    if (cwid === -1) return;
	Client.scheduleTask(0, () => {
		Client.sendPacket(new C0EPacketClickWindow(cwid, slot, button, 0, null, 0));
	})
}

const mc = Client.getMinecraft();
const w = new KeyBind(mc.field_71474_y.field_74351_w);
const s = new KeyBind(mc.field_71474_y.field_74368_y);
const a = new KeyBind(mc.field_71474_y.field_74370_x);
const d = new KeyBind(mc.field_71474_y.field_74366_z);
const space = new KeyBind(mc.field_71474_y.field_74314_A);

packetOpenWindow.addListener((title, windowId, _0, slotCount, _1, _2, _3, event) => {
	cwid = windowId;
    if (!config.fuckLowballers) return;
    if (title == "Report Chat"){
        cancel(event)
        register("tick", ()=>{
            if (!reporting) return;
            w.setState(false);
            s.setState(false);
            a.setState(false);
            d.setState(false);
            space.setState(false);
        })
        setTimeout(()=>{
            click(11, 0)
            World.playSound("mob.cat.meow", 1, 0.5);
            reporting = false;
        }, 400)
    }
});
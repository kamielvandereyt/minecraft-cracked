/// <reference types="../../../CTAutocomplete" />
import config from "../../config";
import * as packetOpenWindow from "../../events/packetOpenWindow";

const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow");

register("guiKey", (_0, keyCode, _1, event) => {
	if (!config.petKeybinds) return;
	const container = Player.getContainer();
	if (!container?.getName()?.toLowerCase()?.includes("pets")) return;
	let keyInfo = -1;
	if (keyCode > 0 && keyCode < 9) {
		keyInfo = keyCode - 2;
	}
	if (keyInfo === -1) return;
	if (keyInfo < 7) {
		click(keyInfo + 10, 0);
	}
	cancel(event);
})

function click(slot, button) {
	if (slot === undefined || button === undefined) return;
	Client.scheduleTask(0, () => {
		Client.sendPacket(new C0EPacketClickWindow(cwid, slot, button, 0, null, 0));
	})
}

packetOpenWindow.addListener((_0, windowId) => {
	cwid = windowId;
});
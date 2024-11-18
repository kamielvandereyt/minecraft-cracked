import { getPlayerEyeCoords } from "../../BloomCore/utils/Utils";
import Vector3 from "../../BloomCore/utils/Vector3";

export const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null);
export const leftClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147116_af", null);

export function sneak() {
    new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E).setState(true)
}

export function unsneak() {
    new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E).setState(false)
}

export function prefix(message) {
    ChatLib.chat("&1[&9jenaddons&1]&r " + message)
}

function rotate(yaw, pitch) {
    if (Client.isInGui()) return;
	const player = Player.getPlayer();
	player.field_70177_z = yaw;
	player.field_70125_A = pitch;
}

export function getPlayerYaw() {
	return Player.getYaw();
}

export function getPlayerPitch() {
	return Player.getPitch();
}

export function rotateSmoothly(yaw, pitch, time) {
	while (yaw >= 180) yaw -= 360;
	while (pitch >= 180) pitch -= 360;
	const initialYaw = getPlayerYaw();
	const initialPitch = getPlayerPitch();
	const initialTime = new Date().getTime();
	const trigger = register("step", () => {
        if (Client.isInGui()) return;
		const progress = time <= 0 ? 1 : Math.max(Math.min((new Date().getTime() - initialTime) / time, 1), 0);
		const amount = bezier(progress, 0, 1, 1, 1);
		rotate(initialYaw + (yaw - initialYaw) * amount, initialPitch + (pitch - initialPitch) * amount);
		if (progress >= 1) trigger.unregister();
	});
}

export function getYawPitch(x, y, z) {
	const difference = new Vector3(x, y, z).subtract(new Vector3(...getPlayerEyeCoords()));
	return [difference.getYaw(), difference.getPitch()];
}

export function bezier(t, initial, p1, p2, final) {
	return (1 - t) * (1 - t) * (1 - t) * initial + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * final;
}

export function holdRightClick() {
    new KeyBind(Client.getMinecraft().field_71474_y.field_74313_G).setState(true)
}

export function stopHoldRightClick() {
    new KeyBind(Client.getMinecraft().field_71474_y.field_74313_G).setState(false)
}

export function rightClick() {
    rightClickMethod.setAccessible(true)
    rightClickMethod.invoke(Client.getMinecraft(), null);
}

export function leftClick() {
    leftClickMethod.setAccessible(true)
    leftClickMethod.invoke(Client.getMinecraft(), null);
}

/**
 * Swaps to the specified slot
 * 
 * @param {string} slot the slot to swap to
*/
export function swap(slot) {
    if (slot < 0 || slot > 8) {
        prefix("&cCannot swap to " + slot + "&c. Not in hotbar.")
        return
    }
    Player.setHeldItemIndex(slot)
}

/**
 * Swaps to the specified item, right clicks, then swaps back
 * 
 * @param {string} item the item to swap to
*/
export function swapFromName(items) {
    index = Player?.getInventory()?.getItems()?.findIndex(item => item?.getName()?.toLowerCase()?.includes(items))
    if (index < 0 || index > 8) {
        prefix("&cCannot swap to " + items + "&c. Not in hotbar.")
        return
    }
    Player.setHeldItemIndex(index)
}

export function look(x, y, z, time) {
    const coords = getYawPitch(x, y, z)
    rotateSmoothly(...coords, time)
}

export function setBlockTo(x, y, z, block) {
    const pos = new BlockPos(x * 1, y * 1, z * 1);
    World.getWorld().func_175656_a(pos.toMCBlock(), new BlockType(block).getDefaultState());
}

export function setToAir(x, y, z) {
    const pos = new BlockPos(x * 1, y * 1, z * 1);
    Client.getMinecraft().func_71410_x().field_71441_e.func_175698_g(pos.toMCBlock())
}

register("command", ()=>{
    ChatLib.chat(Player.getHeldItem().getName())
}).setName("helditem")

register("command", ()=>{
    ChatLib.chat(Player.lookingAt().toString())
}).setName("lookingat")

export function title(msg, time) {
    register("step", () => {
        if (time == 0) return
        time -= 1;
    }).setDelay(1);

    register("renderOverlay", () => {
        if (time <= 0 || !currentTitle) return;

        const textWidth = Renderer.getStringWidth(currentTitle);
        const textX = Renderer.screen.getWidth() / 2 - textWidth / 2;
        const screenHeight = Renderer.screen.getHeight();
        const verticalOffsetRatio = 1 / 2.4;
        const textY = screenHeight * verticalOffsetRatio;

        Renderer.drawString(currentTitle, textX, textY, true);
    });
    currentTitle = msg;
}
/// <reference types="../../../CTAutocomplete" />

import config from "../../config";
import { rightClick } from "../../utils/utils";
import { onRoomEnter, convertToRealCoords } from "../../../Bloom/utils/RoomUtils"
import Dungeon from "../../../BloomCore/dungeons/Dungeon";
let lastclick = 0
let inWater = false;
let inWeirdos = false;
let on2ndDevice = false;

register("tick", () => {
    on2ndDevice = Player.getX() > 50 && Player.getX() < 65 && Player.getY() > 130 && Player.getY() < 135 && Player.getZ() > 137 && Player.getZ() < 143;
})

onRoomEnter((roomX, roomZ, rotation) => {
    const WaterCoords = [[0, 60, -10]]
    const WeirdosCoords = [[-2, 69, 7]]
    inWater = WaterCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:lever"
    })
    inWeirdos = WeirdosCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:redstone_wire"
    })
})

register("worldLoad", () => {
    on2ndDevice = false;
})

register("tick", () => {
    if (inWater || inWeirdos || on2ndDevice) return
    if (config.secretTriggerBot && Dungeon.inDungeon) {
        if (Player.lookingAt().toString().includes('ender_chest')) return
        if (lastclick == 0){
            if (Player?.lookingAt()?.toString().includes('chest') || Player?.lookingAt()?.toString().includes('trapped_chest') || Player?.lookingAt()?.toString().includes('lever') || Player?.lookingAt()?.toString().includes('skull')){
                if (Client.isInGui()) return
                setTimeout(rightClick(), config.secretTriggerBotDelay*5)
                lastclick = Date.now()
                return
            }
        } else if (Date.now() - lastclick >= config.secretTriggerBotDelay*5){
            if (Player?.lookingAt()?.toString().includes('chest') || Player?.lookingAt()?.toString().includes('trapped_chest') || Player?.lookingAt()?.toString().includes('lever') || Player?.lookingAt()?.toString().includes('skull')){
                if (Client.isInGui()) return
                setTimeout(rightClick(), config.secretTriggerBotDelay*5)
                lastclick = Date.now()
                return
            }
        }
    }
})
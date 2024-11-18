/// <reference types="../../../CTAutocomplete" />

import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import config from "../../config";
import { leftClick, prefix, rightClick, rotateSmoothly, swapFromName } from "../../utils/utils";

let skipping = false;

const doorskipbind = new KeyBind("Auto Door Skip", Keyboard.KEY_NONE, "jenaddons")

register("tick", ()=>{
    if (doorskipbind.isPressed()) doorskip()
})

const remove = (x, y, z)=>{
    if (!config.autoGhostBlocks) return
    const pos = new BlockPos(x * 1, y * 1, z * 1);
    Client.getMinecraft().func_71410_x().field_71441_e.func_175698_g(pos.toMCBlock())
}

export function doorskip() {
    if (Dungeon.inDungeon){
        if (skipping){
            prefix("&cAlready Door Skipping!")
            return
        }
        prefix("&7Skipping Door")
        skipping = true
        if (Player.facing() === "South"){
            remove(Player.getX()-1, Player.getY(), Player.getZ())
            remove(Player.getX()-1, Player.getY(), Player.getZ()+1)
            remove(Player.getX()-1, Player.getY(), Player.getZ()+2)
            remove(Player.getX()-1, Player.getY()+1, Player.getZ())
            remove(Player.getX()-1, Player.getY()+1, Player.getZ()+1)
            remove(Player.getX()-1, Player.getY()+1, Player.getZ()+2)
            remove(Player.getX()-1, Player.getY()+2, Player.getZ())
            remove(Player.getX()-1, Player.getY()+2, Player.getZ()+1)
            remove(Player.getX()-1, Player.getY()+2, Player.getZ()+2)
            rotateSmoothly(0, 80, 100)
            setTimeout(()=>{
                tntpearl.start()
            }, 100)
        } else if (Player.facing() === "North"){
            remove(Player.getX()-1, Player.getY(), Player.getZ()-2)
            remove(Player.getX()-1, Player.getY(), Player.getZ()-3)
            remove(Player.getX()-1, Player.getY(), Player.getZ()-4)
            remove(Player.getX()-1, Player.getY()+1, Player.getZ()-2)
            remove(Player.getX()-1, Player.getY()+1, Player.getZ()-3)
            remove(Player.getX()-1, Player.getY()+1, Player.getZ()-4)
            remove(Player.getX()-1, Player.getY()+2, Player.getZ()-2)
            remove(Player.getX()-1, Player.getY()+2, Player.getZ()-3)
            remove(Player.getX()-1, Player.getY()+2, Player.getZ()-4)
            rotateSmoothly(179, 80, 100)
            setTimeout(()=>{
                tntpearl.start()
            }, 100)
        } else if (Player.facing() === "West"){
            remove(Player.getX()-2, Player.getY(), Player.getZ()-1)
            remove(Player.getX()-3, Player.getY(), Player.getZ()-1)
            remove(Player.getX()-4, Player.getY(), Player.getZ()-1)
            remove(Player.getX()-2, Player.getY()+1, Player.getZ()-1)
            remove(Player.getX()-3, Player.getY()+1, Player.getZ()-1)
            remove(Player.getX()-4, Player.getY()+1, Player.getZ()-1)
            remove(Player.getX()-2, Player.getY()+2, Player.getZ()-1)
            remove(Player.getX()-3, Player.getY()+2, Player.getZ()-1)
            remove(Player.getX()-4, Player.getY()+2, Player.getZ()-1)
            rotateSmoothly(90, 80, 100)
            setTimeout(()=>{
                tntpearl.start()
            }, 100)
        } else if (Player.facing() === "East"){
            remove(Player.getX(), Player.getY(), Player.getZ()-1)
            remove(Player.getX()+1, Player.getY(), Player.getZ()-1)
            remove(Player.getX()+2, Player.getY(), Player.getZ()-1)
            remove(Player.getX(), Player.getY()+1, Player.getZ()-1)
            remove(Player.getX()+1, Player.getY()+1, Player.getZ()-1)
            remove(Player.getX()+2, Player.getY()+1, Player.getZ()-1)
            remove(Player.getX(), Player.getY()+2, Player.getZ()-1)
            remove(Player.getX()+1, Player.getY()+2, Player.getZ()-1)
            remove(Player.getX()+2, Player.getY()+2, Player.getZ()-1)
            rotateSmoothly(-90, 80, 100)
            setTimeout(()=>{
                tntpearl.start()
            }, 100)
        }
    } else {
        prefix("&cNot in a Dungeon!")
        return
    }
}

const w = new KeyBind(Client.getMinecraft().field_71474_y.field_74351_w);

const tntpearl = new Thread(() => {
    swapFromName("infinityboom tnt")
    if (Player.getHeldItem().getName().toLowerCase().includes("infinityboom")){
        tntpearl.sleep(75)
        leftClick()
        tntpearl.sleep(50)
        swapFromName("ender pearl")
        tntpearl.sleep(200)
        if (Player.getHeldItem().getName().toLowerCase().includes("pearl")) rightClick()
        if (config.autoWalk){
            tntpearl.sleep(150)
            w.setState(true)
            tntpearl.sleep(400)
            w.setState(false)
        }
    }
    skipping = false;
})
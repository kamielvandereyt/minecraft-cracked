/// <reference types="../../../CTAutocomplete" />
import config from "../../config";
import { george, boris, ass, gyat, sus, ahegao, gordon, uwu, noose, swastika, adolf } from "../general/chatimages";
import { prefix, rotateSmoothly } from "../../utils/utils";
 import { doorskip } from "../dungeons/doorskip";

register("command", (arg, arg2, arg3) => {
    if (!arg){
        config.openGUI()
        return
    } if (arg == "help"){
        ChatLib.chat("")
        prefix("&a/jen images <george, boris, ass, gyat, sus, ahegao, gordon, uwu, noose, swastika, adolf>");
        prefix("&a/jen yawpitch <yaw, pitch>");
        prefix("&a/jen etherwarp <yaw, pitch>");
        prefix("&a/jen pearls");
        prefix("&a/jen jerry");
         prefix("&a/jen doorskip");
        ChatLib.chat("")
        return
    } if (arg == "images"){
        if (arg2 == "george"){
            george.start();
            return
        } if (arg2 == "boris"){
            boris.start();
            return
        } if (arg2 == "ass"){
            ass.start();
            return
        } if (arg2 == "gyat"){
            gyat.start();
            return
        } if (arg2 == "sus"){
            sus.start();
            return
        } if (arg2 == "ahegao"){
            ahegao.start();
            return
        } if (arg2 == "gordon"){
            gordon.start();
            return
        } if (arg2 == "uwu"){
            uwu.start();
            return
        } if (arg2 == "noose"){
            noose.start();
            return
        } if (arg2 == "swastika"){
            swastika.start();
            return
        } if (arg2 == "adolf"){
            adolf.start();
            return
        } else {
            prefix("&cIncorrect Arguments! /jen help")
            return
        }
    } if (arg == "yawpitch"){
        if (arg2 && arg3){
            if (arg2 < 180 || arg2 > -180 && arg3 < 180 || arg3 > -180){
                prefix("&aRotating to: " + arg2 + ", " + arg3)
                rotateSmoothly(arg2, arg3, 300)
                return
            }
            else {
                prefix("&cIncorrect Arguments! /jen help")
                return
            }
        } else {
            prefix("&c/jen yawpitch <yaw,pitch>")
            return
        }
    } if (arg == "pearls"){
        const pearlStack = Player.getInventory().getItems().find(a => a?.getName() == "§fEnder Pearl")
        if (!pearlStack) {
            ChatLib.command(`gfs ender_pearl 16`)
            return
        }
        const toGive = 16 - pearlStack.getStackSize()
        if (toGive == 0) {
            ChatLib.command(`gfs ender_pearl 16`)
            return
        }
        ChatLib.command(`gfs ender_pearl ${toGive}`)
        return
    } if (arg == "jerry"){
        const pearlStack = Player.getInventory().getItems().find(a => a?.getName() == "§fInflatable Jerry")
        if (!pearlStack) {
            ChatLib.command(`gfs inflatable_jerry 64`)
            return
        }
        const toGive = 64 - pearlStack.getStackSize()
        if (toGive == 0) {
            ChatLib.command(`gfs inflatable_jerry 64`)
            return
        }
        ChatLib.command(`gfs inflatable_jerry ${toGive}`)
        return
    } if (arg == "doorskip"){
        doorskip()
        return
    } else {
        prefix("&cIncorrect Arguments! /jen help")
        return
    }
}).setName("jenaddons").setAliases("ja", "jen").setTabCompletions("help", "yawpitch", "pearls", "images", "jerry", "doorskip", "etherwarp");
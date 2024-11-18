/// <reference types="../../../CTAutocomplete" />

import { swap, swapFromName, leftClick } from "../../utils/utils";

const swapstonkbind = new KeyBind("Swap Stonk", Keyboard.KEY_NONE, "jenaddons")

let swapping = false

register("tick", () => {
    if (swapstonkbind.isPressed()){
        if (swapping) return
        swapping = true
        if (Player.getHeldItem().getName().toLowerCase().includes("pickaxe")){
            swapFromName("void")
            setTimeout(()=>{
                let previousItem = Player.getHeldItemIndex()
                swapFromName("pickaxe")
                leftClick()
                Client.scheduleTask(0, ()=>{
                    swap(previousItem)
                    swapping = false
                })
            }, 100)
            return
        }
        let previousItem = Player.getHeldItemIndex()
        swapFromName("pickaxe")
        leftClick()
        Client.scheduleTask(0, ()=>{
            swap(previousItem)
            swapping = false
        })
    }
})
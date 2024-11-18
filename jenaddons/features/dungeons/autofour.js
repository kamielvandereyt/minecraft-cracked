/// <reference types="../../../CTAutocomplete" />

import * as packetBlockChange from "../../events/packetBlockChange";
import * as packetMultiBlockChange from "../../events/packetMultiBlockChange";
import * as packetOpenWindow from "../../events/packetOpenWindow";
import packetChat from "../../events/packetChat";
import config from "../../config";
import { look, rightClick, swap, swapFromName, prefix, holdRightClick, stopHoldRightClick } from "../../utils/utils";

const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow");
const MCBlock = Java.type("net.minecraft.block.Block");
const blocks = [[68, 130, 50], [66, 130, 50], [64, 130, 50], [68, 128, 50], [66, 128, 50], [64, 128, 50], [68, 126, 50], [66, 126, 50], [64, 126, 50]];

let {one,two,three,four,five,six,seven,eight,nine} = [false,false,false,false,false,false,false,false,false];
let on4thDevice = false;
let pre = false;
let preing = false;
let cwid = -1;
let leaping = false;
let finishing = false;

const resetbind = new KeyBind("Reset Auto Four", Keyboard.KEY_NONE, "jenaddons");

register("tick", () => {
	if (one && two && three && four && five && six && seven && eight && nine){
		if (finishing) return
		finishing = true;
		setTimeout(() => {
			reset();
			stopHoldRightClick();
			prefix("&aAuto Four Finished!");
			if (config.autoFourAutoLeap && on4thDevice) leap();
		}, getspeed()+50);
	}
	if (resetbind.isPressed()) reset();
	on4thDevice = Player.getX() > 60 && Player.getX() < 68 && Player.getY() > 124 && Player.getY() < 130 && Player.getZ() > 33 && Player.getZ() < 39;
	if (on4thDevice) return;
});

function startlistener(message) {
	if (!config.autoFour || !on4thDevice) return;
	if (message === "[BOSS] Storm: I should have known that I stood no chance."){
		prefix("&aAuto Four Started");
	  	if (config.autoFourPreShoot){
			pre = true;
			prethread.start();
		}
	}
}

function finishlistener(message) {
	if (message.includes(`${Player.getName()} completed a device!`) || message.includes('The Core entrance is opening!')) {
		if (on4thDevice && !finishing){
			finishing = true;
			setTimeout(() => {
				reset();
				stopHoldRightClick();
				prefix("&aAuto Four Finished!");
				if (config.autoFourAutoLeap && on4thDevice) leap();
			}, getspeed()+50);
		}
	}
}

function bonzolistener(message) {
    if (message.includes(`Bonzo's Mask saved your life!`) && on4thDevice && config.autoFourRodSwap && config.autoFour) swaprod();
}

register("step", () => {
	finishing = false;
	leaping = false;
}).setDelay(5);

function getspeed() {
    const bow = Player.getInventory().getItems().slice(0, 9).find(a => a?.getID() === 261);
    if (!bow) return

	let shotSpeed = 300; 
    const lore = bow.getLore();

    for (let line of lore) {
        const match = line.removeFormatting().match(/^Shot Cooldown: (\d+(?:\.\d+)?)s$/);
        if (match) {
            shotSpeed = parseFloat(match[1]) * 1000; 
            break;
        }
    }

    return shotSpeed;
}

register("worldLoad", () => {
	reset();
})

const prethread = new Thread(() => {
	preing = true;
	if (pre && on4thDevice && !nine){
		holdRightClick()
		look(65.5, 127.2, 50.5, config.autoFourTime)
		prethread.sleep(config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5))
	}
	if (pre && on4thDevice && !five && !six){
		holdRightClick()
		look(65.5, 129.2, 50.5, config.autoFourTime)
		prethread.sleep(config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5))
	}
	if (pre && on4thDevice && !two && !three){
		holdRightClick()
		look(65.5, 131.2, 50.5, config.autoFourTime)
		prethread.sleep(config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5))
	}
	if (pre && on4thDevice && !one){
		holdRightClick()
		look(67.5, 131.2, 50.5, config.autoFourTime)
		prethread.sleep(config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5))
	}
	if (pre && on4thDevice && !four){
		holdRightClick()
		look(67.5, 129.2, 50.5, config.autoFourTime)
		prethread.sleep(config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5))
	}
	if (pre && on4thDevice && !seven && !eight){
		holdRightClick()
		look(67.5, 127.2, 50.5, config.autoFourTime)
		prethread.sleep(config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5))
	}
	preing = false;
	if (on4thDevice) prethread.start();
});

function onBlock(position, block) {
	const index = blocks.findIndex(xyz => position.every((coord, index) => coord === xyz[index]));
	const id = MCBlock.func_149682_b(block);
    if (!config.autoFour || !on4thDevice || index === -1) return;
	if (id === 133) {
		if (!preing){
			pre = true;
			prethread.start();
		}
		holdRightClick()
        if (index == 0){
			one = true
           	pre = false
           	look(67.5, 131.2, 50.5, config.autoFourTime)
			setTimeout(()=>{pre = true}, config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5));
        } else if (index == 1){
			two = true
           	pre = false
           	look(65.5, 131.2, 50.5, config.autoFourTime)
			setTimeout(()=>{pre = true}, config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5));
        } else if (index == 2){
			three = true
           	pre = false
           	look(65.5, 131.2, 50.5, config.autoFourTime)
			setTimeout(()=>{pre = true}, config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5));
        } else if (index == 3){
			four = true
           	pre = false
           	look(67.5, 129.2, 50.5, config.autoFourTime)
			setTimeout(()=>{pre = true}, config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5));
        } else if (index == 4){
			five = true
           	pre = false
           	look(65.5, 129.2, 50.5, config.autoFourTime)
			setTimeout(()=>{pre = true}, config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5));
        } else if (index == 5){
			six = true
           	pre = false
           	look(65.5, 129.2, 50.5, config.autoFourTime)
			setTimeout(()=>{pre = true}, config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5));
        } else if (index == 6){
			seven = true
           	pre = false
           	look(67.5, 127.2, 50.5, config.autoFourTime)
			setTimeout(()=>{pre = true}, config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5));
        } else if (index == 7){
			eight = true
           	pre = false
           	look(67.5, 127.2, 50.5, config.autoFourTime)
			setTimeout(()=>{pre = true}, config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5));
        } else if (index == 8){
			nine = true
           	pre = false
           	look(65.5, 127.2, 50.5, config.autoFourTime)
			setTimeout(()=>{pre = true}, config.autoFourTime+getspeed()+(config.autoFourRestTime*1.5));
        }
	}
};

function onBlocks(blocks) {
	for (let block of blocks) onBlock(...block);
};

function click(slot, button) {
	if (slot === undefined || button === undefined) return;
	Client.scheduleTask(0, () => {
		Client.sendPacket(new C0EPacketClickWindow(cwid, slot, button, 0, null, 0));
	}) // thanks fortnite
};

function reset() {
	finishing = false;
	pre = false;
	one = false;
	two = false;
	three = false;
	four = false;
	five = false;
	six = false;
	seven = false;
	eight = false;
	nine = false;
};

function leap() {
	if (leaping) return
	else {
	  	leaping = true;
	  	prefix("&aAuto Leaping");
	  	if (!Client.isInGui()) {
			swapFromName("leap");
			setTimeout(() => {
		  		if (!Client.isInGui()) {
					rightClick();
					setTimeout(() => {
			  			if (Client.isInGui()) {
							click(14, 0);
							leaping = false;
			  			}
					}, 200);
		  		}	
			}, 20);
	  }
	}
};

function swaprod() {
	setTimeout(() => {
	  	if (on4thDevice && !leaping) {
			prefix("&aAuto Swapping");
			let previousItem = Player.getHeldItemIndex();
			swapFromName("rod");
			setTimeout(() => {
				rightClick();
				setTimeout(() => {swap(previousItem)}, 20);
			}, 20);
	  	}
	}, 2500);
};

packetBlockChange.addListener(onBlock);
packetMultiBlockChange.addListener(onBlocks);
packetOpenWindow.addListener((_, windowId) => {cwid = windowId});
packetChat.addListener(startlistener);
packetChat.addListener(finishlistener);
packetChat.addListener(bonzolistener);
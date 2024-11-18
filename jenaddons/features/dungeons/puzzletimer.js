/// <reference types="../../../CTAutocomplete" />

import { prefix } from "../../utils/utils";
import { onRoomEnter, convertToRealCoords } from "../../../Bloom/utils/RoomUtils"
import PogObject from "../../../PogData";
import config from "../../config";

const data = new PogObject("jenaddons", {
	ttt: 9999,
    tpmaze: 9999,
    weirdos: 9999,
    icefill: 9999,
    icepath: 9999,
    quiz: 9999,
    boulder: 9999,
    waterboard: 9999
});

// ttt
let inTTT = false;
let tttTimer = 0;
let finishedTTT = false;
// tpmaze
let inTPMaze = false;
let TPMazeTimer = 0;
let finishedTPMaze = false;
// weirdos
let inWeirdos = false;
let WeirdosTimer = 0;
let finishedWeirdos = false;
// icefill
let inIceFill = false;
let IceFillTimer = 0;
let finishedIceFill = false;
// icepath
let inIcePath = false;
let IcePathTimer = 0;
let finishedIcePath = false;
// quiz
let inQuiz = false;
let QuizTimer = 0;
let finishedQuiz = false;
// boulder
let inBoulder = false;
let BoulderTimer = 0;
let finishedBoulder = false;
// waterboard
let inWater = false;
let WaterTimer = 0;
let finishedWater = false;

onRoomEnter((roomX, roomZ, rotation) => {
    if (!config.puzzleTimer) return;

    const TTTCoords = [[-4, 69, -5]]
    const TPCoords = [[3, 69, -4]]
    const WeirdosCoords = [[-2, 69, 7]]
    const IceFillCoords = [[-2, 66, -2]]
    const IcePathCoords = [[-9, 71, 1]]
    const QuizCoords = [[8, 66, 8]]
    const BoulderCoords = [[11, 68, -6]]
    const WaterCoords = [[0, 60, -10]]

    inTTT = TTTCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:stonebrick"
    })
    inTPMaze = TPCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:tallgrass"
    })
    inWeirdos = WeirdosCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:redstone_wire"
    })
    inIceFill = IceFillCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:skull"
    })
    inIcePath = IcePathCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:hopper"
    })
    inQuiz = QuizCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:leaves"
    })
    inBoulder = BoulderCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:quartz_block"
    })
    inWater = WaterCoords.some(([x, y, z]) => {
        const [x1, y1, z1] = convertToRealCoords(x, y, z, roomX, roomZ, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:lever"
    })
})

register("step", ()=>{
    if (!config.puzzleTimer) return;
    if (inTTT && !finishedTTT) tttTimer = tttTimer + 1;
    if (inTPMaze && !finishedTPMaze) TPMazeTimer = TPMazeTimer + 1;
    if (inWeirdos && !finishedWeirdos) WeirdosTimer = WeirdosTimer + 1;
    if (inIceFill && !finishedIceFill) IceFillTimer = IceFillTimer + 1;
    if (inIcePath && !finishedIcePath) IcePathTimer = IcePathTimer + 1;
    if (inQuiz && !finishedQuiz) QuizTimer = QuizTimer + 1;
    if (inBoulder && !finishedBoulder) BoulderTimer = BoulderTimer + 1;
    if (inWater && !finishedWater) WaterTimer = WaterTimer + 1;
}).setDelay(1)

//ttt
register("chat", ()=>{
    if (!config.puzzleTimer) return;
    if (!finishedTTT){
        finishedTTT = true;
        if (tttTimer < data.ttt){
            data.ttt = tttTimer;
            data.save();
            prefix("&d&lNEW PB! &r&aTic Tac Toe took " + data.ttt + " seconds!")
            return;
        }
        prefix("&aTic Tac Toe took " + tttTimer + " seconds to solve!")
    }
}).setCriteria(`PUZZLE SOLVED! ${Player.getName()} tied Tic Tac Toe! Good job!`)

//tpmaze
register("tick", ()=>{
    if (!config.puzzleTimer) return;
    if (inTPMaze && !finishedTPMaze){
        if (Player?.lookingAt()?.toString().includes("chest")){
            finishedTPMaze = true;
            if (TPMazeTimer < data.tpmaze){
                data.tpmaze = TPMazeTimer;
                data.save();
                prefix("&d&lNEW PB! &r&aTP Maze took " + data.tpmaze + " seconds!")
                return;
            }
            prefix("&aTP Maze took " + TPMazeTimer + " seconds to solve!")
        }
    }
})

//weirdos
register("chat", ()=>{
    if (!config.puzzleTimer) return;
    if (!finishedWeirdos){
        finishedWeirdos = true;
        if (WeirdosTimer < data.weirdos){
            data.weirdos = WeirdosTimer;
            data.save();
            prefix("&d&lNEW PB! &r&aThree Weirdos took " + data.weirdos + " seconds!")
            return;
        }
        prefix("&aThree Weirdos took " + WeirdosTimer + " seconds to solve!")
    }
}).setCriteria(`PUZZLE SOLVED! ${Player.getName()} wasn't fooled`).setContains()

//icefill
register("tick", ()=>{
    if (!config.puzzleTimer) return;
    if (inIceFill && !finishedIceFill){
        if (Player?.lookingAt()?.toString().includes("chest")){
            finishedIceFill = true;
            if (IceFillTimer < data.icefill){
                data.icefill = IceFillTimer;
                data.save();
                prefix("&d&lNEW PB! &r&aIce Fill took " + data.icefill + " seconds!")
                return;
            }
            prefix("&aIce Fill took " + IceFillTimer + " seconds to solve!")
        }
    }
})

//icepath
register("tick", ()=>{
    if (!config.puzzleTimer) return;
    if (inIcePath && !finishedIcePath){
        if (Player?.lookingAt()?.toString().includes("chest")){
            finishedIcePath = true;
            if (IcePathTimer < data.icepath){
                data.icepath = IcePathTimer;
                data.save();
                prefix("&d&lNEW PB! &r&aIce Path took " + data.icepath + " seconds!")
                return;
            }
            prefix("&aIce Path took " + IcePathTimer + " seconds to solve!")
        }
    }
})

//quiz
register("chat", ()=>{
    if (!config.puzzleTimer) return;
    if (inQuiz && !finishedQuiz){
            finishedQuiz = true;
            if (QuizTimer < data.quiz) {
                data.quiz = QuizTimer;
                data.save();
                prefix("&d&lNEW PB! &r&aQuiz took " + data.quiz + " seconds!")
                return;
            }
            prefix("&aQuiz took " + QuizTimer + " seconds to solve!")
    }
}).setCriteria(`[STATUE] Oruo the Omniscient: ${Player.getName()} answered the final question correctly!`)

//boulder
register("tick", ()=>{
    if (!config.puzzleTimer) return;
    if (inBoulder && !finishedBoulder){
        if (Player?.lookingAt()?.toString().includes("chest")){
            finishedBoulder = true;
            if (BoulderTimer < data.boulder){
                data.boulder = BoulderTimer;
                data.save();
                prefix("&d&lNEW PB! &r&aBoulder took " + data.boulder + " seconds!")
                return;
            }
            prefix("&aBoulder took " + BoulderTimer + " seconds to solve!")
        }
    }
})

//water
register("tick", ()=>{
    if (!config.puzzleTimer) return;
    if (inWater && !finishedWater){
        if (Player?.lookingAt()?.toString().includes("chest")){
            finishedWater = true;
            if (WaterTimer < data.waterboard){
                data.waterboard = WaterTimer;
                data.save();
                prefix("&d&lNEW PB! &r&aWaterboard took " + data.waterboard + " seconds!")
                return;
            }
            prefix("&aWaterboard took " + WaterTimer + " seconds to solve!")
        }
    }
})

register("worldLoad", ()=>{
    //ttt
    inTTT = false;
    tttTimer = 0;
    finishedTTT = false;
    //tpmaze
    inTPMaze = false;
    TPMazeTimer = 0;
    finishedTPMaze = false;
    //weirdos
    inWeirdos = false;
    WeirdosTimer = 0;
    finishedWeirdos = false;
    //icefill
    inIceFill = false;
    IceFillTimer = 0;
    finishedIceFill = false;
    //icepath
    inIcePath = false;
    IcePathTimer = 0;
    finishedIcePath = false;
    //quiz
    inQuiz = false;
    QuizTimer = 0;
    finishedQuiz = false;
    //boulder
    inBoulder = false;
    BoulderTimer = 0;
    finishedBoulder = false;
    //water
    inWater = false;
    WaterTimer = 0;
    finishedWater = false;
})
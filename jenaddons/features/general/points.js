/// <reference types="../../../CTAutocomplete" />

import PogObject from "../../../PogData"
import { prefix } from "../../utils/utils";

const points = new PogObject('jenaddons', {
    'points': 0,
    'savedpoints': [],
});

register('command', (arg, ...args) => {
    if (!arg || !args) {
        prefix('&cUsage: /point <client,server> <command>');
        return;
    };
    if (arg === "client" || arg === "server"){
        let px = Player.getX().toFixed(1);
        let py = Player.getY().toFixed(1);
        let pz = Player.getZ().toFixed(1);
    
        let existingPoint = points.savedpoints.find(point => point.x === px && point.y === py && point.z === pz);
    
        if (existingPoint) {
            existingPoint.command = args.slice(0, 5).join(' ');
            prefix(`&aReplaced Point at: ${px}, ${py}, ${pz}`);
        } else {
            points.savedpoints.push({
                x: px,
                y: py,
                z: pz,
                command: args.slice(0, 5).join(' '),
                cs: arg,
                location: getlocation()
            });
            points.points++;
            prefix(`&aSaved Point ${points.points} at: ${px}, ${py}, ${pz}`);
        }
    
        points.save();
    }
}).setName('point');

function getlocation() {
    const lines = Scoreboard.getLines();
    const line = ChatLib.removeFormatting(lines[lines.length - 5]);
    return line
}

register('command', () => {
    points.points = 0;
    points.savedpoints = [];
    points.save();

    prefix('&aCleared Points!');
}).setName('clearpoints');

register('tick', () => {
    let px = Player.getX().toFixed(1);
    let py = Player.getY().toFixed(1);
    let pz = Player.getZ().toFixed(1);

    for (let i = 0; i < points.points; i++) {
        if (points.savedpoints[i]) {
            let { x, y, z, command, cs, location } = points.savedpoints[i];
            let distance = Math.sqrt(Math.pow(px - x, 2) + Math.pow(pz - z, 2));

            if (distance <= 1.2 && py == y && location == getlocation()) {
                if (!points.savedpoints[i].executed) {
                    prefix(`&aReached Point ${i+1}!`);
                    if (cs === "client") ChatLib.command(command, true);
                    if (cs === "server") ChatLib.command(command);
                    points.savedpoints[i].executed = true;
                }
            } else {
                points.savedpoints[i].executed = false;
            }
        }
    }
});
/// <reference types="../../../CTAutocomplete" />

import config from "../../config";

register("soundPlay", (_0, name, _1, _2, _3, event)=>{
    if (!config.meowArrows) return;
    if (name == "random.successful_hit"){
        cancel(event);
        World.playSound("mob.cat.meow", 1, 1);
    }
})
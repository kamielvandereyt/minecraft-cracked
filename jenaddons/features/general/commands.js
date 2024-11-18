/// <reference types="../../../CTAutocomplete" />

import config from "../../config"

const runCommand = (command) => {
	ChatLib.command(command)
	lastTimeUsed = Date.now()
}

let lastTimeUsed = 0
const DELAY = 1000

register('chat', (rank, name, arg, igntoblock) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
    if (arg == "remove") runCommand(`block remove ${igntoblock}`)
    else if (arg == "add") runCommand(`block add ${igntoblock}`)
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: @ignore (add|remove) ?(.+)/)

register('chat', (rank, name, igntofriend) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
    runCommand(`f add ${igntofriend}`)
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: @friend ?(.+)/)

register('chat', (rank, name) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
	runCommand('p warp')
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: @warp/)

register('chat', (rank, name) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
	runCommand('p settings allinvite')
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: @allinv?/)

register('chat', (rank, name) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
    runCommand(`party ${name}`)
}).setCriteria(/From (\[.+\])? ?(.+) ?[ቾ⚒]?: @inv/)

register('chat', (rank, name, igntoparty) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
    runCommand(`party ${igntoparty}`)
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: @inv (.+)/)

register('chat', (rank, name) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
	runCommand('pc [jenaddons] Commands: @warp, @ptme, @pt <username>, @inv <username>, @allinv, @ignore add|remove <username>, @friend <username>, @kick <username>')
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: @help/)

register('chat', (rank, name) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
    runCommand(`party transfer ${name}`)
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: @ptme/)

register('chat', (rank, name, igntokick) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
    ChatLib.command(`party kick ${igntokick}`)
	lastTimeUsed = Date.now()
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: @kick (.+)/)

register('chat', (rank, name, igntotransfer) => {
    if (!config.partyCommands) return
	if (Date.now() - lastTimeUsed < DELAY) return
    if (!igntotransfer) ChatLib.command(`party transfer ${name}`)
    else ChatLib.command(`party transfer ${igntotransfer}`)
	lastTimeUsed = Date.now()
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: @pt (.+)/)
/// <reference types="../CTAutocomplete" />

import { @Vigilant, @TextProperty, @ButtonProperty, @SwitchProperty, @ColorProperty, @DecimalSliderProperty, Color, @SelectorProperty } from "../Vigilance";

@Vigilant("jenaddons", "jenaddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Dungeons", "F7"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class config {

	@SwitchProperty({
		name: "Puzzle Timer",
		description: "Timer for Puzzles",
        subcategory: "Puzzles",
		category: "Dungeons"
	})
	puzzleTimer = false;

	@SwitchProperty({
		name: "Anti-Lowballers",
		description: "Auto reports Lowballers",
        subcategory: "Skyblock",
		category: "General"
	})
	fuckLowballers = false;

	@SwitchProperty({
		name: "Cripple Addons",
		description: "1/100 Chance to become crippled",
        subcategory: "Goldor",
		category: "F7"
	})
	crippleAddons = false;

	@SwitchProperty({
		name: "Pet Keybinds",
		description: "Wardrobe Keybinds but for Pets",
        subcategory: "Skyblock",
		category: "General"
	})
	petKeybinds = false;

	@SwitchProperty({
		name: "Meow Etherwarp",
		description: "Replaces the ethewarp sound with a ping",
        subcategory: "Sounds",
		category: "General"
	})
	meowEtherwarp = false;

	@SwitchProperty({
		name: "Anti Kick",
		description: "Cancels the waiting time when you get kicked from Skyblock",
        subcategory: "Skyblock",
		category: "General"
	})
	antiKick = false;

	@SwitchProperty({
		name: "Auto Four",
		description: "Automatically does the 4th device for you",
        subcategory: "Auto Four",
		category: "F7"
	})
	autoFour = false;

	@DecimalSliderProperty({
		name: "Rotate Time",
		description: "",
		subcategory: "Auto Four",
		category: "F7",
		minF: 0,
		maxF: 100,
		decimalPlaces: 0
	})
	autoFourTime = 50;

	@DecimalSliderProperty({
		name: "Rest Time",
		description: "Increase this if it's skipping the block instead of shooting it",
		subcategory: "Auto Four",
		category: "F7",
		minF: 0,
		maxF: 70,
		decimalPlaces: 0
	})
	autoFourRestTime = 30;

	@SwitchProperty({
		name: "Pre Shoot",
		description: "Automatically starts to pre shoot before P3 has started",
        subcategory: "Auto Four",
		category: "F7"
	})
	autoFourPreShoot = false;

	@SwitchProperty({
		name: "Auto Swap",
		description: "Automatically uses your rod when you pop your bonzo mask",
        subcategory: "Auto Four",
		category: "F7"
	})
	autoFourRodSwap = false;
	
	@SwitchProperty({
		name: "Auto Leap",
		description: "Automatically leaps when you finish Auto Four",
        subcategory: "Auto Four",
		category: "F7"
	})
	autoFourAutoLeap = false;

	@SwitchProperty({
		name: "Auto Walk",
		description: "Automatically walks when you door skip",
        subcategory: "Auto Door Skip",
		category: "Dungeons"
	})
	autoWalk = false;

	@SwitchProperty({
		name: "Create Ghost Blocks",
		description: "Automatically creates the ghost blocks that you have to mine to walk through the door (why would you want this off?)",
        subcategory: "Auto Door Skip",
		category: "Dungeons"
	})
	autoGhostBlocks = true;

	@SwitchProperty({
		name: "Dialogue Skip Helper",
		description: "Timer for Dialogue Skip",
        subcategory: "General",
		category: "Dungeons"
	})
	dialogueSkipHelper = false;

	@SwitchProperty({
		name: "Secret Triggerbot",
		description: "Automatically clicks on secrets when you look at them",
        subcategory: "General",
		category: "Dungeons"
	})
	secretTriggerBot = false;

	@DecimalSliderProperty({
		name: "Secret Triggerbot Delay",
		description: "",
		subcategory: "General",
		category: "Dungeons",
		minF: 50,
		maxF: 200,
		decimalPlaces: 0
	})
	secretTriggerBotDelay = 100;

	@SwitchProperty({
		name: "SS Timer",
		description: "Timer for Simon Says",
        subcategory: "Goldor",
		category: "F7"
	})
	ssTimer = false;

	@SwitchProperty({
		name: "Auto Tac",
		description: "Automatically uses your Tactical Insertion at 3 seconds",
        subcategory: "General",
		category: "Dungeons"
	})
	autoTac = false;

	@SwitchProperty({
		name: "Meow Arrows",
		description: "Replaces the ding sound effect from shooting your bow with a meow",
        subcategory: "Sounds",
		category: "General"
	})
	meowArrows = false;

	@SwitchProperty({
		name: "Party Commands",
		description: "Use @help for a list of the commands",
        subcategory: "Chat",
		category: "General"
	})
	partyCommands = false;

	@SwitchProperty({
		name: "Early Enter Titles",
		description: "Alerts you when someone is at an early enter location",
        subcategory: "Goldor",
		category: "F7"
	})
	eeTitles = false;

    constructor() {
        this.initialize(this);
		this.addDependency("Rotate Time", "Auto Four")
		this.addDependency("Auto Swap", "Auto Four")
		this.addDependency("Auto Leap", "Auto Four")
		this.addDependency("Rest Time", "Auto Four")
		this.addDependency("Pre Shoot", "Auto Four")
		this.addDependency("Secret Triggerbot Delay", "Secret Triggerbot")
    }
}

export default new config()
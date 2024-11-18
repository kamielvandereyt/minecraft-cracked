import Settings from "../../config";

let inp3 = false;
const currentTitle = { title: null, time: null };
let started = null;

register("chat", () => inp3 = true).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?");
register("chat", () => inp3 = false).setCriteria("The Core entrance is opening!");

function catnoises() {
    World.playSound("mob.cat.meow", 0.45, 2.5);
}

function catnoisesloop() {
    const delays = Array(120).fill(10);

    function playWithDelay(index) {
        if (index >= delays.length) return;

        setTimeout(() => {
            catnoises();
            playWithDelay(index + 1);
        }, delays[index]);
    }

    playWithDelay(0);
}

const title = (title) => {
    const [x, y] = [
        Renderer.screen.getWidth() / 2,
        Renderer.screen.getHeight() / 2
    ];

    Renderer.translate(x, y);
    Renderer.scale(2, 2);
    Renderer.drawStringWithShadow(title, -(Renderer.getStringWidth(title) / 2), -30);
};

function formatMessage(msg) {
    const lowerCaseMsg = msg.toLowerCase();

    if (lowerCaseMsg.match(/\b(early enter|pre enter|ee|pre|early entry) 2\b/i) || lowerCaseMsg.includes("at ee2")) {
        return "2";
    } else if (lowerCaseMsg.match(/\b(early enter|pre enter|ee|pre|early entry) 3\b/i) || lowerCaseMsg.includes("at ee3")) {
        return "3";
    } else if (lowerCaseMsg.match(/\b(early enter|pre enter|ee|pre|early entry) 4\b/i) || lowerCaseMsg.includes("at ee4") || lowerCaseMsg.includes("at core")) {
        return "4";
    }

    return "";
}

const showTitle = (name, msg) => {
    const formattedMsg = formatMessage(msg);

    if (formattedMsg !== "") {
        currentTitle.title = `&e${name} is At Early Enter ${formattedMsg}`;
        currentTitle.time = 1500;
        started = Date.now();
        catnoisesloop();
    }
};

register("chat", (rank, name, msg) => {
    if (!Settings.eeTitles || !inp3 || name === Player.getName()) return;

    showTitle(name, msg);
}).setCriteria(/Party > (\[.+\])? ?(.+): (.+)/);

register("renderOverlay", () => {
    if (!currentTitle.time || !currentTitle.title) return;

    const elapsed = Date.now() - started;
    const remainingTime = currentTitle.time - elapsed;

    if (remainingTime <= 0) {
        currentTitle.title = null;
        currentTitle.time = null;
        return;
    }

    title(currentTitle.title);
});

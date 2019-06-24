import "phaser";
import { BootScene } from "./scenes/bootScene";
import { NormalScene } from "./scenes/normalScene";
import { HellScene } from "./scenes/hellScene";
import { IntroScene } from "./scenes/introScene";
import { Arcade } from "./arcade/arcade"

const config: GameConfig = {
    title: "Shit Horses",
    version: "1.0",
    width: 1440,
    height: 900,
    scene: [BootScene, NormalScene, HellScene, IntroScene],
    parent: "game",
    input: {
        keyboard: true,
        gamepad: true
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 475 },
            debug: true
        }
    },
    backgroundColor: "#000000",
    render: { pixelArt: true, antialias: false }
};

    export class ShitHorsesGame extends Phaser.Game {

    private arcade : Arcade
    public get Arcade() : Arcade { return this.arcade }
    constructor(config: GameConfig) {
        super(config);
        this.arcade = new Arcade(true)
    }
}

window.onload = () => {
    var game = new ShitHorsesGame(config);
};
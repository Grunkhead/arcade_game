import "phaser";
import { BootScene } from "./scenes/bootScene";
import { NormalScene } from "./scenes/normalScene";
import { HellScene } from "./scenes/hellScene";

const config: GameConfig = {
    title: "Shit Horses",
    version: "1.0",
    width: 1440,
    height: 900,
    scene: [BootScene, NormalScene, HellScene],
    parent: "game",
    input: {
        keyboard: true
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
    constructor(config: GameConfig) {
        super(config);
    }
}

window.onload = () => {
    var game = new ShitHorsesGame(config);
};
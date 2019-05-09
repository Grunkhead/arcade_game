import "phaser";
export class GameScene extends Phaser.Scene {

    delta: number;
    lastStarTime: number;
    starsCaught: number;
    starsFallen: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "GameScene"
        });
    }

    init(params): void {
    }

    // Load assets before it is used. To prevent delay.
    preload(): void {
    }

    // Create the items for the game.
    create(): void {
    }

    // Update the game based on logic or input.
    update(): void {
    }
};
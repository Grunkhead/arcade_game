export class Unicorn extends Phaser.GameObjects.Sprite {

    scene: Phaser.Scene;

    x: number; 
    y: number;

    currentSprite: string;

    // acceleration: number;
    // health: number = 100;
    // width:  number = 100;
    // height: number = 100;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'unicornOne')

        this.scene = scene;
        this.setScale(0.5);

        this.x = x;
        this.y = y;

        this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    update(): void {
    }
};
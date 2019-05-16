export class Flag extends Phaser.GameObjects.Sprite {

    x: number;
    y: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'flag');

        this.scene = scene;
        this.setScale(0.15);
        this.depth = -1;

        this.x = x;
        this.y = y;

        this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    update(): void {
    }
};
export class Ground extends Phaser.GameObjects.Sprite {
    scene: Phaser.Scene;

    x: number;
    y: number;

    width: number;
    height: number;

    constructor(params) {
        super(params.scene, params.x, params.y, 'flag');

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
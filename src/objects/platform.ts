export class Platform extends Phaser.GameObjects.Sprite {

    scene: Phaser.Scene;

    x: number;
    y: number;

    width: number;
    height: number;

    currentSprite: string;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'platform');

        this.scene = scene;
        this.setScale(5);

        this.x = x;
        this.y = y;

        this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    public update(): void {
    }
};
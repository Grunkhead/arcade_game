export class Blackhole extends Phaser.GameObjects.Sprite {

    scene: Phaser.Scene;

    x: number; 
    y: number;

    currentSprite: string;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'blackhole_5');

        this.scene = scene;
        this.setScale(4);

        this.x = x;
        this.y = y;

        this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    public update(): void {}

    // public suckObject(object: any): void {
    //     object.x = this.x;
    //     // object.anchor.setTo(0.5, 0.5);
    //     // object.angle += 1;
    // }
};
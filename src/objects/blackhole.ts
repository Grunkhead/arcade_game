export class Blackhole extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;

    width: number;
    height: number;

    x: number; 
    y: number;

    currentSprite: string;

    constructor(params) {
        super(params.scene, params.x, params.y, 'blackhole_5');

        this.scene = params.scene;

        this.x = params.x;
        this.y = params.y;

        this.setScale(4);
        this.setPhysics();

        this.scene.add.existing(this);
    }

    setPhysics(): void {
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.setSize(this.width, this.height);
    }

    // Update the game based on logic or input.
    update(): void {}

    suckObject(object: any): void {
        object.x = this.x; 
        // object.anchor.setTo(0.5, 0.5);
        // object.angle += 1;
    }
};
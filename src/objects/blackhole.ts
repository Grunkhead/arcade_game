export class Blackhole extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;

    width: number;
    height: number;

    x: number; 
    y: number;

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
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.setSize(this.width, this.height);
    }

    // Update the game based on logic or input.
    update(): void {}

    // suckObject(object: any): void {
    //     object.body.setAllowGravity(false);

    //     object.x = this.x; 
    //     object.y = this.y;
    // }
};
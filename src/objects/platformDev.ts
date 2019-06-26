export class PlatformDev extends Phaser.Physics.Arcade.Sprite {
    protected scene: Phaser.Scene;

    public x: number;
    public y: number;

    constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {
        super(scene, x, y, spriteName);
        this.scene = scene;

        this.height = 400;
        this.width = 55;

        this.x = x;
        this.y = y;

        this.setScale(1.15);
        this.setPhysics();
        this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    public update(): void {
    }

    // Following object requires a speed property!
    // public addFollower(object: any): void {
    //     if (this.dynamic) {
    //         if (this.moveLeft) { object.x -= this.speed; }
    //         if (this.moveRight) { object.x += this.speed; }
    //     }
    // }

    private setPhysics(): void {
        this.scene.physics.add.existing(this);
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false);
        body.setImmovable(true);
    }
};
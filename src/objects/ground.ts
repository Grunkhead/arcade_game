export class Ground extends Phaser.Physics.Arcade.Sprite {
    // protected scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {
        super(scene, x, y, spriteName);
        this.scene = scene;

        this.x = x;
        this.y = y;

        this.setPhysics();
        this.setVisuals();
        this.scene.add.existing(this);
    }

    public update(): void {}

    private setVisuals(): void {
        this.displayWidth = 1440;
        this.displayHeight = 30;
    }
    
    private setPhysics(): void {
        this.scene.physics.add.existing(this);
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false);
        body.setImmovable(true);
    }
};
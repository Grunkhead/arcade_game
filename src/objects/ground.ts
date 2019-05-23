export class Ground extends Phaser.Physics.Arcade.Sprite {
    protected scene: Phaser.Scene;

    private x: number;
    private y: number;

    private width: number;
    private height: number;

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
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }
};
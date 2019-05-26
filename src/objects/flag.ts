export class Flag extends Phaser.GameObjects.Sprite {

    public spriteName: string;

    x: number;
    y: number;

    width: number;
    height: number;

    flag: Flag;

    constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {
        super(scene, x, y, spriteName);

        this.scene = scene;
        this.setScale(0.15);
        this.depth = -1;

        this.spriteName = spriteName;

        this.x = x;
        this.y = y;

        this.setPhysics();

        this.scene.add.existing(this);
    }

    setPhysics(): void {
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setSize(this.width, this.height);
    }

    remove(): void {
        this.flag.remove();
    }

    // Update the game based on logic or input.
    update(): void {}
};
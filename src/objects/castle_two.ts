export class CastleTwo extends Phaser.Physics.Arcade.Sprite {
  
    public spriteName: string;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {
        
        super(scene, x, y, spriteName);

        this.scene = scene;
        this.spriteName = spriteName;

        this.setScale(0.4);
        this.depth = -1;

        this.x = x;
        this.y = y;

        this.setPhysics();

        this.scene.add.existing(this);
    }

    setPhysics(): void {
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.setCollideWorldBounds(true);
        this.body.setSize(this.width, this.height);
    }

    // Update the game based on logic or input.
    update(): void {}
};
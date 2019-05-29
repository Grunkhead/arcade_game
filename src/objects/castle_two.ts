export class CastleTwo extends Phaser.Physics.Arcade.Sprite {
  
    public spriteName: string;

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
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.setSize(this.width, this.height);
        this.setCollideWorldBounds(true);
    }

    // Update the game based on logic or input.
    update(): void {}
};
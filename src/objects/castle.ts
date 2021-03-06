export class Castle extends Phaser.Physics.Arcade.Sprite {
  
    public spriteName: string;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {
        
        super(scene, x, y, spriteName);

        this.scene = scene;
        this.spriteName = spriteName;

        this.setScale(1.0);

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
export class Castle extends Phaser.GameObjects.Sprite {
  
    x: number;
    y: number;

    width: number;
    height: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'castle');

        this.scene = scene;
        this.setScale(0.25);
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
        this.setCollideWorldBounds(true)
        this.body.setSize(this.width, this.height);
    }

    // Update the game based on logic or input.
    update(): void {}
};
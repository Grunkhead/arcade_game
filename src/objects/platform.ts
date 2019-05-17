export class Platform extends Phaser.Physics.Arcade.Sprite {
    
    scene: Phaser.Scene;

    speed:     number  = 3;
    moveRight: boolean = true;
    moveLeft:  boolean;

    x: number;
    y: number;

    currentSprite: string;

    constructor(scene, x: number, y: number, texture: string, friction: number = 1) {
        super(scene, x, y, 'platform');
        this.scene = scene;

        this.x = x;
        this.y = y;

        this.setScale(2);
        this.setPhysics();
        this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    public update(): void {
        this.move();
    }

    private setPhysics(): void {
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setCollideWorldBounds(true);
        this.setSize(this.displayWidth + 1, this.displayHeight + 1);
    }

    private move(): void {

        if (this.x < 320) {
            this.moveRight = true;
            this.moveLeft  = false;
        }

        if (this.x > 1120) {
            this.moveLeft  = true;
            this.moveRight = false;
        }

        if (this.moveLeft) { this.x -= this.speed; }
        if (this.moveRight) { this.x += this.speed; }
    }
};
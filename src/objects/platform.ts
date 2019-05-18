export class Platform extends Phaser.Physics.Arcade.Sprite {
    private scene: Phaser.Scene;

    private speed:    number  = 3;
    public moveRight: boolean = true;
    public moveLeft:  boolean;

    public dynamic: boolean = false;

    private width: number = 160;
    private height: number = 30;

    x: number;
    y: number;

    constructor(params) {
        super(params.scene, params.x, params.y, 'platform');
        this.scene = params.scene;

        this.x = params.x;
        this.y = params.y;

        this.dynamic = params.dynamic;

        this.setScale(5);
        this.setPhysics();
        
        this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    public update(): void {
        if (this.dynamic) { this.move(); }
    }

    private setPhysics(): void {
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
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
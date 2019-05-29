export class Platform extends Phaser.Physics.Arcade.Sprite {
    protected scene: Phaser.Scene;

    public  speed:     number  = 3;
    private moveRight: boolean = true;
    private moveLeft:  boolean;

    // private spriteName: string;
    private dynamic: boolean;

    public x: number;
    public y: number;

    constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string, dynamic: boolean = false) {
        super(scene, x, y, spriteName);
        this.scene = scene;

        this.height = 30;
        this.width = 160;

        this.x = x;
        this.y = y;

        this.dynamic = dynamic;

        this.setScale(5);
        this.setPhysics();
        this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    public update(): void {
        if (this.dynamic) { this.move(); }
    }

    // Following object requires a speed property!
    public addFollower(object: any): void {
        if (this.dynamic) {
            if (this.moveLeft) { object.x -= this.speed; }
            if (this.moveRight) { object.x += this.speed; }
        }
    }

    private setPhysics(): void {
        this.scene.physics.add.existing(this);
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false);
        body.setImmovable(true);
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
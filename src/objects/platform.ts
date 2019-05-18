export class Platform extends Phaser.Physics.Arcade.Sprite {
    private scene: Phaser.Scene;

    public speed:     number  = 3;
    public moveRight: boolean = true;
    public moveLeft:  boolean;

    public dynamic: boolean = false;

    private width: number;
    private height: number;

    private spriteName: string = 'platform';

    x: number;
    y: number;

    constructor(params) {
        // Check if any sprite name is passed on creation.
        if (params.spriteName) { this.spriteName = params.spriteName }

        super(params.scene, 
              params.x, 
              params.y, 
              this.spriteName
        );

        // Set width and height here, because of bug?
        this.width = 160;
        this.height = 30;

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

    // Following object requires a speed property!
    addFollower(object: any): void {
        if (this.dynamic) {
            if (this.moveLeft) { object.x -= this.speed; }
            if (this.moveRight) { object.x += this.speed; }
        }
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
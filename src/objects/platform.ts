// export class Platform extends Phaser.GameObjects.Sprite {

    export class Platform extends Phaser.Physics.Arcade.Sprite {

    scene: Phaser.Scene;

    x: number;
    y: number;

    width: number;
    height: number;

    moveRight: boolean = true;
    moveLeft: boolean;
    speed: number = 3;

    currentSprite: string;

    constructor(scene, x: number, y: number, texture:string, friction:number = 1) {
        super(scene, x, y, 'platform');

        this.scene = scene;
        this.setScale(5);

        this.x = x;
        this.y = y;

        this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    public update(): void {
        this.checkLocation();
        this.move();
    }

    private move(): void {

        if (this.moveLeft) {
            this.x -= this.speed;
        }

        if (this.moveRight) {
            this.x += this.speed;
        }
    }

    private checkLocation(): void {

        if (this.x < 200) {
            this.moveRight = true;
            this.moveLeft  = false;
        }

        if (this.x > 1240) {
            this.moveLeft  = true;
            this.moveRight = false;

        }
    }
};
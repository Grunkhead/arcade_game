import { NormalScene } from "../scenes/normalScene"

export class Unicorn extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;

    static playerCount: number;

    x: number; 
    y: number;

    // private speed: number = 5;
    speedLeft:  number = 0;
    speedRight: number = 0;
    speedUp:    number = 0;
    speedDown:  number = 0;

    acceleration: number;
    health:   number = 100;

    width:    number = 100;
    height:   number = 100;

    // Assign key controls.
    keys: any = {};

    constructor(params) {
        super(params.scene,
              params.x,
              params.y, 
              params.spriteName
        );

        this.keys = params.keys;

        this.playerCount++;

        this.scene = params.scene;
        this.setScale(0.7);

        this.x = params.x;
        this.y = params.y;

        this.setEventListeners();
        this.setPhysics();
        
        this.scene.add.existing(this);
    }

    private setPhysics(): void {
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(true);
        this.setCollideWorldBounds(true)
        
        // Add some extra width and height because of smaller hitbox.
        this.setSize(this.displayWidth + 20, this.displayHeight + 20);
    }

    // Update the game based on logic or input.
    public update(): void {
        this.move();
    }

    private move(): void {
        this.x -= this.speedLeft;
        this.x += this.speedRight;
        this.y -= this.speedUp;
        this.y += this.speedDown;
    }

    // Increase speed when a specific key is pressed.
    private onKeyDown(e: KeyboardEvent): void {
        if (e.keyCode == this.keys.left &&  this.speedLeft < 1)  { this.speedLeft  += 5; }
        if (e.keyCode == this.keys.right && this.speedRight < 1) { this.speedRight += 5; }
        if (e.keyCode == this.keys.up &&    this.speedUp < 1)    { this.speedUp    += 5; }
        if (e.keyCode == this.keys.down &&  this.speedDown < 1)  { this.speedDown  += 5; }
    }

    // Reset a specific speed when a key is released.
    private onKeyUp(e: KeyboardEvent): void {
        if (e.keyCode == this.keys.left)  { this.speedLeft  = 0; }
        if (e.keyCode == this.keys.right) { this.speedRight = 0; }
        if (e.keyCode == this.keys.up)    { this.speedUp    = 0; }
        if (e.keyCode == this.keys.down)  { this.speedDown  = 0; }
    }

    setEventListeners(): void {
        // Listen to the key up and down events.
        document.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        document.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }

    setPlayerControls(): void {
        if (this.playerCount == 1) {

        }

        if (this.playerCount == 2) {
            
        }
    }
};

import { NormalScene } from "../scenes/normalScene"
import { Flag } from "./flag";

export class Unicorn extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;

    x: number; 
    y: number;

    spriteName: string;

    speedLeft:  number = 0;
    speedRight: number = 0;
    speedUp:    number = 0;
    speedDown:  number = 0;

    width:    number = 100;
    height:   number = 100;

    // Keys get assigned by the constructor.
    keys: any = {};

    constructor(params) {
        super(params.scene,
              params.x,
              params.y, 
              params.spriteName
        );

        this.spriteName = params.spriteName;
        this.keys = params.keys;

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
        this.body.setCollideWorldBounds(true); 
        
        // Add some extra width and height because of smaller hitbox.
        this.setSize(this.displayWidth + 20, this.displayHeight + 20);
    }

    public grabFlag(flag: Flag): void {
        flag.x = this.x - 5;
        flag.y = this.y - 40;
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
        if (e.keyCode == this.keys.left && this.speedLeft < 1) { 
            this.setTexture(this.spriteName + '_left');
            this.speedLeft += 5;
        }
        if (e.keyCode == this.keys.right && this.speedRight < 1) { 
            this.setTexture(this.spriteName + '_right');
            this.speedRight += 5;
        }
        
        if (this.body.touching.down) {
            if (e.keyCode == this.keys.up && this.speedUp < 1) { 
                this.speedUp += 8;
            }
            if (e.keyCode == this.keys.down && this.speedDown < 1) { 
                this.speedDown += 5;
            }
        }
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
};

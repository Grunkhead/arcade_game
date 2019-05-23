import { Flag } from "./flag";
import { Mace } from "./mace";
import { Axe } from "./axe";


export class Unicorn extends Phaser.Physics.Arcade.Sprite {
    protected scene: Phaser.Scene;

    public x: number; 
    public y: number;

    private spriteName: string;

    public speedLeft:  number = 0;
    public speedRight: number = 0;
    public speedUp:    number = 0;
    public speedDown:  number = 0;

    private width:    number = 100;
    private height:   number = 100;

    // Keys get assigned by the constructor.
    private keys: any = {};

    constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string, keys: object) {
        super(scene, x, y, spriteName);
        this.scene = scene;

        this.spriteName = spriteName;
        this.keys = keys;

        this.x = x;
        this.y = y;

        this.setPhysics();
        this.setVisuals();
        this.setEventListeners();
        this.scene.add.existing(this);
    }

    private setVisuals(): void {
        this.setScale(0.7);
    }

    private setPhysics(): void {
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(true);
        this.body.setCollideWorldBounds(true); 
        
        // Add some extra width and height because of smaller hitbox.
        this.setSize(this.displayWidth, this.displayHeight - 20);
    }

    // Enabeling grabbing the flag
    public grabFlag(flag: Flag): void {
        flag.x = this.x - 5;
        flag.y = this.y - 40;
    }

    // Enabeling grabbing the weapons
    public grabMace(mace: Mace): void {
        mace.x = this.x - 5;
        mace.y = this.y - 40;
    }

    public grabAxe(axe: Axe): void {
        axe.x = this.x - 5;
        axe.y = this.y - 40;
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

    private setEventListeners(): void {
        // Listen to the key up and down events.
        document.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        document.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }
};

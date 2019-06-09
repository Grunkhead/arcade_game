import { Flag } from "./flag";
import { Mace } from "./mace";
import { Axe } from "./axe";

import { NormalScene } from "../scenes/normalScene";


export class Unicorn extends Phaser.Physics.Arcade.Sprite {
    
    protected scene: Phaser.Scene;

    private cursors: Phaser.Input.Keyboard.CursorKeys
    
    public x: number; 
    public y: number;

    public spriteName: string;

    public normalScene: NormalScene;

    public speedLeft:  number = 0;
    public speedRight: number = 0;
    public speedUp:    number = 0;
    public speedDown:  number = 0;

    public healthBarOne: number = 0;
    public healthBarTwo: number = 0;

    public width:    number = 100;
    public height:   number = 100;

    protected mace: Mace;

    // Keys get assigned by the constructor.
    private keys: any = {};
    private sound: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene, x: number, y: number, 
        spriteName: string, keys: object) {

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
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(true);
        body.setCollideWorldBounds(true);
        body.setGravity(0, 0);
        
        // Add some extra width and height because of smaller hitbox.
        this.setSize(this.displayWidth, this.displayHeight - 20);
    }

    // Code for weapon animation  ---- Not working properly yet
    public slashWeapon(weapon: Mace): void {
        this.scene.tweens.add({        
            target: this.mace,
            angle: 360,
            scene: this.scene,
            duration: 6000,
            yoyo: true,
            repeat: -1
            // To creat "Charging" time for weapons
            // timeScale : number
    })
    console.log("Je hebt aangevallen!")
};

    // Enabeling grabbing the flag
    public grabFlag(flag: Flag): void {
        flag.x = this.x - 5;
        flag.y = this.y - 40;
    }

    // Enabeling grabbing the weapons
    public grabMace(mace: Mace): void {
        mace.x = this.x - 45;
        mace.y = this.y - 40;
        // Rotate the mace
        // TODO ROTATION WEER AAN ZETTEN
        // mace.body.rotation = - 45;
        // Flip the mace when you turn
        mace.flipX = true;
    }

    public grabAxe(axe: Axe): void {
        axe.x = this.x - 45;
        axe.y = this.y - 40;

        // TODO ROTATION WEER AAN ZETTEN
        // axe.body.rotation = - 45;

        axe.flipX = true;
    }

    // Update the game based on logic or input.
    public update(): void {
        this.move();
    }

    private move(): void {
        this.x -= this.speedLeft;
        this.x += this.speedRight;
        this.y -= this.speedUp;
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
                this.jump();
            }
        }
    }

    // Reset a specific speed when a key is released.
    private onKeyUp(e: KeyboardEvent): void {
        if (e.keyCode == this.keys.left)  { this.speedLeft  = 0; }
        if (e.keyCode == this.keys.right) { this.speedRight = 0; }
        if (e.keyCode == this.keys.up)    { this.speedUp    = 0; }
        if (e.keyCode == this.keys.dash)  { this.speedDown  = this.x -1; }
        if (e.keyCode == this.keys.slash) { this.slashWeapon }
    }

    private setEventListeners(): void {
        // Listen to the key up and down events.
        document.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        document.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }

    private jump(){
        this.speedUp += 20;
        let jumpSound = this.scene.sound.add('jump_sound', { loop: false });
        jumpSound.play();

        // Add if statement that allows double jump.
        // Check if there is collision
        // If false allow a second jump.
    }
};

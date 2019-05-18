import { NormalScene } from "../scenes/normalScene"

export class Unicorn extends Phaser.Physics.Arcade.Sprite {
    
    private cursors: Phaser.Input.Keyboard.CursorKeys
    private normalScene : NormalScene

    private scene: Phaser.Scene;

    public x: number; 
    public y: number;

    // private speed: number = 5;
    private speedLeft:  number = 0;
    private speedRight: number = 0;
    private speedUp:    number = 0;
    private speedDown:  number = 0;

    private acceleration: number;
    private health:       number = 100;
    // private width:    number = 100;
    // private height:   number = 100;

    private keyLeft:  number = 65; // W
    private keyRight: number = 68; // A
    private keyUp:    number = 87; // S
    private keyDown:  number = 83; // D
    private keyDash:  number = 9;  // TAB

    constructor(scene: NormalScene, x: number, y: number) {
        super(scene, x, y, 'morty')

        this.scene = scene;
        this.setScale(0.3);

        this.x = x;
        this.y = y;

        this.setEventListeners();
        this.setPhysics();
        
        this.scene.add.existing(this);
    }

    private setPhysics(): void {
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(true);
        this.setCollideWorldBounds(true)
        
        // Add some extra width and height because of smaller hitbox.
        this.setSize(this.displayWidth + 60, this.displayHeight + 60);
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
        if (e.keyCode == this.keyLeft)  { this.speedLeft  += 5; }
        if (e.keyCode == this.keyRight) { this.speedRight += 5; }
        if (e.keyCode == this.keyUp)    { this.speedUp    += 5; }
        if (e.keyCode == this.keyDown)  { this.speedDown  += 5; }
    }

    // Reset a specific speed when a key is released.
    private onKeyUp(e: KeyboardEvent): void {
        if (e.keyCode == this.keyLeft)  { this.speedLeft = 0; }
        if (e.keyCode == this.keyRight) { this.speedRight = 0; }
        if (e.keyCode == this.keyUp)    { this.speedUp = 0; }
        if (e.keyCode == this.keyDown)  { this.speedDown = 0; }
    }

    setEventListeners(): void {
        // Listen to the key up and down events.
        document.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        document.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }
};

import { NormalScene } from "../scenes/normalScene"

export class Unicorn extends Phaser.Physics.Arcade.Sprite {
    
    private cursors: Phaser.Input.Keyboard.CursorKeys
    private normalScene : NormalScene

    private scene: Phaser.Scene;
    private currentSprite: string;

    private x: number; 
    private y: number;

    private speed_x:  number = 0;
    private speed_y:  number = 0;

    private acceleration: number;
    private health:   number = 100;
    // private width:    number = 100;
    // private height:   number = 100;

    private keyLeft:  number = 65;
    private keyRight: number = 68;
    private keyUp:    number = 87;
    private keyDown:  number = 83;

    keys: Object<number> = {

    }

    constructor(scene: NormalScene, x: number, y: number) {
        super(scene, x, y, 'unicornOne')

        this.scene = scene;
        this.setScale(0.5);

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

    // Bind the 
    private move(): void {
        this.x += this.speed_x;
        this.y += this.speed_y;
    }

    // Increase speed when a specific key is pressed.
    private onKeyDown(e: KeyboardEvent): void {
        if (e.keyCode == this.keyLeft)  { this.speed_x -= 5; }
        if (e.keyCode == this.keyRight) { this.speed_x += 5; }
        if (e.keyCode == this.keyUp)    { this.speed_y -= 5; }
        if (e.keyCode == this.keyDown)  { this.speed_y += 5; }
    }

    // Reset a specific speed when a key is released.
    private onKeyUp(e: KeyboardEvent): void {
        if (e.keyCode == this.keyLeft)  { this.speed_x = 0; }
        if (e.keyCode == this.keyRight) { this.speed_x = 0; }
        if (e.keyCode == this.keyUp)    { this.speed_y = 0; }
        if (e.keyCode == this.keyDown)  { this.speed_y = 0; }
    }

    setEventListeners(): void {
        // Listen to the key up and down events.
        document.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        document.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }
};

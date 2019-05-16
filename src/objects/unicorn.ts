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

    constructor(scene: NormalScene, x: number, y: number) {
        super(scene, x, y, 'unicornOne')

        this.scene = scene;
        this.setScale(0.5);

        this.x = x;
        this.y = y;

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        console.log("the cursors work!")
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.1)
        this.setDragX(800)

        this.setEventListeners();
        this.setPhysics();
        
        this.scene.add.existing(this);
    }

    private setPhysics(): void {
        // Add some extra width and height because of smaller hitbox.
        this.setSize(this.displayWidth + 60, this.displayHeight + 60);

        this.body.setAllowGravity(true);
        this.scene.physics.add.existing(this);
    }

    // Update the game based on logic or input.
    public update(): void {

            // Move left an right 
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            // this.flipX = true
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            // this.flipX = false
        } 

        // Move up and down.
        if (this.cursors.up.isDown) {
            this.setVelocityY(-350)
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(350)
        }
        
        // Jump when the body is touching the floor.
        let grounded = this.body.touching.down 
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-400)
        }

        this.move();
    }

    private move(): void {
        this.x += this.speed_x;
        this.y += this.speed_y;
    }

    private onKeyDown(e: KeyboardEvent): void {
        if (e.keyCode == 65) { this.speed_x -= 5; }
        if (e.keyCode == 68) { this.speed_x += 5; }
        if (e.keyCode == 87) { this.speed_y -= 5; }
        if (e.keyCode == 83) { this.speed_y += 5; }
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (e.keyCode == 65) { this.speed_x = 0; }
        if (e.keyCode == 68) { this.speed_x = 0; }
        if (e.keyCode == 87) { this.speed_y = 0; }
        if (e.keyCode == 83) { this.speed_y = 0; }
    }

    setEventListeners(): void {
        // These listeners listen to keyboard events.
        document.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        document.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }
};

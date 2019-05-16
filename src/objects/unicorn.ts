import { NormalScene } from "../scenes/normalScene"

export class Unicorn extends Phaser.Physics.Arcade.Sprite {

    // New Var for movement
    
    private cursors: Phaser.Input.Keyboard.CursorKeys
    private normalScene : NormalScene

    scene: Phaser.Scene;

    x: number; 
    y: number;

    currentSprite: string;

    acceleration: number;
    health: number = 100;
    width:  number = 100;
    height: number = 100;

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
        // this.setDragX(800)

        // this.scene.add.existing(this);
    }

    // Update the game based on logic or input.
    update(): void {

            // Move left an right 
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            // this.flipX = true
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            // this.flipX = false
        } 

        // Move up and down
        // console.log("hoi")
        if (this.cursors.up.isDown) {
            this.setVelocityY(-350)
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(350)
        }
        
        // jump when the body is touching the floor
        
        let grounded = this.body.touching.down 
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-400)
        }
    }
}
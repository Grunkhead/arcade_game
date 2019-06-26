import { Flag } from "./flag";
import { NormalScene } from "../scenes/normalScene";


export class Unicorn extends Phaser.Physics.Arcade.Sprite {
    
    protected scene: Phaser.Scene;
    private cursors: Phaser.Input.Keyboard.CursorKeys
    
    public x: number; 
    public y: number;

    public flag: Flag

    public spriteName: string;

    public normalScene: NormalScene;

    public speedLeft:  number = 0;
    public speedRight: number = 0;
    public speedUp:    number = 0;
    public speedDown:  number = 0;

    private joystickOne: any;
    private joystickTwo: any;

    public healthBarOne: number = 0;
    public healthBarTwo: number = 0;

    public width:    number = 100;
    public height:   number = 100;

    public dynamic: boolean;

    // Keys get assigned by the constructor.
    private keys: any = {};

    constructor(scene: Phaser.Scene, x: number, y: number, 
        spriteName: string, keys: object, dynamic: boolean = false) {

            super(scene, x, y, spriteName);
            this.scene = scene;

            this.spriteName = spriteName;
            this.keys = keys;

            this.dynamic = dynamic;

            this.x = x;
            this.y = y;

            this.setPhysics();
            this.setVisuals();
            this.createAnimations()
            this.setEventListeners();
            this.scene.add.existing(this);
        }

    private setVisuals(): void {
    }

    protected setPhysics(): void {
        this.scene.physics.add.existing(this);
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(true);
        body.setCollideWorldBounds(true);
        body.setGravity(0, 200);
        
        // Add some extra width and height because of smaller hitbox.
        this.setSize(this.displayWidth, this.displayHeight - 20);
    }

    // Enabeling grabbing the flag
    public grabFlag(flag: Flag): void {
        flag.x = this.x - 5;
        flag.y = this.y - 40;
        // if (this.speedLeft <= 0) {
        //     flag.x -= this.speedLeft
        // };

        // if (this.dynamic) {
            // if(this.keys.left) {this.flag.x -= this.speedLeft; }
            // if(this.keys.right) {this.flag.x += this.speedRight; }
        // }
    }

    // Update the game based on logic or input.
    public update(): void {
        this.updateJoystick();
        this.move();
        // this.grabFlag(this.flag);
    }

    private move(): void {
        this.x -= this.speedLeft;
        this.x += this.speedRight;
        this.y -= this.speedUp;
    }

    // Increase speed when a specific key is pressed.
    private onKeyDown(e: KeyboardEvent): void {
        if (e.keyCode == this.keys.left && this.speedLeft < 1) { 
            this.flipX = false
            this.play(this.spriteName + "_walk", true)
            this.setVelocityX(-250);
        }

        if (e.keyCode == this.keys.right && this.speedRight < 1) { 
            this.flipX = true
            this.play(this.spriteName + "_walk", true)
            this.setVelocityX(250);
        }

    // Increase speed when a specific key is pressed.
    private updateJoystick(): void {

        for (const joystick of this.g.Arcade.Joysticks) {
            joystick.update()

            // console.log(this.speedLeft);
            // console.log(this.speedRight);

            if (this.spriteName == 'rick') {
                if (this.g.Arcade.Joysticks[0]) {
                    if (joystick.Left) {
                        this.flipX = false
                        this.play(this.spriteName + "_walk", true)
                        this.speedLeft = 5;
                        console.log('Left');
                    } else {
                        this.speedLeft = 0;
                    }

                    if (joystick.Up) {
                        this.jump();
                    }

                    if (joystick.Right) {
                        this.flipX = true
                        this.play(this.spriteName + "_walk", true)
                        this.speedRight = 5;
                        console.log('Right');
                    } else {
                        this.speedRight = 0;
                    }
                }
            }

            if (this.spriteName == 'morty') {
                if (this.g.Arcade.Joysticks[1]) {
                    if (joystick.Left) {
                        this.flipX = false
                        this.play(this.spriteName + "_walk", true)
                        this.speedLeft = 5;
                        console.log('Left');
                    } else {
                        this.speedLeft = 0;
                    }

                    if (joystick.Up) {
                        this.jump();
                    }

                    if (joystick.Right) {
                        this.flipX = true
                        this.play(this.spriteName + "_walk", true)
                        this.speedRight = 5;
                        console.log('Right');
                    } else {
                        this.speedRight = 0;
                    }
                }
            }
        }
    }

    private jump(){
        this.setVelocityY(-400);
        this.play( this.spriteName + "_jump", true)
        let jumpSound = this.scene.sound.add('jump_sound', { loop: false });
        jumpSound.play();
    }

    private createAnimations() {
        // Morty lopen
        this.scene.anims.create({
            key: 'morty_walk',
            frames: [
                { key: 'morty_walk_1', frame :""},
                { key: 'morty_walk_2', frame :""},
                { key: 'morty_walk_3', frame :""}
            ],
            frameRate: 8,
            repeat: -1
        });

        // Morty springen
        this.scene.anims.create({
            key: 'morty_jump',
            frames: [
                { key: 'morty_jump_1', frame :""},
                { key: 'morty_jump_2', frame :""},
                { key: 'morty_jump_3', frame :""}
            ],
            frameRate: 8,
            repeat: -1
        });

        // Morty slaan
        this.scene.anims.create({
            key: 'morty_attack',
            frames: [
                { key: 'morty_attack_1', frame :""},
                { key: 'morty_attack_2', frame :""},
                { key: 'morty_attack_3', frame :""},
                { key: 'morty_attack_4', frame :""}
            ],
            frameRate: 30,
            repeat: 0
        });

        // Morty stilstaan
        this.scene.anims.create({
            key: 'morty_idle',
            frames: [
                { key: 'morty', frame :""}
            ],
            frameRate: 8,
            repeat: -1
        });

        // Rick lopen
        this.scene.anims.create({
            key: 'rick_walk',
            frames: [
                { key: 'rick_walk_1', frame :""},
                { key: 'rick_walk_2', frame :""},
                { key: 'rick_walk_3', frame :""}
            ],
            frameRate: 8,
            repeat: -1
        });

        // Rick springen
        this.scene.anims.create({
            key: 'rick_jump',
            frames: [
                { key: 'rick_jump_1', frame :""},
                { key: 'rick_jump_2', frame :""},
                { key: 'rick_jump_3', frame :""}
            ],
            frameRate: 8,
            repeat: -1
        });

        // Rick slaan
        this.scene.anims.create({
            key: 'rick_attack',
            frames: [
                { key: 'rick_attack_1', frame :""},
                { key: 'rick_attack_2', frame :""},
                { key: 'rick_attack_3', frame :""},
                { key: 'rick_attack_4', frame :""}
            ],
            frameRate: 30,
            repeat: 0
        });

        // Rick stilstaan
        this.scene.anims.create({
            key: 'rick_idle',
            frames: [
                { key: 'rick', frame :""}
            ],
            frameRate: 8,
            repeat: -1
        });
    }
};

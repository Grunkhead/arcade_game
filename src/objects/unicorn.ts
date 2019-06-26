import { Flag } from "./flag";
import { NormalScene } from "../scenes/normalScene";
import { ShitHorsesGame } from "../game";


export class Unicorn extends Phaser.Physics.Arcade.Sprite {
    
    protected scene: Phaser.Scene;
    
    public x: number; 
    public y: number;

    public spriteName: string;
    public normalScene: NormalScene;

    public g: ShitHorsesGame;

    public speedLeft:  number = 0;
    public speedRight: number = 0;
    public speedUp:    number = 0;
    public speedDown:  number = 0;

    public healthBarOne: number = 0;
    public healthBarTwo: number = 0;

    public width:    number = 100;
    public height:   number = 100;

    constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {

            super(scene, x, y, spriteName);
            this.scene = scene;

            this.g = this.scene.game as ShitHorsesGame;

            this.spriteName = spriteName;

            this.x = x;
            this.y = y;

            this.setPhysics();
            this.setVisuals();
            this.createAnimations()
            this.setButtonEventListeners();
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
    }

    // Update the game based on logic or input.
    public update(): void {
        this.updateJoystick();
        this.move();
    }

    private move(): void {
        this.x -= this.speedLeft;
        this.y -= this.speedUp;
        this.x += this.speedRight;
    }

    private setButtonEventListeners(): void {
        // Player One
        document.addEventListener("joystick0button0", function() {
            console.log('P1 -> Button 0 called');
        })

        document.addEventListener("joystick0button1", function () {
            console.log('P1 -> Button 1 called');
        })

        document.addEventListener("joystick0button2", function () {
            console.log('P1 -> Button 2 called');
        })

        document.addEventListener("joystick0button3", function () {
            console.log('P1 -> Button 3 called');
        })

        document.addEventListener("joystick0button4", function () {
            console.log('P1 -> Button 4 called');
        })

        document.addEventListener("joystick0button5", function () {
            console.log('P1 -> Button 5 called');
        })

        // Player Two
        document.addEventListener("joystick1button0", function () {
            console.log('P2 -> Button 0 called');
        })

        document.addEventListener("joystick1button1", function () {
            console.log('P2 -> Button 1 called');
        })

        document.addEventListener("joystick1button2", function () {
            console.log('P2 -> Button 2 called');
        })

        document.addEventListener("joystick1button3", function () {
            console.log('P2 -> Button 3 called');
        })

        document.addEventListener("joystick1button4", function () {
            console.log('P2 -> Button 4 called');
        })

        document.addEventListener("joystick1button5", function () {
            console.log('P2 -> Button 5 called');
        })
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

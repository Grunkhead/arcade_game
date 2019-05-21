import "phaser";

import { Unicorn } from "../objects/unicorn";
import { Blackhole } from "../objects/blackhole";
import { Platform } from "../objects/platform";
import { Flag } from "../objects/flag";

export class NormalScene extends Phaser.Scene {

    private platforms: Phaser.GameObjects.Group;
    private groundPlatform: Platform;

    private playerOne: Unicorn;
    private playerTwo: Unicorn;
    private flagOne: Flag;
    private flagTwo: Flag;

    constructor() {
        super({
            key: "normalScene"
        });
    }

    // Create the items for the game.
    create(): void {
        this.setGround();
        this.setBackground();

        this.platforms = this.add.group({ runChildUpdate: true })

        // Create flags.
        this.flagOne = new Flag(this, 90, 760);
        this.flagTwo = new Flag(this, 1390, 760);

        // Create top platforms.
        this.platforms.add(new Platform({
            scene: this,
            x: 320,
            y: 270,
            spriteName: 'platform'
        }),  true);

        this.platforms.add(new Platform({
            scene: this,
            x: 1120, 
            y: 270,
            spriteName: 'platform'
        }), true);

        // Create middle platform (this one moves).
        this.platforms.add(new Platform({
            scene: this,
            x: 720,
            y: 470,
            spriteName: 'platform_snow',
            dynamic: true
        }), true);

        // Create bottom platforms.
        this.platforms.add(new Platform({
            scene: this,
            x: 320,
            y: 670,
            spriteName: 'platform'
        }), true);

        this.platforms.add(new Platform({
            scene: this,
            x: 1120,
            y: 670,
            spriteName: 'platform'
        }), true);

        // Create players one.
        this.playerOne = new Unicorn({
            scene: this,
            x: 200,
            y: 820,
            spriteName: 'morty',
            keys: {
                left:  65, // W
                right: 68, // A
                up:    87, // S
                down:  83, // D
                dash:  9   // TAB
            }
        });

        // Create player two.
        this.playerTwo = new Unicorn({
            scene: this,
            x: 1240,
            y: 820,
            spriteName: 'rick',
            keys: {
                left:  37, // W
                right: 39, // A
                up:    38, // S
                down:  40, // D
                dash:  9   // TAB
            }
        });

        // Grab the middle platform which moves.
        const platform = this.platforms.children.entries[2];

        this.physics.add.collider(
            this.playerOne,
            platform,
            () => { platform.addFollower(this.playerOne); }
        );

        this.physics.add.collider(
            this.playerTwo,
            platform,
            () => { platform.addFollower(this.playerTwo); }
        );

        // Listen to platform & player collisions.
        this.physics.add.collider( this.playerOne, this.groundPlatform );
        this.physics.add.collider( this.playerTwo, this.groundPlatform );
        this.physics.add.collider( this.playerOne, this.platforms );

        this.physics.add.collider(
            this.playerOne, 
            this.flagTwo, 
            () => { this.playerOne.grabFlag(this.flagTwo) }
        );

        this.physics.add.collider(
            this.playerTwo,
            this.flagOne,
            () => { this.playerTwo.grabFlag(this.flagOne) }
        );
        
        this.physics.add.collider(
            this.playerOne, 
            this.blackhole, 
            () => { this.blackhole.suckObject(this.playerOne) }
        );

        this.physics.add.collider(
            this.playerTwo,
            this.blackhole,
            () => { this.blackhole.suckObject(this.playerTwo) }
        );
    }

    // Update the game based on logic or input.
    update(): void {
        this.playerOne.update();
        this.playerTwo.update();
    }

    setBackground(): void {
        const background = this.add.image(720, 450, 'bg-normal');
        background.displayWidth = 1440;
        background.displayHeight = 900;
        background.depth = -1;
    }

    setGround(): void {
        this.groundPlatform = new Platform({
            scene: this,
            x: 720,
            y: 890,
            spriteName: 'ground_snow'
        });

        this.drawGrass();
        this.drawCastles();
    }

    drawGrass(): void {
        for (let i = 0; i < 4; i++) {
            let grass = this.add.sprite(1040 / i, 830, 'grass');

            grass.setScale(3);
            grass.depth = 1;
        }
    }

    drawCastles(): void {
        this.add.image(70, 820, 'castle').setScale(0.25);
        this.add.image(1370, 820, 'castle').setScale(0.25);
    }
};
import "phaser";

import { Weapon } from "../objects/weapon";
import { Unicorn } from "../objects/unicorn";
import { Blackhole } from "../objects/blackhole";
import { Platform } from "../objects/platform";
import { Flag } from "../objects/flag";
import { Ground } from "../objects/ground";

export class NormalScene extends Phaser.Scene {

    private platforms: Phaser.GameObjects.Group;
    private ground: Ground;

    private playerOne: Unicorn;
    private playerTwo: Unicorn;
    private flagOne: Flag;
    private flagTwo: Flag;

    private blackhole: Blackhole;

    // private weapon1: Weapon;
    // private weapon2: Weapon;

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

        // Create weapon
        // this.weapon1 = new Weapon({
        //     scene: this,
        //     x: 200,
        //     y: 200,
        //     spriteName: 'weapon1'
        // });

        // Create flags.
        this.flagOne = new Flag(this, 90, 760);
        this.flagTwo = new Flag(this, 1390, 760);

        // Create top platforms.
<<<<<<< HEAD
        this.platforms.add(new Platform(this, 320, 270, 'platform'),  true);
        this.platforms.add(new Platform(this, 1120, 270, 'platform'), true);
=======
        this.platforms.add(new Platform({
            scene: this,
            x: 450,
            y: 300,
            spriteName: 'platform'
        }),  true);

        this.platforms.add(new Platform({
            scene: this,
            x: 1000, 
            y: 300,
            spriteName: 'platform'
        }), true);
>>>>>>> 9aad5362853be3dbaa59eb1b1237fc17bb77bc50

        // Create middle platform (this one moves).
        this.platforms.add(new Platform(this, 720, 470, 'platform_snow', true), true);
        
        // Create bottom platforms.
<<<<<<< HEAD
        this.platforms.add(new Platform(this, 320, 670, 'platform'), true);
        this.platforms.add(new Platform(this, 1120, 670, 'platform'), true);
=======
        this.platforms.add(new Platform({
            scene: this,
            x: 450,
            y: 670,
            spriteName: 'platform'
        }), true);

        this.platforms.add(new Platform({
            scene: this,
            x: 1000,
            y: 670,
            spriteName: 'platform'
        }), true);
>>>>>>> 9aad5362853be3dbaa59eb1b1237fc17bb77bc50

        // Create players one.
        this.playerOne = new Unicorn( this, 200, 820, 'morty',
            {
                left:  65, // W
                right: 68, // A
                up:    87, // S
                down:  83, // D
                dash:  9   // TAB
            }
        );

        // Create player two.
        this.playerTwo = new Unicorn(this, 1240, 820, 'rick',
            {
                left:  37, // W
                right: 39, // A
                up:    38, // S
                down:  40, // D
                dash:  9   // TAB
            }
        );

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
<<<<<<< HEAD
        this.physics.add.collider(this.playerOne, this.ground);
        this.physics.add.collider(this.playerTwo, this.ground);
        this.physics.add.collider(this.playerOne, this.platforms);
=======
        this.physics.add.collider( this.playerOne, this.groundPlatform );
        this.physics.add.collider( this.playerTwo, this.groundPlatform );
        this.physics.add.collider( this.playerOne, this.platforms );
        this.physics.add.collider( this.playerTwo, this.platforms );
>>>>>>> 9aad5362853be3dbaa59eb1b1237fc17bb77bc50

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
        this.ground = new Ground(this, 720, 890, 'ground_snow');

        this.drawGrass();
        this.drawCastles();
        this.drawWeapons();
    }

    drawGrass(): void {
        for (let i = 0; i < 4; i++) {
            let grass = this.add.sprite(1040 / i, 830, 'grass');

            grass.setScale(3);
            grass.depth = 1;
        }
    }

    drawCastles(): void {
        this.add.image(70, 830, 'castle').setScale(0.25);
        this.add.image(1370, 830, 'castle').setScale(0.25);
    }

    drawWeapons(): void{
        this.add.image(200, 200, 'weapon1').setScale(0.25);
        this.add.image(300, 300, 'weapon2').setScale(0.25);
    }
};
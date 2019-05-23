import "phaser";

import { Mace } from "../objects/mace";
import { Axe } from "../objects/axe";
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

    private mace: Mace;
    private axe: Axe;

    // private container: any;

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

        // Create container?
        // let container = this.add.container(400, 200);
        // let sprite0 = this.add.sprite(0, 0, 'rick')
        // let sprite1 = this.add.sprite(55, 0, 'weapon1')

        // container.add(sprite0);
        // container.add(sprite1);

        // this.tweens.add({
        //     targets: sprite1,
        //     angle: 360,
        //     duration: 6000,
        //     yoyo: true,
        //     repeat: -1
        // });

        // Create flags.
        this.flagOne = new Flag(this, 90, 760);
        this.flagTwo = new Flag(this, 1390, 760);

        // Create weapons
        this.mace = new Mace(this, 300, 300);
        this.axe = new Axe(this, 250, 250);

        // Create top platforms.
        this.platforms.add(new Platform(this, 320, 270, 'platform'),  true);
        this.platforms.add(new Platform(this, 1120, 270, 'platform'), true);

        // Create middle platform (this one moves).
        this.platforms.add(new Platform(this, 720, 470, 'platform_snow', true), true);
        
        // Create bottom platforms.
        this.platforms.add(new Platform(this, 320, 670, 'platform'), true);
        this.platforms.add(new Platform(this, 1120, 670, 'platform'), true);

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
        this.physics.add.collider(this.playerOne, this.ground);
        this.physics.add.collider(this.playerTwo, this.ground);
        this.physics.add.collider(this.playerOne, this.platforms);
        this.physics.add.collider(this.playerTwo, this.platforms);

        // Listen to weapon and player collisions
        this.physics.add.collider( this.playerOne, this.mace );
        this.physics.add.collider( this.playerOne, this.axe );
        this.physics.add.collider( this.playerTwo, this.mace );
        this.physics.add.collider( this.playerTwo, this.axe );
        this.physics.add.collider(

            // Make players pick up weapons
        this.physics.add.collider(
            this.playerOne, 
            this.mace, 
            () => { this.playerOne.grabFlag(this.mace) }
        );

        this.physics.add.collider(
            this.playerOne, 
            this.axe, 
            () => { this.playerOne.grabFlag(this.axe) }
        );

        this.physics.add.collider(
            this.playerTwo, 
            this.mace, 
            () => { this.playerTwo.grabFlag(this.mace) }
        );
        
        this.physics.add.collider(
            this.playerTwo, 
            this.axe, 
            () => { this.playerTwo.grabFlag(this.axe) }
        );

            // Make players pick up flags
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
};
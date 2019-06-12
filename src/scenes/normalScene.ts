import "phaser";
import { Unicorn } from "../objects/unicorn";
import { Platform } from "../objects/platform";
import { Flag } from "../objects/flag";
import { Ground } from "../objects/ground";
import { Castle } from "../objects/castle";
import { CastleTwo } from "../objects/castle_two";

export class NormalScene extends Phaser.Scene {

    private platforms: Phaser.GameObjects.Group;
    private ground: Ground;

    private playerOne: Unicorn;
    private playerTwo: Unicorn;

    private flagOne: Flag;
    private flagTwo: Flag;

    private castleOne: Castle;
    private castleTwo: CastleTwo;

    public mySound : Phaser.Sound.BaseSound

    // points and scorefield
    private collectedFlagsOne = 0;
    private collectedFlagsTwo = 0;
    private scorefieldOne;
    private scorefieldTwo;


    constructor() {
        super({
            key: "normalScene"
        });
    }

    // Create the items for the game.
    create(): void {
        this.setGround();
        this.setBackground();

        // Set sounds
        // this.mySound = this.sound.add('normal_sound', { loop: true });
        // this.mySound.play();

        this.platforms = this.add.group({ runChildUpdate: true })

        // Add score to the screen
        this.scorefieldOne = this.add.text(170, 40,  + this.collectedFlagsOne+ ' Flags captured', { fontFamily: 'Sofia', fontSize: 25, color: '#9999cc' }).setOrigin(0.5).setStroke('#ffcc99', 2);
        this.scorefieldTwo = this.add.text(1270, 40,  + this.collectedFlagsTwo+ ' Flags captured', { fontFamily: 'Sofia', fontSize: 25, color: '#9999cc' }).setOrigin(0.5).setStroke('#ffcc99', 2);
        
        // Create castles.
        this.castleOne = new Castle(this, 80, 770, 'castle');
        this.castleTwo = new Castle(this, 1360, 770, 'castle');

        // Create flags.
        this.flagOne = new Flag(this, 70, 650, 'flag_one');
        this.flagTwo = new Flag(this, 1350, 650, 'flag_two');

        // Create top platforms.
        this.platforms.add(new Platform(this, 400, 270, 'platform'),  true);
        this.platforms.add(new Platform(this, 1040, 270, 'platform'), true);

        // Create middle platform (this one moves).
        this.platforms.add(new Platform(this, 720, 470, 'platform_snow', true), true);
        
        // Create bottom platforms.
        this.platforms.add(new Platform(this, 400, 670, 'platform'), true);
        this.platforms.add(new Platform(this, 1040, 670, 'platform'), true);

        // Create player health bars.
        this.add.image(340, 50, 'bar_one')
        this.add.image(1100, 50, 'bar_two')


        // Create players one.
        this.playerOne = new Unicorn( this, 200, 800, 'morty',
            {
                left:  65, // W
                right: 68, // A
                up:    87,  // S
                down:  83, // D
                dash:  9,  // TAB

                // Create Attack?
                slash: 32  // Space 
            }
        );

        // Create player two.
        this.playerTwo = new Unicorn(this, 1240, 800, 'rick',
            {
                left:  37, // W
                right: 39, // A
                up:    38, // S
                down:  40, // D
                dash:  9,  // TAB

                // Attack?
                slash: 32  // Space 
            }
        );


        // Grab the middle platform which moves.
        const platform : Platform = (this.platforms.children.entries[2]) as Platform;

        this.physics.add.collider(
            this.playerOne,
            platform,
            platform.addFollower,
            null,
            platform
            // TODO ARGUMENT MEEGEVEN AAN ADDFOLLOWER
            //() => { platform.addFollower(this.playerOne); }
        );

        this.physics.add.collider(
            this.playerTwo,
            platform,
            platform.addFollower,
            null,
            platform
            // TODO ARGUMENT MEEGEVEN AAN ADDFOLLOWER
            //() => { platform.addFollower(this.playerTwo); }
        );

        this.physics.add.collider(this.playerOne, this.playerTwo);

        // Listen to platform & player collisions.
        this.physics.add.collider(this.playerOne, this.ground);
        this.physics.add.collider(this.playerTwo, this.ground);
        this.physics.add.collider(this.playerOne, this.platforms);
        this.physics.add.collider(this.playerTwo, this.platforms);
        
        // Listen to castle and flag collision
        this.physics.add.collider( this.castleOne, this.flagTwo );
        this.physics.add.collider( this.castleTwo, this.flagOne );

        // Create event when flag and castle overlap
        this.physics.add.overlap(this.flagOne, this.castleTwo, this.captureFlagOne, null, this)
        this.physics.add.overlap(this.flagTwo, this.castleOne, this.captureFlagTwo, null, this)

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
        const background = this.add.image(720, 450, 'normal-bg');
        background.displayWidth = 1440;
        background.displayHeight = 900;
        background.depth = -1;
    }

    setGround(): void {
        this.ground = new Ground(this, 720, 890, 'ground_snow');

    }
    
    // Player one.
    private captureFlagOne(playerTwo:Unicorn, flagOne:Flag): void {
            this.collectedFlagsTwo++
            this.scorefieldTwo.text = this.collectedFlagsTwo + " flag captured!"
            this.flagOne.destroy();
            this.flagOne = new Flag(this, 151, 638, 'flag_one');

            this.physics.add.collider(
                this.playerTwo,
                this.flagOne,
                () => { this.playerTwo.grabFlag(this.flagOne) }
            );

            this.physics.add.overlap(this.flagOne, this.castleTwo, this.captureFlagOne, null, this)

            console.log("hebbes!")
    }

    // Player two.
    private captureFlagTwo(flag:Flag, player:Unicorn): void {
            this.collectedFlagsOne++
            this.scorefieldOne.text = this.collectedFlagsOne + " flag captured!"
            this.flagTwo.destroy();
            this.flagTwo = new Flag(this, 1332, 648, 'flag_two');

            this.physics.add.collider(
                this.playerOne, 
                this.flagTwo, 
                () => { this.playerOne.grabFlag(this.flagTwo) }
            );

            this.physics.add.overlap(this.flagTwo, this.castleOne, this.captureFlagTwo, null, this)

            console.log("hebbes!")
    }
};
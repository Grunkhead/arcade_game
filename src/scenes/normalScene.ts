import "phaser";
import { Unicorn } from "../objects/unicorn";
import { Platform } from "../objects/platform";
import { PlatformDev } from "../objects/platformDev";
import { PlatformDevBot } from "../objects/platformDevBot";
import { PlatformJump } from "../objects/platformJump";
import { Flag } from "../objects/flag";
import { Ground } from "../objects/ground";
import { Castle } from "../objects/castle";
import { ShitHorsesGame } from "../game";
// import { CastleTwo } from "../objects/castle_two";

export class NormalScene extends Phaser.Scene {

    private platforms: Phaser.GameObjects.Group;
    private ground: Ground;
    private platformDev: PlatformDev;
    private platformDevBot: PlatformDevBot;
    private platformJump: PlatformJump;

    private playerOne: Unicorn;
    private playerTwo: Unicorn;

    private flagOne: Flag;
    private flagTwo: Flag;

    private castleOne: Castle;
    private castleTwo: Castle;

    // Create the healthbar
    public lifeBar: Phaser.Geom.Rectangle;
    public lifeBarTwo: Phaser.Geom.Rectangle;
    public graphics: Phaser.GameObjects.Graphics;

    public mySound : Phaser.Sound.BaseSound;

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
        
       // Set Graphics
        this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF }, fillStyle: { color: 0x00AA00 } })
       
        // LifeBar morty
        this.lifeBar = new Phaser.Geom.Rectangle(22, 65, 600, 24)
        this.graphics.fillRectShape(this.lifeBar)
        this.add.image(340, 50, 'bar_one')


        // LifeBar rick
        this.lifeBarTwo = new Phaser.Geom.Rectangle(816, 65, 600, 24)
        this.graphics.fillRectShape(this.lifeBarTwo)
        this.add.image(1100, 50, 'bar_two')

        this.platforms = this.add.group({ runChildUpdate: true })

        // Add score to the screen
        this.scorefieldOne = this.add.text(170, 40,  + this.collectedFlagsOne+ ' Flags captured', { fontFamily: 'Sofia', fontSize: 25, color: '#9999cc' }).setOrigin(0.5).setStroke('#ffcc99', 2);
        this.scorefieldTwo = this.add.text(1270, 40,  + this.collectedFlagsTwo+ ' Flags captured', { fontFamily: 'Sofia', fontSize: 25, color: '#9999cc' }).setOrigin(0.5).setStroke('#ffcc99', 2);
        
        // Create castles.
        this.castleOne = new Castle(this, 0, 690, 'castle_morty');
        this.castleTwo = new Castle(this, 1400, 690, 'castle_rick');

        // Create flags.
        this.flagOne = new Flag(this, 120, 650, 'flag_one');
        this.flagTwo = new Flag(this, 1315, 650, 'flag_two');
        this.flagTwo.flipX = true;
        this.flagTwo.rotation = -19.5;

        // Create devider platforms
        this.platformDev = new PlatformDev(this, 722, 411, 'p_devider_top');
        this.platformDevBot = new PlatformDevBot(this, 720, 650, 'p_devider_bottom');

        // Create jump platforms.
        this.platformJump = new PlatformJump(this, 663, 440, 'p_jump_left');
        this.platformJump = new PlatformJump(this, 791, 300, 'p_jump_right');
        
        // Create bottom platforms.
        this.platforms.add(new Platform(this, 310, 400, 'p_bottom_left'));
        this.platforms.add(new Platform(this, 1130, 400, 'p_bottom_right'));

        // Create ground platform
        this.platforms.add(new Platform(this, 400, 845, 'p_floor_left'));
        this.platforms.add(new Platform(this, 1040, 850, 'p_floor_right'));

        // Create players one.
        this.playerOne = new Unicorn( this, 200, 800, 'morty');
        this.playerOne.setScale(0.7)

        // Create player two.
        this.playerTwo = new Unicorn(this, 1240, 800, 'rick');
        this.playerTwo.setScale(0.63)

        this.physics.add.collider(this.playerOne, this.playerTwo);

        // Listen to platform & player collisions.
        this.physics.add.collider(this.playerOne, this.ground);
        this.physics.add.collider(this.playerTwo, this.ground);
        this.physics.add.collider(this.playerOne, this.platforms);
        this.physics.add.collider(this.playerTwo, this.platforms);

        //Colliders for new platform classes
        this.physics.add.collider(this.playerTwo, this.platformJump);
        this.physics.add.collider(this.playerTwo, this.platformDev);
        this.physics.add.collider(this.playerTwo, this.platformDevBot);
        this.physics.add.collider(this.playerOne, this.platformJump);
        this.physics.add.collider(this.playerOne, this.platformDev);
        this.physics.add.collider(this.playerOne, this.platformDevBot);
        
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
            () => { this.playerOne.grabFlag(this.flagTwo) },
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
        this.flagTwo.update();
        this.flagOne.update();
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

            this.physics.add.overlap(this.flagOne, this.castleTwo, this.captureFlagOne, null, this);
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

            this.physics.add.overlap(this.flagTwo, this.castleOne, this.captureFlagTwo, null, this);
    }
};
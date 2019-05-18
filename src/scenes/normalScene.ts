import "phaser";

import { Unicorn } from "../objects/unicorn";
import { Blackhole } from "../objects/blackhole";
import { Platform } from "../objects/platform";
import { Flag } from "../objects/flag";
import { log } from "util";

export class NormalScene extends Phaser.Scene {

    private unicorn: Unicorn;
    private blackhole: Blackhole;
    private platforms: Phaser.GameObjects.Group;
    private playerOne: Unicorn;
    private playerTwo: Unicorn;

    constructor() {
        super({
            key: "normalScene"
        });
    }

    // Create the items for the game.
    create(): void {
        this.drawGround();
        this.setBackground();

        this.blackhole = new Blackhole(this, 320, 150);

        this.platforms = this.add.group({ runChildUpdate: true })

        // Create top platforms.
        this.platforms.add(new Platform({
            scene: this,
            x: 320,
            y: 250,
            spriteName: 'platform'
        }),  true);
        this.platforms.add(new Platform({
            scene: this,
            x: 1120, 
            y: 250,
            spriteName: 'platform'
        }), true);

        // Create middle platform (this one moves).
        this.platforms.add(new Platform({
            scene: this,
            x: 720,
            y: 450,
            spriteName: 'platform_snow',
            dynamic: true
        }), true);

        // Create bottom platforms.
        this.platforms.add(new Platform({
            scene: this,
            x: 320,
            y: 600,
            spriteName: 'platform'
        }), true);
        this.platforms.add(new Platform({
            scene: this,
            x: 1120,
            y: 600,
            spriteName: 'platform'
        }), true);

        // Create players.
        this.playerOne = new Unicorn({
            scene: this,
            x: 340,
            y: 450,
            spriteName: 'morty',
            keys: {
                left: 65,  // W
                right: 68, // A
                up: 87,    // S
                down: 83,  // D
                dash: 9    // TAB
            }
        });

        this.playerTwo = new Unicorn({
            scene: this,
            x: 640,
            y: 450,
            spriteName: 'rick',
            keys: {
                left: 65,  // W
                right: 68, // A
                up: 87,    // S
                down: 83,  // D
                dash: 9    // TAB
            }
        });

        // Grab the middle platform which moves.
        const platform = this.platforms.children.entries[2];
        const callback = () => { platform.addFollower(this.playerOne) } 

        this.physics.add.collider(
            this.playerOne,
            this.platforms.children.entries[2],
            callback
        );

        this.physics.add.collider(
            this.playerOne,
            this.platforms
        );
        
        // this.physics.add.collider(
        //     this.playerTwo, 
        //     this.blackhole, 
        //     this.blackhole.suckObject
        // );
    }

    // Update the game based on logic or input.
    update(): void {
        this.playerOne.update();
    }

    setBackground(): void {
        const background = this.add.image(720, 450, 'bg-normal');
        background.displayWidth = 1440;
        background.displayHeight = 900;
        background.depth = -1;
    }

    drawGround(): void {
        const ground = new Phaser.Geom.Rectangle(0, 850, 1440, 50);
        const groundLine = new Phaser.Geom.Rectangle(0, 849, 1440, 1);

        // Create graphic dataset for the ground and draw.
        const graphic = this.add.graphics({ fillStyle: { color: 0x7ec850 } });
        const graphicLine = this.add.graphics({ fillStyle: { color: 0x6b9c58 } });

        // Colorize the ground.
        graphic.fillRectShape(ground);
        graphicLine.fillRectShape(groundLine)

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
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

    constructor() {
        super({
            key: "normalScene"
        });
    }

    init(): void {}
    
    // Load assets before it is used. To prevent delay.
    preload(): void {}

    // Create the items for the game.
    create(): void {
        this.drawGround();
        this.setBackground();

        new Blackhole(this, 320, 150);

        this.platforms = this.add.group({ runChildUpdate: true })

        // Top platforms.
        this.platforms.add(new Platform({
            scene: this,
            x: 320,
            y: 250
        }),  true);
        this.platforms.add(new Platform({
            scene: this,
            x: 1120, 
            y: 250
        }), true);

        // Middle platform (this one moves).
        this.platforms.add(new Platform({
            scene: this,
            x: 720,
            y: 450,
            dynamic: true
        }), true);

        // Bottom platforms.
        this.platforms.add(new Platform({
            scene: this,
            x: 320,
            y: 600
        }), true);
        this.platforms.add(new Platform({
            scene: this,
            x: 1120,
            y: 600
        }), true);

        // Define player.
        this.playerOne = new Unicorn(this, 340, 450);

        // Add collision detection between objects.
        this.physics.add.collider(this.playerOne, this.platforms, this.followPlatform);
    }

    followPlatform(unicorn: Unicorn, platform: Platform): void {

        if (platform.dynamic) {
            if (platform.moveLeft) { unicorn.x -= 3; }
            if (platform.moveRight) { unicorn.x += 3; }
        }
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
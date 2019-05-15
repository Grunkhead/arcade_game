import "phaser";

import { Unicorn } from "../objects/unicorn";
import { Blackhole } from "../objects/blackhole";
import { Platform } from "../objects/platform";

export class NormalScene extends Phaser.Scene {

    unicorn: Unicorn;
    blackhole: Blackhole;
    platform: Platform;

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

        new Blackhole(this, 240, 90);
        
        // Top platforms.
        new Platform(this, 240, 200);
        new Platform(this, 1200, 200);
        // Middle platform.
        new Platform(this, 720, 400);
        // Bottom platforms.
        new Platform(this, 240, 600);
        new Platform(this, 1200, 600);

        // Player
        new Unicorn(this, 340, 530);
        
    }

    // Update the game based on logic or input.
    update(): void {

    }

    setBackground(): void {
        const background = this.add.image(720, 450, 'bg-normal');
        background.displayWidth = 1440;
        background.displayHeight = 900;
        background.depth = -1;
    }

    drawGround(): void {
        // Create rectangles
        const ground = new Phaser.Geom.Rectangle(0, 850, 1440, 50);
        const groundLine = new Phaser.Geom.Rectangle(0, 849, 1440, 1);

        // Create graphic dataset for the ground and draw.
        const graphic = this.add.graphics({ fillStyle: { color: 0x7ec850 } });
        const graphicLine = this.add.graphics({ fillStyle: { color: 0x6b9c58 } });

        // Colorize the ground
        graphic.fillRectShape(ground);
        graphicLine.fillRectShape(groundLine)
    }
};
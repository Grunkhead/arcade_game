import "phaser";

export class HellScene extends Phaser.Scene {

    constructor() {
        super({
            key: "hellScene"
        });
    }

    init(): void {}

    // Load assets before it is used. To prevent delay.
    preload(): void {
        this.drawGround();
    }

    // Create the items for the game.
    create(): void {
        this.setBackground();
    }

    // Update the game based on logic or input.
    update(): void {}

    setBackground(): void {
        const background = this.add.image(720, 450, 'bg-hell');
        background.displayWidth = 1440;
        background.displayHeight = 900;
        background.depth = -1;
    }

    drawGround(): void {
        // Draw ground
        const ground = new Phaser.Geom.Rectangle(0, 850, 1440, 50);
        const groundLine = new Phaser.Geom.Rectangle(0, 849, 1440, 1);

        // Create graphic dataset for the ground
        const graphic = this.add.graphics({ fillStyle: { color: 0x000000 } });
        const graphicLine = this.add.graphics({ fillStyle: { color: 0x808080 } });

        // Colorize the ground 
        graphic.fillRectShape(ground);
        graphicLine.fillRectShape(groundLine)
    }
};
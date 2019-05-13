import "phaser";

export class DimensionScene extends Phaser.Scene {

    constructor() {
        super({
            key: "DimensionScene"
        });
    }

    init(): void { }

    // Load assets before it is used. To prevent delay.
    preload(): void {
        this.load.image('bg', 'assets/images/bg.jpg');
        this.load.image('flagLeft', 'assets/images/flag.png');
        this.load.image('flagRight', 'assets/images/flag.png');
        this.load.image('castleLeft', 'assets/images/castle.png');
        this.load.image('castleRight', 'assets/images/castle.png');

        var ground = new Phaser.Geom.Rectangle(0, 850, 1440, 50);
        var groundLine = new Phaser.Geom.Rectangle(0, 849, 1440, 1);

        var graphic = this.add.graphics({ fillStyle: { color: 0x000000 } });
        var graphicLine = this.add.graphics({ fillStyle: { color: 0x000000 } });

        graphic.fillRectShape(ground);
        graphicLine.fillRectShape(groundLine)
    }

    // Create the items for the game.
    create(): void {
        var background = this.add.image(720, 450, 'bg');
        background.displayWidth = 1440;
        background.displayHeight = 900;
        background.depth = -1;

        var flagLeft = this.add.image(1385, 760, 'flagLeft');
        flagLeft.displayWidth = 50;
        flagLeft.displayHeight = 50;

        var flagRight = this.add.image(85, 760, 'flagRight');
        flagRight.displayWidth = 50;
        flagRight.displayHeight = 50;

        var castleLeft = this.add.image(70, 820, 'castleLeft');
        castleLeft.displayWidth = 100;
        castleLeft.displayHeight = 100;

        var castleRight = this.add.image(1370, 820, 'castleRight');
        castleRight.displayWidth = 100;
        castleRight.displayHeight = 100;
    }

    // Update the game based on logic or input.
    update(): void {

    }
};
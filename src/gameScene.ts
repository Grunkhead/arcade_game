import "phaser";

export class GameScene extends Phaser.Scene {

    private spaceBar: any;

    constructor() {
        super({
            key: "GameScene"
        });
    }

    init(): void {}

    // Load assets before it is used. To prevent delay.
    preload(): void {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('flagLeft', 'assets/images/flag.png');
        this.load.image('flagRight', 'assets/images/flag.png');
        this.load.image('castleLeft', 'assets/images/castle.png');
        this.load.image('castleRight', 'assets/images/castle.png');
        this.load.image('unicornOne', 'assets/images/smokinUnicorn.png');

        var ground = new Phaser.Geom.Rectangle(0, 850, 1440, 50);
        var groundLine = new Phaser.Geom.Rectangle(0, 849, 1440, 1);

        var graphic = this.add.graphics({ fillStyle: { color: 0x7ec850 } });
        var graphicLine = this.add.graphics({ fillStyle: { color: 0x6b9c58 } });

        graphic.fillRectShape(ground);
        graphicLine.fillRectShape(groundLine)

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    // Create the items for the game.
    create(): void {
        var background = this.add.image(720, 450, 'background');
        background.displayWidth = 1440;
        background.displayHeight = 900;
        background.depth = -1;

        var flagLeft = this.add.image(1385, 760, 'flagLeft');
        flagLeft.displayWidth  = 50;
        flagLeft.displayHeight = 50;

        var flagRight = this.add.image(85, 760, 'flagRight');
        flagRight.displayWidth = 50;
        flagRight.displayHeight = 50;

        var castleLeft = this.add.image(70, 820, 'castleLeft');
        castleLeft.displayWidth  = 100;
        castleLeft.displayHeight = 100;

        var castleRight = this.add.image(1370, 820, 'castleRight');
        castleRight.displayWidth  = 100;
        castleRight.displayHeight = 100;

        var unicorn = this.add.image(200, 200, 'unicornOne');
        console.log("de code wordt uitgevoerd!")
        unicorn.displayWidth = 50;
        unicorn.displayHeight = 50;

        // If spacebar is pressed, show the dimension / hellish scene.
        this.spaceBar.on('down', () => {
            this.scene.start('DimensionScene');
        })
    }

    // Update the game based on logic or input.
    update(): void {

    }
};
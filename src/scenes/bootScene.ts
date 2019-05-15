import "phaser";

export class BootScene extends Phaser.Scene {

    constructor() {
        super({
            key: "bootScene"
        });
    }

    init(): void {
        this.load.on('complete', () => {
            this.scene.start('normalScene');
        })
    }

    // Load assets before it is used. To prevent delay.
    preload(): void {
       this.loadAssets();
    }

    loadAssets(): void {
        // Load the blackhole animation frames.
        for (let i = 0; i < 6; i++) {
            this.load.image('blackhole_' + i, 'assets/animations/blackhole/blackhole_' + i + '.png');
        }

        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('bg-normal', 'assets/images/bg-normal.png');
        this.load.image('bg-hell', 'assets/images/bg-hell.jpg   ');
        this.load.image('flagLeft', 'assets/images/flag.png');
        this.load.image('flagRight', 'assets/images/flag.png');
        this.load.image('castleLeft', 'assets/images/castle.png');
        this.load.image('castleRight', 'assets/images/castle.png');
    }
};
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

        this.load.image('grass', 'assets/images/grass.png');
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('platform_snow', 'assets/images/platform_snow.png');
        this.load.image('ground_snow', 'assets/images/ground_snow.png');
        this.load.image('bg-normal', 'assets/images/bg_normal.png');
        this.load.image('bg-hell', 'assets/images/bg_hell.jpg   ');
        this.load.image('flag', 'assets/images/flag.png');
        this.load.image('castle', 'assets/images/castle.png');

        this.load.image('morty', 'assets/animations/morty/morty.png');
        this.load.image('morty_left', 'assets/animations/morty/morty_left.png');
        this.load.image('morty_right', 'assets/animations/morty/morty_right.png');
        
        this.load.image('rick', 'assets/animations/rick/rick.png');
        this.load.image('rick_left', 'assets/animations/rick/rick_left.png');
        this.load.image('rick_right', 'assets/animations/rick/rick_right.png');
    }
};



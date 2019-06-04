import "phaser";

export class BootScene extends Phaser.Scene {

    constructor() {
        super({
            key: "bootScene"
        });
    }

    init(): void {
        this.load.on('complete', () => {
            this.scene.start('introScene');
            // let btn1 = this.add.text(730, 700, 'Finished loading, press start', {fontFamily: 'Sofia', fontSize: 50, color: '#FFA500'}).setOrigin(0.5).setStroke('#7df2ea', 16)
            // btn1.setInteractive()
            // btn1.on('pointerdown', (pointer) => {
            //       this.scene.start('introScene')
            // })

        })
    }

    // Load assets before it is used. To prevent delay.
    preload(): void {
       this.loadAssets();
    }

    loadAssets(): void {
        // Platforms
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('platform_snow', 'assets/images/platform_snow.png');

        // introScene
        this.load.image('big_morty', 'assets/animations/morty/big_morty.png')
        this.load.image('big_rick', 'assets/animations/rick/big_rick.png')

        // Grounds
        this.load.image('ground_snow', 'assets/images/ground_snow.png');

        // Backgrounds
        this.load.image('bg-normal', 'assets/images/bg_normal.png');
        this.load.image('bg-hell', 'assets/images/bg_hell.jpg');
        this.load.image('intro-bg', 'assets/images/intro_bg.jpg');
        this.load.image('fantasy-bg', 'assets/images/fantasy_background.jpg');

        // Player one
        this.load.image('morty', 'assets/animations/morty/morty.png');
        this.load.image('morty_left', 'assets/animations/morty/morty_left.png');
        this.load.image('morty_right', 'assets/animations/morty/morty_right.png');
        
        // Player two
        this.load.image('rick', 'assets/animations/rick/rick.png');
        this.load.image('rick_left', 'assets/animations/rick/rick_left.png');
        this.load.image('rick_right', 'assets/animations/rick/rick_right.png');

        // Castles
        this.load.image('castleOne', 'assets/images/castle-playerOne.png');
        this.load.image('castleTwo', 'assets/images/castle-playerTwo.png');

        //Flags
        this.load.image('flag_one', 'assets/images/flag_one.png')
        this.load.image('flag_two', 'assets/images/flag_two.png')

        // Sound
        this.load.audio('mysound', 'assets/sounds/GameOfThrones.mp3');


        // Load the blackhole animation frames.
        // for (let i = 0; i < 6; i++) {
        //     this.load.image('blackhole_' + i, 'assets/animations/blackhole/blackhole_' + i + '.png');
        // }
        
        this.load.image('grass', 'assets/images/grass.png');
        // this.load.image('castle', 'assets/images/castle.png');
        
        // Weapons
        this.load.image('mace', 'assets/images/weapon1.png');
        this.load.image('axe', 'assets/images/weapon2.png');
    }
};



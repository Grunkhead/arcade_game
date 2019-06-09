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
        this.load.image('normal-bg', 'assets/images/normal_bg.jpg');

        // Player one
        this.load.image('morty', 'assets/animations/morty/morty.png');
        this.load.image('morty_idle', 'assets/animations/morty/morty_3.png');
        this.load.image('morty_left', 'assets/animations/morty/morty_left.png');
        this.load.image('morty_right', 'assets/animations/morty/morty_right.png');
            // Movement
        this.load.image('morty_walk_1', 'assets/animations/morty/walk/morty_walk_1.png');
        this.load.image('morty_walk_2', 'assets/animations/morty/walk/morty_walk_2.png');
        this.load.image('morty_walk_3', 'assets/animations/morty/walk/morty_walk_3.png');
            // Attack
        this.load.image('morty_attack_1', 'assets/animations/morty/attack/morty_attack_1.png');
        this.load.image('morty_attack_2', 'assets/animations/morty/attack/morty_attack_2.png');
        this.load.image('morty_attack_3', 'assets/animations/morty/attack/morty_attack_3.png');
        this.load.image('morty_attack_4', 'assets/animations/morty/attack/morty_attack_4.png');

        // Player two
        this.load.image('rick', 'assets/animations/rick/rick.png');
        this.load.image('rick_left', 'assets/animations/rick/rick_left.png');
        this.load.image('rick_right', 'assets/animations/rick/rick_right.png');

        // Health bars
        this.load.image('bar_one', 'assets/images/morty_bar.png')
        this.load.image('bar_two', 'assets/images/rick_bar.png')

        // Castles
        this.load.image('castle', 'assets/images/castle.png');

        // Flags
        this.load.image('flag_one', 'assets/images/flag_one.png');
        this.load.image('flag_two', 'assets/images/flag_two.png');

        // Weapons
        this.load.image('mace', 'assets/images/weapon1.png');
        this.load.image('axe', 'assets/images/weapon2.png');

        // Sounds
        this.load.audio('normal_sound', 'assets/sounds/sneaky_snitch.mp3');
        this.load.audio('hit_sound', 'assets/sounds/oef.mp3');
        this.load.audio('jump_sound', 'assets/sounds/jump.mp3');
    }
};



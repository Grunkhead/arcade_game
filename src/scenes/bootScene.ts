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
        })
    }

    // Load assets before it is used. To prevent delay.
    preload(): void {
       this.loadAssets();
    }

    loadAssets(): void {
        // Platforms
        this.load.image('p_devider_bottom', 'assets/images/platforms/divider_1.png');
        this.load.image('p_devider_top', 'assets/images/platforms/divider_2.png');
        this.load.image('p_bottom_left', 'assets/images/platforms/platform_float_1.png');
        this.load.image('p_bottom_right', 'assets/images/platforms/platform_float_2.png');
        this.load.image('p_jump_left', 'assets/images/platforms/platform_jump_1.png');
        this.load.image('p_jump_right', 'assets/images/platforms/platform_jump_2.png');
        this.load.image('p_floor_left', 'assets/images/platforms/platform_rock_1.png');
        this.load.image('p_floor_right', 'assets/images/platforms/platform_rock_2.png');

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

        // Player one morty
        this.load.image('morty', 'assets/animations/morty/morty.png');
        this.load.image('morty_left', 'assets/animations/morty/morty_left.png');
        this.load.image('morty_right', 'assets/animations/morty/morty_right.png');
            // Movement
        this.load.image('morty_walk_1', 'assets/animations/morty/walk/morty_walk_1.png');
        this.load.image('morty_walk_2', 'assets/animations/morty/walk/morty_walk_2.png');
        this.load.image('morty_walk_3', 'assets/animations/morty/walk/morty_walk_3.png');
        this.load.image('morty_jump_1', 'assets/animations/morty/morty_12.png');
        this.load.image('morty_jump_2', 'assets/animations/morty/morty_13.png');
        this.load.image('morty_jump_3', 'assets/animations/morty/morty_14.png');
            // Attack
        this.load.image('morty_attack_1', 'assets/animations/morty/attack/morty_attack_1.png');
        this.load.image('morty_attack_2', 'assets/animations/morty/attack/morty_attack_2.png');
        this.load.image('morty_attack_3', 'assets/animations/morty/attack/morty_attack_3.png');
        this.load.image('morty_attack_4', 'assets/animations/morty/attack/morty_attack_4.png');

        // Player two rick 
        this.load.image('rick', 'assets/animations/rick/rick.png');
        this.load.image('rick_left', 'assets/animations/rick/rick_left.png');
        this.load.image('rick_right', 'assets/animations/rick/rick_right.png');
            // Movement
        this.load.image('rick_walk_1', 'assets/animations/rick/walk/rick_walk_1.png');
        this.load.image('rick_walk_2', 'assets/animations/rick/walk/rick_walk_2.png');
        this.load.image('rick_walk_3', 'assets/animations/rick/walk/rick_walk_3.png');
        this.load.image('rick_jump_1', 'assets/animations/rick/rick_1.png');
        this.load.image('rick_jump_2', 'assets/animations/rick/rick_2.png');
        this.load.image('rick_jump_3', 'assets/animations/rick/rick_3.png');
            // Attack
        this.load.image('rick_attack_1', 'assets/animations/rick/attack/rick_attack_1.png');
        this.load.image('rick_attack_2', 'assets/animations/rick/attack/rick_attack_2.png');
        this.load.image('rick_attack_3', 'assets/animations/rick/attack/rick_attack_3.png');
        this.load.image('rick_attack_4', 'assets/animations/rick/attack/rick_attack_4.png');
        
        // Health bars
        this.load.image('bar_one', 'assets/images/morty_bar.png')
        this.load.image('bar_two', 'assets/images/rick_bar.png')

        // Castles
        this.load.image('castle_rick', 'assets/images/castle_rick.png');
        this.load.image('castle_morty', 'assets/images/castle_morty.png');

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



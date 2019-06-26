export class IntroScene extends Phaser.Scene {

    private mySound : Phaser.Sound.BaseSound

    constructor() {
        super({
            key: "introScene"
        });
    }

    init(): void {
    }

    create(){
        // Uncomment if you want to unlock sound.
        // this.mySound = this.sound.add('mysound', { loop: true });
        // this.mySound.play();

        this.loadSprites()
        this.showText()

    }
    
    private showText(){
        // Add button
        let btn1 = this.add.text(730, 700, 'Start', {fontFamily: 'Open Sans', fontSize: 50, color: '#FFA500'}).setOrigin(0.5).setStroke('#000000', 16)
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('normalScene')
        })

        this.tweens.add({
            targets: btn1,
            scaleX: 1.25,
            scaleY: 1.25,
            ease: 'Cubic.easeInOut',
            duration: 650,
            yoyo: true,
            repeat: -1
        })
        
        let title = this.add.text(720, 450, "Pointy Horses", { fontFamily: 'Open Sans', fontSize: 80, color: '#FFD065' }).setOrigin(0.5).setStroke('#EA890D', 16)
        this.tweens.add({
            targets: title,
            y: 230,
            duration: 1600,
            ease: 'Back',
            easeParams: [3.5],
            delay:100
        });

    }
    
    private loadSprites(){
        // Background
        const background = this.add.image(720, 450, 'intro-bg');
        background.displayWidth = 1440;
        background.displayHeight = 900;

        // Sprites
        this.add.image(200, 650, 'big_morty')
        this.add.image(1200, 600, 'big_rick')
    }
}
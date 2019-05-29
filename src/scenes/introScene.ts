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
 
        this.mySound = this.sound.add('mysound', { loop: true });
        this.mySound.play();

        console.log("test2")
        // console.log(this.mySound)

 
        const background = this.add.image(720, 450, 'bg-normal');
        background.displayWidth = 1440;
        background.displayHeight = 900;


    // Add Button
        let btn1 = this.add.text(730, 700, 'Start', {fontFamily: 'Sofia', fontSize: 50, color: '#FFA500'}).setOrigin(0.5).setStroke('#7df2ea', 16)
            btn1.setInteractive()
            btn1.on('pointerdown', (pointer) => {
            this.scene.start('normalScene')
            })

        // add another image here

        // add text here

        // this.add.text(400, 300, 'MY GAME TITLE', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        this.add.text(720, 450, "Shit Horses", { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

    }  
}

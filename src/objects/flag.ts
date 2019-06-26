export class Flag extends Phaser.GameObjects.Sprite {

    public spriteName: string;

    x: number;
    y: number;

    width: number;
    height: number;

    speed: number;

    flag: Flag;

    constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {
        super(scene, x, y, spriteName);

        this.scene = scene;
        this.setScale(0.15);
        this.depth = -1;

        this.spriteName = spriteName;

        this.x = x;
        this.y = y;
        this.rotation = 45;

        this.setPhysics();

        this.scene.add.existing(this);
    }
  
    setPhysics(): void {
        this.scene.physics.add.existing(this);
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.setSize(this.width, this.height);
    }

    public resetFlag(){
        console.log("reset the flag")
        this.x = 151;
        this.y = 638;
    }

    // Update the game based on logic or input.
    update(): void {
        this
    }
};
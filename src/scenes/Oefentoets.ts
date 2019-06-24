class Samurai {
    private hp: number;
    private weapon: Weapon;
    constructor(p : string):string {
    var p = this.hp;
    return “samurai constructed!”;
    }
   
    public attack(s:Samurai):boolean {
    if(s.weapon.strength > this.weapon.strength){
    this.hp -= 10;
    }
    }
   
    private rideHorse():void {
    return “kataklop kataklop”;
    }
   }
   class Weapon() {
    private strength:number = 10;
    constructor(){
    super();
    }
   }
   let sam1:Samurai = new Samurai(100);
   sam1.constructor();
   sam1.rideHorse();
   sam1.attack(new Samurai());
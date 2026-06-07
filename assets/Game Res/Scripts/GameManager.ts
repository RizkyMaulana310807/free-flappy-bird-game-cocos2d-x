import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact, CollisionEventType } from 'cc';
import { Ground } from './Ground';
import { ScoreManager } from './ScoreManager';
import { Bird } from './Bird';
import { Obstacle } from './Obstacle';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({
        type: Ground,
        tooltip: 'This is ground'
    })
    public ground: Ground

    @property({
        type: ScoreManager,
        tooltip: 'This is for score manager'
    })

    public result: ScoreManager;

    @property({
        type: Bird,
    })
    public bird: Bird;

    @property({
        type: Obstacle
    })
    public obstacle: Obstacle;

    @property({
        type: CCInteger,
    })
    public speed:number = 300;
    static instance: GameManager;


    @property({type: CCInteger})
    public pipeSpeed:number = 200;
    
    public isOver:boolean;
    public isGameStarted:boolean = false;
   
   onLoad(){
    console.log("ON Game Load")
    GameManager.instance = this;

    // this.initListener();
    this.result.resetScore();
    this.startGame();
   }
   
//    initListener(){
//     input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
//    }

// //    for testing method delete me in final version
   
//    onKeyDown(event: EventKeyboard){
//     switch(event.keyCode){
//     case KeyCode.KEY_A:
//         this.gameOver()
//         break;;
//     case KeyCode.KEY_P:
//         this.result.addScore();
//         break;
//     case KeyCode.KEY_Q:
//         this.resetGame();
//         break;
//     }
//    }
   
   resetGame(){
    this.isOver = false;
    this.result.startLabel.node.active = true;
    this.result.resetScore();
    this.bird.resetBird();
    this.obstacle.resetObstacle();
    this.startGame();
   }
   
   
   contactGroundPipe(){
       let collider = this.bird.getComponent(Collider2D);
       if(collider){
           collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }
    
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(otherCollider.tag === 100) return;
        this.bird.hitSomething = true;
        console.log("Contact detected");
    }
    
    
    birdStruct(){
        this.contactGroundPipe();
        if(this.bird.hitSomething == true){
            AudioManager.instance.playSound(AudioManager.instance.hit);
            this.gameOver();
        }
    }
    
    startGame(){
        console.log("Start Game");
        this.isOver = true;
        this.result.hideResult();
    }

    gameOver(){
    AudioManager.instance.playSound(AudioManager.instance.die);
     this.isOver = true;
     this.result.showResult();
    }
    
   update(){
    if(this.isOver == false){
        this.birdStruct();
    }
   }
   
}
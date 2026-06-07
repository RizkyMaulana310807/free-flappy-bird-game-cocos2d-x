import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Label, Node } from 'cc';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
    @property({
        type: Label
    })
    public scoreLabel: Label;

    
    @property({
        type: Label
    })
    public highScore: Label;

    @property({
        type: Label
    })
    public resultEnd: Label;

    @property({
        type: Node
    })
    public bird: Node;
    
    @property({
        type: Label
    })
    public startLabel: Label;
    
    static instance: ScoreManager;
    
    maxScore: number = 0;
    currentScore: number = 0;

    start(){
        ScoreManager.instance = this;
        const collider = this.bird.getComponent(Collider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(otherCollider.tag === 100){
            this.addScore();
            otherCollider.enabled = false;
        }
    }
    
    updateScore(num:number){
        this.currentScore = num;
        this.scoreLabel.string = ('' + this.currentScore)
    }

    resetScore(){
        this.updateScore(0);
        this.hideResult();
    }

    addScore(){
        AudioManager.instance.playSound(AudioManager.instance.point)
        this.updateScore(this.currentScore + 1)
    }

    showResult(){
        this.maxScore = Math.max(this.maxScore, this.currentScore)
        this.highScore.string = ('High Score: ' + this.maxScore);
        this.resultEnd.node.active = true;
        this.highScore.node.active = true;
    }

    hideResult(){
        this.highScore.node.active = false;
        this.resultEnd.node.active = false;
    }
    
}
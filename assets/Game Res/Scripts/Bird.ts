import { _decorator, Component, Node, input, Input, RigidBody2D, CCFloat, Animation, Collider2D, Quat, Vec2, Vec3, animation } from 'cc';
import { GameManager } from './GameManager';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property({
        type: RigidBody2D,
        tooltip: "Rigidbody on Player"
    })
    private rig: RigidBody2D;

    @property({
        type: CCFloat,
    })
    private velocity: number = 1;

    @property({
        type: Collider2D
    })
    private collider: Collider2D;

    public hitSomething: boolean;
    
    private upAngle: number = 0.1;
    private downAngle: number = -0.01;

    public birdLocation: Vec3;
    
    private anim: Animation;
    
    onLoad(){
        this.rig.gravityScale = 0;
        this.anim = this.getComponent(Animation);
        input.on(Input.EventType.TOUCH_START, this.jump, this);
    }

    update(deltaTime: number) {
        if(GameManager.instance.isOver){
            this.rig.gravityScale = 0;
            this.rig.linearVelocity = new Vec2(0, 0);
            return;
        }
        if (this.rig.linearVelocity.y < 0) {
            this.rotatePLayer(0, 0, this.node.getRotation().z + this.downAngle);
        }
    }
    resetBird(){
        this.birdLocation = new Vec3(0, 0, 0)
        this.node.setPosition(this.birdLocation);
        this.rotatePLayer(0, 0, 0);
        this.hitSomething = false;
    }
    
    rotatePLayer(x: number, y: number, z: number) {
        this.node.setRotation(new Quat(x, y, z));
    }
    
    jump() {
        console.log("Jump clicked")
        if(!this.anim.getState("BirdFlap").isPlaying) this.anim.play();
        if(!GameManager.instance.isGameStarted) {
            GameManager.instance.isGameStarted = true;
            GameManager.instance.isOver = false;
            GameManager.instance.result.startLabel.node.active = false;
            this.rig.gravityScale = 1;
        }

        if(GameManager.instance.isOver){
            GameManager.instance.isGameStarted = false;
            GameManager.instance.resetGame();
            return;
        }
            this.rig.linearVelocity = new Vec2(0, this.velocity);
            this.rotatePLayer(0, 0, this.upAngle);
            AudioManager.instance.playSound(AudioManager.instance.wing);
    }
}



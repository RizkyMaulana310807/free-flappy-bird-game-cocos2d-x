import { _decorator, Component, Node, UITransform, Vec3, director, Canvas, Collider2D } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

import { ScoreManager } from './ScoreManager';

@ccclass('Obstacle')
export class Obstacle extends Component {

    @property({
        type: Node, tooltip: 'obstaclePairs 1 is here'
    })
    public obstaclePairs1: Node;

    @property({
        type: Node, tooltip: 'obstaclePairs 2 is here'
    })
    public obstaclePairs2: Node;

    @property({
        type: Node, tooltip: 'obstaclePairs 3 is here'
    })
    public obstaclePairs3: Node;

    @property({
        type: Node, tooltip: 'obstaclePairs 4 is here'
    })
    public obstaclePairs4: Node;

    
    @property({ type: Number, tooltip: 'Ground 3 is here' })
    public ObstacleSpeed:number = 50;

    @property({
        type: Number,
        tooltip: 'Distance between pairs'
    })
    public obstacleSpacing: number = 350;
    
    public obstaclePairsWidth1:number;
    public obstaclePairsWidth2:number;
    public obstaclePairsWidth3:number;
    public obstaclePairsWidth4:number;
    

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;
    public tempStartLocation4 = new Vec3;

    

    onLoad() {
        this.startUp();
    }
    
    startUp() {
        this.resetObstacle();
    }
    
    resetObstacle(){

        const trigger1 = this.obstaclePairs1.getChildByName("TriggerBox")?.getComponent(Collider2D);
        const trigger2 = this.obstaclePairs2.getChildByName("TriggerBox")?.getComponent(Collider2D);
        const trigger3 = this.obstaclePairs3.getChildByName("TriggerBox")?.getComponent(Collider2D);
        const trigger4 = this.obstaclePairs4.getChildByName("TriggerBox")?.getComponent(Collider2D);
        
        if(trigger1) trigger1.enabled = true;
        if(trigger2) trigger2.enabled = true;
        if(trigger3) trigger3.enabled = true;
        if(trigger4) trigger4.enabled = true;
        
        this.obstaclePairsWidth1 = this.obstaclePairs1.getComponent(UITransform).width;
        this.obstaclePairsWidth2 = this.obstaclePairs2.getComponent(UITransform).width;
        this.obstaclePairsWidth3 = this.obstaclePairs3.getComponent(UITransform).width;
        this.obstaclePairsWidth4 = this.obstaclePairs4.getComponent(UITransform).width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.obstacleSpacing;
        this.tempStartLocation3.x = this.obstacleSpacing * 2;
        this.tempStartLocation4.x = this.obstacleSpacing * 3;

        this.tempStartLocation1.y = -100 + Math.random() * 200;
        this.tempStartLocation2.y = -100 + Math.random() * 200;
        this.tempStartLocation3.y = -100 + Math.random() * 200;
        this.tempStartLocation4.y = -100 + Math.random() * 200;


        this.obstaclePairs1.setPosition(this.tempStartLocation1);
        this.obstaclePairs2.setPosition(this.tempStartLocation2);
        this.obstaclePairs3.setPosition(this.tempStartLocation3);
        this.obstaclePairs4.setPosition(this.tempStartLocation4);

    }
    
    update(deltaTime: number) {
        if(GameManager.instance.isOver){
            return;
        }
        this.tempStartLocation1 = this.obstaclePairs1.position;
        this.tempStartLocation2 = this.obstaclePairs2.position;
        this.tempStartLocation3 = this.obstaclePairs3.position;
        this.tempStartLocation4 = this.obstaclePairs4.position;

        this.tempStartLocation1.x -= this.ObstacleSpeed * deltaTime;
        this.tempStartLocation2.x -= this.ObstacleSpeed * deltaTime;
        this.tempStartLocation3.x -= this.ObstacleSpeed * deltaTime;
        this.tempStartLocation4.x -= this.ObstacleSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        
        if(this.tempStartLocation1.x <= (-(canvas.getComponent(UITransform).width + (canvas.getComponent(UITransform).width / 2)))){
            this.tempStartLocation1.x = this.tempStartLocation4.x + this.obstacleSpacing
            this.tempStartLocation1.y = -100 + Math.random() * 200;

            const trigger = this.obstaclePairs1.getChildByName("TriggerBox")?.getComponent(Collider2D);
            if(trigger){
                trigger.enabled = true;
            }
            
        }

        if(this.tempStartLocation2.x <= (-(canvas.getComponent(UITransform).width + (canvas.getComponent(UITransform).width / 2)))){
            this.tempStartLocation2.x = this.tempStartLocation1.x + this.obstacleSpacing
            this.tempStartLocation2.y = -100 + Math.random() * 200;

            const trigger = this.obstaclePairs2.getChildByName("TriggerBox")?.getComponent(Collider2D);
            if(trigger){
                trigger.enabled = true;
            }
            
        }

        if(this.tempStartLocation3.x <= (-(canvas.getComponent(UITransform).width + (canvas.getComponent(UITransform).width / 2)))){
            this.tempStartLocation3.x = this.tempStartLocation2.x + this.obstacleSpacing
            this.tempStartLocation3.y = -100 + Math.random() * 200;

            const trigger = this.obstaclePairs3.getChildByName("TriggerBox")?.getComponent(Collider2D);
            if(trigger){
                trigger.enabled = true;
            }
            
        }
        
        if(this.tempStartLocation4.x <= (-(canvas.getComponent(UITransform).width + (canvas.getComponent(UITransform).width / 2)))){
            this.tempStartLocation4.x = this.tempStartLocation3.x + this.obstacleSpacing
            this.tempStartLocation4.y = -100 + Math.random() * 200;

            const trigger = this.obstaclePairs4.getChildByName("TriggerBox")?.getComponent(Collider2D);
            if(trigger){
                trigger.enabled = true;
            }
            
        }

        
        this.obstaclePairs1.setPosition(this.tempStartLocation1);
        this.obstaclePairs2.setPosition(this.tempStartLocation2);
        this.obstaclePairs3.setPosition(this.tempStartLocation3);
        this.obstaclePairs4.setPosition(this.tempStartLocation4);
        
    }
}
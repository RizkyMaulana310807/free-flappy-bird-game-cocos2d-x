import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {

    static instance: AudioManager;
    
    @property({type: AudioSource})
    audioSource: AudioSource;

    @property({type: AudioClip})
    wing: AudioClip;

    @property({type: AudioClip})
    point: AudioClip;

    @property({type: AudioClip})
    hit: AudioClip;

    @property({type: AudioClip})
    die: AudioClip;

    onLoad(){
        AudioManager.instance = this;
    }
    
    playSound(clip: AudioClip){
        this.audioSource.playOneShot(clip);
    }
    
}



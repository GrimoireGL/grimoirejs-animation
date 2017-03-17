import IAnimationRecipe from "./IAnimationRecipe";
import AnimationClip from "./AnimationClip";
export default class Animation {
    public _loop: boolean = false;
    public _auto: boolean = false;
    public clips: Map<string, AnimationClip> = new Map<string, AnimationClip>();
    constructor(private animationRecipe: IAnimationRecipe) {
        for (var clipName in animationRecipe) {
            this.clips.set(clipName, new AnimationClip(animationRecipe[clipName]));
        }
    }
    set loop(loop: boolean) {
        this._loop = loop;
    }
    set auto(auto: boolean) {
        this._auto = auto;
    }
    public getClip(clipName: string): AnimationClip {
        return this.clips.get(clipName);
    }
}
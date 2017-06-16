import IAnimationRecipe from "./Schema/IAnimationRecipe";
import AnimationClip from "./AnimationClip";
export default class Animation {
  private clips: { [key: string]: AnimationClip } = {};
  constructor(_clips: IAnimationRecipe) {
    for (let key in _clips) {
      this.clips[key] = new AnimationClip(_clips[key]);
    }
  }
  public getClip(clipName: string): AnimationClip {
    return this.clips[clipName];
  }
}

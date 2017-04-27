import IAnimationRecipe from "./Schema/IAnimationRecipe";
import AnimationClip from "./AnimationClip";
export default class Animation {
  public clips: Map<string, AnimationClip> = new Map<string, AnimationClip>();
  constructor(private animationRecipe: IAnimationRecipe) {
    for (var clipName in animationRecipe) {
      this.clips.set(clipName, new AnimationClip(animationRecipe[clipName]));
    }
  }
  public getClip(clipName: string): AnimationClip {
    return this.clips.get(clipName);
  }
}

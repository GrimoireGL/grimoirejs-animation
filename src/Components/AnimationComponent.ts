import gr from "grimoirejs";
import Timer from "grimoirejs-fundamental/ref/Util/Timer";
import IRenderArgument from "grimoirejs-fundamental/ref/SceneRenderer/IRenderArgument";
import AnimationFactory from "../Animation/AnimationFactory";
import Animation from "../Animation/Animation";
import Component from "grimoirejs/ref/Core/Component";
import { IAttributeDeclaration } from "grimoirejs/ref/Interface/IAttributeDeclaration";
import IAnimationTimeline from "../Animation/Schema/IAnimationTimeline";
import AnimationClip from "../Animation/AnimationClip"
import { attribute } from "grimoirejs/ref/Core/Decorator";
/** 
 * Animation component provide abstracted animation feature.
 * This component will change parameters of components by following animation file.
*/
export default class AnimationComponent extends Component {
  public static componentName = "Animation";

  /**
   * Animation name
   */
  @attribute("String", null)
  public animation: string;

  /**
   * Clip to play
   */
  @attribute("StringArray", null)
  public clips: string[];

  /**
   * Time scale. If this value is 1, play as default.
   */
  @attribute("Number", 1)
  public timeScale: number;

  /**
   * Should loop or not.
   */
  @attribute("Boolean", true)
  public loop: boolean;

  /**
   * Time offset of animation
   */
  @attribute("Number", 0)
  public timeOffset: number;

  public currentTime: number = 0;
  private _animation: Animation;
  private _animationTime: number;
  private _animationPromise: Promise<Animation>;
  private _ready: boolean;
  get Animation() {
    return this._animation;
  }
  get AnimationTime() {
    return this._animationTime;
  }
  public $mount(): void {
    if (this.animation && typeof this.animation === "string") {
      this._animationPromise = AnimationFactory.instanciate(this.animation);
      this._registerAttributes();
    } else {
      throw new Error("Animation type name must be sppecified and string");
    }
  }
  // 直すべき
  public $update(args: IRenderArgument) {
    if (this._ready) this._update((args.timer as Timer));
  }
  public $render(args: IRenderArgument) {
    if (this._ready) this._update((args.timer as Timer));
  }
  private async _registerAttributes(): Promise<void> {
    this._animation = await this._animationPromise;
    this._ready = true;
  }
  private _update(timer: Timer): void {
    for (let key in this.clips) {
      const length = this._animation.getClip(this.clips[key]).length;
      this.currentTime += timer.deltaTime * this.timeScale;
      const t = this.currentTime + this.timeOffset;
      const animationTime = this.loop ? t % length : Math.max(t, length);
      if (animationTime !== this._animationTime) {
        this._animationTime = animationTime;
        this._animation.getClip(this.clips[key]).step(this.node, this._animationTime);
      }
    }
  }
  public getClip(clipName: string): AnimationClip {
    return this._animation.getClip(clipName);
  }
}

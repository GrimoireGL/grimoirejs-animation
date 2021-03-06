import gr from "grimoirejs";
import Timer from "grimoirejs-fundamental/ref/Util/Timer";
import IRenderArgument from "grimoirejs-fundamental/ref/SceneRenderer/IRenderArgument";
import AnimationFactory from "../Animation/AnimationFactory";
import Animation from "../Animation/Animation";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import IAnimationTimeline from "../Animation/Schema/IAnimationTimeline";
import AnimationClip from "../Animation/AnimationClip"
export default class AnimationComponent extends Component {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    animation: {
      converter: "String",
      default: null
    },
    clips: {
      converter: "StringArray",
      default: null
    },
    timeScale: {
      converter: "Number",
      default: 1
    },
    loop: {
      converter: "Boolean",
      default: true
    },
    timeOffset: {
      converter: "Number",
      default: 0
    }
  };
  public animation: string;
  public clips: string[];
  public timeScale: number;
  public loop: boolean;
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
    this.__bindAttributes();
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

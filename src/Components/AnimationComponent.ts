import gr from "grimoirejs";
import AnimationFactory from "../Animation/AnimationFactory";
import Animation from "../Animation/Animation";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import TimeComponent from "grimoirejs-fundamental/ref/Components/TimeComponent";
import IAnimationClipElement from "../Animation/Schema/IAnimationClipElement";
import AnimationClip from "../Animation/AnimationClip"
export default class AnimationComponent extends Component {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    animation: {
      converter: "String",
      default: null
    }, clip: {
      converter: "String",
      default: null
    },
    auto: {
      converter: "Boolean",
      default: true
    },
    loop: {
      converter: "Boolean",
      default: true
    },
    time: {
      converter: "Number",
      default: 0
    }
  };
  public animation: string;
  public clip: string;
  public auto: boolean;
  public loop: boolean;
  public time: number;
  private _animation: Animation;
  private _animationPromise: Promise<Animation>;
  private _ready: boolean;
  private _Time: TimeComponent;
  private _initTime: number;
  get Animation() {
    return this._animation;
  }
  set Animation(animation: Animation) {
    this._animation = animation;
  }
  public $mount(): void {
    this.__bindAttributes();
    this._initTime = this.time;
    this._Time = this.node.getComponentInAncestor("Time") as TimeComponent;
    if (this.animation === "dynamic") {
      this._ready = true
    } else if (this.animation && typeof this.animation === "string") {
      this._animationPromise = AnimationFactory.instanciate(this.animation);
      this._registerAttributes();
    } else {
      throw new Error("Animation type name must be sppecified and string");
    }
  }
  public $update() {
    //TODO use LoopManagerComponent
    if (this._ready && this.auto) this._update();
  }
  private async _registerAttributes(): Promise<void> {
    this._animation = await this._animationPromise;
    console.log(this._animation)
    this._ready = true;
  }
  public step(time: number): void {
    this._animation.getClip(this.clip).step(this.node, time);
  }
  private _update(): void {
    const length = this._animation.getClip(this.clip).getLength();
    this.time = this._Time.getAttribute("time") + this._initTime;
    this.time = this.loop ? this.time % length : this.time;
    this._animation.getClip(this.clip).step(this.node, this.time);
  }
  public getClip(clipName: string): AnimationClip {
    return this.Animation.getClip(clipName)
  }
}

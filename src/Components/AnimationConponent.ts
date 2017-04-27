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
    clip: {
      converter: "String",
      default: null
    },
    auto: {
      converter: "Boolean",
      default: false
    },
    loop: {
      converter: "Boolean",
      default: false
    },
    time: {
      converter: "Number",
      default: 0
    }
  };

  public animationPromise: Promise<Animation>;
  public animation: Animation;
  public ready: boolean;
  public time: number;
  public loop: boolean;
  public auto: boolean;
  public Time: TimeComponent;
  public clip: string;
  private initTime: number;
  private clipName: string;
  private animationName: string;
  get Animation() {
    return this.animation;
  }
  public $mount(): void {
    this.__bindAttributes();
    this.initTime = this.time;
    this.clipName = this.clip.split("#")[1];
    this.animationName = this.clip.split("#")[0];
    this.Time = this.node.getComponentInAncestor("Time") as TimeComponent;
    if (this.animationName && typeof this.animationName === "string") {
      this.animationPromise = AnimationFactory.instanciate(this.animationName);
      this._registerAttributes();
    } else {
      throw new Error("Animation type name must be sppecified and string");
    }
    this.getAttributeRaw('clip').watch((attr) => {
      this.animationName = this.clip.split("#")[0];
      this.clipName = this.clip.split("#")[1];
    })
  }
  public $update() {
    //TODO use LoopManagerComponent
    if (this.ready && this.auto) this._update();
  }
  private async _registerAttributes(): Promise<void> {
    this.animation = await this.animationPromise;
    this.ready = true;
  }
  public step(time: number): void {
    this.animation.getClip(this.clip).step(this.node, time);
  }
  private _update(): void {
    const length = this.animation.getClip(this.clipName).getLength();
    this.time = this.Time.getAttribute("time") + this.initTime;
    this.time = this.loop ? this.time % length : this.time;
    this.animation.getClip(this.clipName).step(this.node, this.time);
  }
  public getClip(clipName): AnimationClip {
    return this.Animation.getClip(clipName)
  }
}

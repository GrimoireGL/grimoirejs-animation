import gr from "grimoirejs";
import AnimationFactory from "../Animation/AnimationFactory";
import Animation from "../Animation/Animation";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import TimeComponent from "grimoirejs-fundamental/ref/Components/TimeComponent";
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
    private animationName: string;
    private clipName: string;
    public $mount(): void {
        this.__bindAttributes();
        const clip = this.getAttribute("clip").split("#");
        this.animationName = clip[0];
        this.clipName = clip[1];
        this.Time = this.node.getComponentInAncestor("Time") as TimeComponent;
        if (this.animationName && typeof this.animationName === "string") {
            this.animationPromise = (this.companion.get("AnimationFactory") as AnimationFactory).instanciate(this.animationName);
            this._registerAttributes();
        } else {
            throw new Error("Animation type name must be sppecified and string");
        }
    }
    public $update() {
        if (this.ready) {
          console.log(this.Time.getAttribute("time"))
            this.animation.getClip(this.clipName).step(this.node, this.Time.getAttribute("time"));
        } else {
          //TODO ロード未完了の際の例外処理
        }
    }

    private async _registerAttributes(): Promise<void> {
        this.animation = await this.animationPromise;
        console.log(this.animation);
        this.ready = true;
        this.animation.auto = this.auto;
        this.animation.loop = this.loop;
    }
}

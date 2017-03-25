import gr from "grimoirejs";
import AnimationFactory from "../Animation/AnimationFactory";
import Animation from "../Animation/Animation";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import TimeComponent from "grimoirejs-fundamental/ref/Components/TimeComponent";
export default class AnimationComponent extends Component {
    public static attributes: { [key: string]: IAttributeDeclaration } = {
        typeName: {
            converter: "String",
            default: null
        },
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
    public typeName: string;
    public clip: string;
    private initTime: number;
    public $mount(): void {
        this.__bindAttributes();
        this.initTime = this.time;
        this.Time = this.node.getComponentInAncestor("Time") as TimeComponent;
        if (this.typeName && typeof this.typeName === "string") {
            this.animationPromise = (this.companion.get("AnimationFactory") as AnimationFactory).instanciate(this.typeName);
            this._registerAttributes();
        } else {
            throw new Error("Animation type name must be sppecified and string");
        }
    }
    public $update() {

        if (this.ready && this.auto) {
            const length = this.animation.getClip(this.clip).getLength();
            this.time = this.Time.getAttribute("time") + this.initTime;
            const _time = this.loop ? this.time % length : this.time;
            this.animation.getClip(this.clip).step(this.node, _time);
        } else {
            //TODO ロード未完了の際の例外処理
        }
    }

    private async _registerAttributes(): Promise<void> {
        this.animation = await this.animationPromise;
        this.ready = true;
    }
    public step(time: number): void {
        this.animation.getClip(this.clip).step(this.node, time);
    }
}

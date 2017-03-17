import gr from "grimoirejs";
import AnimationFactory from "../Animation/AnimationFactory";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
export default class AnimationComponent extends Component {
    public static attributes: { [key: string]: IAttributeDeclaration } = {
    };
    public $awake(): void {
        const ns = gr.ns("HTTP://GRIMOIRE.GL/NS/DEFAULT");
        this.companion.set(ns("AnimationFactory"), new AnimationFactory());
    }
}

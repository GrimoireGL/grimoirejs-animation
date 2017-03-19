import gr from "grimoirejs";
import AnimationFactory from "../Animation/AnimationFactory";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Constants from "grimoirejs/ref/Base/Constants";
export default class SetAnimationFactoryComponent extends Component {
    public static attributes: { [key: string]: IAttributeDeclaration } = {
    };
    public $awake(): void {
        const ns = gr.ns(Constants.defaultNamespace);
        this.companion.set(ns("AnimationFactory"), new AnimationFactory());
    }
}

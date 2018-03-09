import gr from "grimoirejs";
import AnimationFactory from "../Animation/AnimationFactory";
import Component from "grimoirejs/ref/Core/Component";
import { IAttributeDeclaration } from "grimoirejs/ref/Interface/IAttributeDeclaration";
import { attribute, readonly } from "grimoirejs/ref/Core/Decorator";
/** 
 * Import specified animation json as named resource.
*/
export default class AnimationImporterComponent extends Component {
    public static componentName = "AnimationImporter";
    /**
     * Name to be registered.
     * Animation component will refer animation by using this name.
     */
    @readonly()
    @attribute("String", null)
    private typeName: string;
    /**
     * Source destination of animation resource.
     * Must follow URL representation.
     */
    @readonly()
    @attribute("String", null)
    private src: string;

    public $awake(): void {
        if (!this.typeName || !this.src) {
            throw new Error("type or src cannot be null in Animation importer");
        } else {
            AnimationFactory.addAnimationFromURL(this.typeName, this.src);
        }
    }
}

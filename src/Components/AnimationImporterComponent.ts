import gr from "grimoirejs";
import AnimationFactory from "../Animation/AnimationFactory";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
export default class AnimationImporterComponent extends Component {
    public static attributes: { [key: string]: IAttributeDeclaration } = {
        typeName: {
            default: null,
            converter: "String"
        },
        src: {
            default: null,
            converter: "String"
        }
    };
    public $awake(): void {
        this.getAttributeRaw("typeName").watch(v => {
            console.warn(`Changeing 'typeName' on AnimationImporter makes no sense. This change won't affect anything.`);
        });
        this.getAttributeRaw("src").watch(v => {
            console.warn(`Changeing 'src' on AnimationImporter makes no sense. This change won't affect anything.`);
        });
        if (!this.getAttribute("typeName") || !this.getAttribute("src")) {
            throw new Error("type or src cannot be null in Animation importer");
        } else {
            AnimationFactory.addAnimationFromURL(this.getAttribute("typeName"), this.getAttribute("src"));
        }
    }
}

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
    private typeName: string;
    public $awake(): void {
        this.__bindAttributes()
        this.getAttributeRaw("typeName").watch(v => {
            console.warn(`Changeing 'typeName' on AnimationImporter makes no sense. This change won't affect anything.`);
        });
        this.getAttributeRaw("src").watch(v => {
            console.warn(`Changeing 'src' on AnimationImporter makes no sense. This change won't affect anything.`);
        });
        if (!this.typeName || !this.getAttribute("src")) {
            throw new Error("type or src cannot be null in Animation importer");
        } else if (AnimationFactory.animationTypes.indexOf(this.typeName) >= 0) {
            throw new Error(`A Animation type '${this.typeName}' is already loaded.`);
        } else {
            AnimationFactory.animationTypes.push(this.typeName)
            AnimationFactory.addAnimationFromURL(this.typeName, this.getAttribute("src"));
        }
    }
}

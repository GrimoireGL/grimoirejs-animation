import gr from "grimoirejs";
import AnimationFactory from "../Animation/AnimationFactory";
import Component from "grimoirejs/ref/Core/Component";
import IAttributeDeclaration from "grimoirejs/ref/Interface/IAttributeDeclaration";
export default class AnimationImporterComponent extends Component {
    public static componentName = "AnimationImporter";
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
    private src: string;
    public $awake(): void {
        this.__bindAttributes()
        this.getAttributeRaw("typeName").watch(v => {
            console.warn(`Changeing 'typeName' on AnimationImporter makes no sense. This change won't affect anything.`);
        });
        this.getAttributeRaw("src").watch(v => {
            console.warn(`Changeing 'src' on AnimationImporter makes no sense. This change won't affect anything.`);
        });
        if (!this.typeName || !this.src) {
            throw new Error("type or src cannot be null in Animation importer");
        } else {
            AnimationFactory.addAnimationFromURL(this.typeName, this.src);
        }
    }
}

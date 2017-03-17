import gr from "grimoirejs";
import AnimationImporterComponent from "./Components/AnimationImporterComponent";
import AnimationComponent from "./Components/AnimationConponent";
import AnimationFactory from "./Animation/AnimationFactory";
import SetAnimationFactoryComponent from "./Components/SetAnimationFactoryComponent";
export default () => {
    gr.register(async () => {
        const _$ns = gr.ns("HTTP://GRIMOIRE.GL/NS/DEFAULT");
        gr.registerNode("import-animation", ["AnimationImporter"]);
        gr.registerComponent(_$ns("Animation"), AnimationComponent);
        gr.registerComponent(_$ns("AnimationImporter"), AnimationImporterComponent);
        gr.registerComponent(_$ns("SetAnimationFactory"), SetAnimationFactoryComponent);
        gr.overrideDeclaration("goml", ["SetAnimationFactory"]);
    });
};

import gr from "grimoirejs";
import AnimationImporterComponent from "./Components/AnimationImporterComponent";
import AnimationComponent from "./Components/AnimationConponent";
import AnimationFactory from "./Animation/AnimationFactory";
import Constants from "grimoirejs/ref/Base/Constants";
export default () => {
    gr.register(async () => {
        const _$ns = gr.ns(Constants.defaultNamespace);
        gr.registerNode("import-animation", ["AnimationImporter"]);
        gr.registerComponent(_$ns("Animation"), AnimationComponent);
        gr.registerComponent(_$ns("AnimationImporter"), AnimationImporterComponent);
    });
};

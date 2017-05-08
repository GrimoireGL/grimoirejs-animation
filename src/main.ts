import gr from "grimoirejs";
import AnimationImporterComponent from "./Components/AnimationImporterComponent";
import AnimationComponent from "./Components/AnimationComponent";
import AnimationFactory from "./Animation/AnimationFactory";
import Constants from "grimoirejs/ref/Base/Constants";
import NodeInterface from "grimoirejs/ref/Interface/NodeInterface";
import GomlNode from "grimoirejs/ref/Node/GomlNode";
import Animation from "./Animation/Animation";
import IAnimationClipRecipe from "./Animation/Schema/IAnimationClipRecipe"
import IAnimationRecipe from "./Animation/Schema/IAnimationRecipe";
import Attribute from "grimoirejs/ref/Node/Attribute"

function animate(attributeName: string, value: number[], time: number) {
  if (this instanceof NodeInterface) {
    (this as NodeInterface).forEach(n => (n as any).animate(attributeName, value, time))
  } else {
    const animation = (this as GomlNode).addComponent("Animation", { animation: 'dynamic', clip: 'dynamic' }) as AnimationComponent;
    let timelines: {
      "times": number[],
      "values": number[]
    }[] = [];
    for (let i = 0; i < this.getAttributeRaw(attributeName)._value.length; i++) {
      timelines[i] = {
        "times": [0, time],
        "values": [this.getAttributeRaw(attributeName)._value[i], value[i]]
      }
    }
    console.log(timelines)

    const animationRecipe = {
      'dynamic': [
        {
          "query": "@",
          "component": this.getAttributeRaw('position').component.name.name,
          "attribute": attributeName,
          "timelines": timelines
        }
      ]
    }
    animation.Animation = new Animation(animationRecipe);
  }
}

export default () => {
  gr.register(async () => {
    const _$ns = gr.ns(Constants.defaultNamespace);
    gr.registerNode("import-animation", ["AnimationImporter"]);
    gr.registerComponent(_$ns("Animation"), AnimationComponent);
    gr.registerComponent(_$ns("AnimationImporter"), AnimationImporterComponent);
    gr.prototype.constructor.Interface.NodeInterface.prototype.animate = animate;
    (GomlNode.prototype as any).animate = animate;
  });
};

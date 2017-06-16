import GomlNode from "grimoirejs/ref/Node/GomlNode";
import Component from "grimoirejs/ref/Node/Component";
import TimelineCalculator from "../Util/TimelineCalculator";
import IAnimationClipElement from "../Animation/Schema/IAnimationClipElement"
export default class AnimationClip {
  private elements: { [key: string]: IAnimationClipElement } = {};
  constructor(_element: IAnimationClipElement[]) {
    for (let key in _element) {
      this.elements[key] = _element[key];
    }
  }
  public step(rootNode: GomlNode, time: number): void {
    for (let key in this.elements) {
      const e = this.elements[key];
      if (e.query === '@') {
        // (rootNode.getComponent(e.component) as Component).setAttribute(e.attribute, TimelineCalculator.calc(time, e.timelines));
      } else {
        // rootNode.element.querySelectorAll(e.query).forEach(childElement => {
        //   (GomlNode.fromElement(childElement).getComponent(e.component) as Component).setAttribute(e.attribute, TimelineCalculator.calc(time, e.timelines));
        // });
      }
    }
  }
}

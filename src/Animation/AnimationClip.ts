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
  get Elements() {
    return this.elements;
  }
  get Length() {
    let len = 0;
    for (let key in this.elements) {
      const t = this.elements[key].timeline[this.elements[key].timeline.length - 1];
      len = t > len ? t : len;
    }
    return len;
  }
  public step(rootNode: GomlNode, time: number): void {
    for (let key in this.elements) {
      const e = this.elements[key];
      const attribute = (rootNode.getComponent(e.component) as Component).getAttributeRaw(e.attribute);
      if (e.query === '@') {
        (rootNode.getComponent(e.component) as Component).setAttribute(e.attribute, TimelineCalculator.calc(time, e, attribute));
      } else {
        rootNode.element.querySelectorAll(e.query).forEach(childElement => {
          (GomlNode.fromElement(childElement).getComponent(e.component) as Component).setAttribute(e.attribute, TimelineCalculator.calc(time, e, attribute));
        });
      }
    }
  }
}

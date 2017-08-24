import GomlNode from "grimoirejs/ref/Node/GomlNode";
import Component from "grimoirejs/ref/Node/Component";
import TimelineCalculator from "../Util/TimelineCalculator";
import IAnimationMoment from "../Animation/Schema/IAnimationMoment"
export default class AnimationClip {
  private _moments: { [key: string]: IAnimationMoment } = {};
  constructor(moments: IAnimationMoment[]) {
    for (let key in moments) {
      this.moments[key] = moments[key];
    }
  }
  get moments() {
    return this._moments;
  }
  get length() {
    let len = 0;
    for (let key in this.moments) {
      const t = this.moments[key].timeline[this.moments[key].timeline.length - 1];
      len = t > len ? t : len;
    }
    return len;
  }
  public step(rootNode: GomlNode, time: number): void {
    for (let key in this.moments) {
      // TODO cache!!!!!
      const e = this.moments[key];
      const component = rootNode.getComponent<Component>(e.component);
      const attribute = component.getAttributeRaw(e.attribute);
      if (e.query === '@') {
        component.setAttribute(e.attribute, TimelineCalculator.calc(time, e, attribute));
      } else {
        rootNode.element.querySelectorAll(e.query).forEach(childElement => {
          (GomlNode.fromElement(childElement).getComponent(e.component) as Component).setAttribute(e.attribute, TimelineCalculator.calc(time, e, attribute));
        });
      }
    }
  }
}

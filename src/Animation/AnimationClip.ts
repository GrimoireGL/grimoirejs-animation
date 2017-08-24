import GomlNode from "grimoirejs/ref/Node/GomlNode";
import Component from "grimoirejs/ref/Node/Component";
import TimelineCalculator from "../Util/TimelineCalculator";
import IAnimationTimeline from "../Animation/Schema/IAnimationTimeline"
export default class AnimationClip {
  private _timeline: { [key: string]: IAnimationTimeline } = {};
  constructor(timeline: IAnimationTimeline[]) {
    for (let key in timeline) {
      this.timeline[key] = timeline[key];
    }
  }
  get timeline() {
    return this._timeline;
  }
  get length() {
    let len = 0;
    for (let key in this.timeline) {
      const t = this.timeline[key].timeline[this.timeline[key].timeline.length - 1];
      len = t > len ? t : len;
    }
    return len;
  }
  public step(rootNode: GomlNode, time: number): void {
    for (let key in this.timeline) {
      // TODO cache!!!!!
      const e = this.timeline[key];
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

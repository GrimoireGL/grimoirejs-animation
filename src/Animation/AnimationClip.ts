import IAnimationClipRecipe from "./Schema/IAnimationClipRecipe";
import GomlNode from "grimoirejs/ref/Node/GomlNode";
import TimelineCalculator from "../Util/TimelineCalculator";
import AnimationClipElement from "../Animation/Schema/IAnimationClipElement"
import IAnimationClipElement from "../Animation/Schema/IAnimationClipElement"
export default class AnimationClip {
  private _animationClipElements: Map<string, IAnimationClipElement> = new Map<string, IAnimationClipElement>();
  constructor(private _clip: IAnimationClipRecipe) {
    for (let i = 0; i < _clip.length; i++) {
      this._animationClipElements.set(_clip[i].query, _clip[i])
    }
  }
  get Elements(): Map<string, IAnimationClipElement> {
    return this._animationClipElements;
  }

  public step(node: GomlNode, time: number): void {
    for (let elementIndex = 0; elementIndex < this._clip.length; elementIndex++) {
      const clipRecipe = this._clip[elementIndex];
      const query: string = clipRecipe.query;
      const attribute = clipRecipe.attribute;
      const component = clipRecipe.component;
      const timelines = clipRecipe.timelines;
      const lead = query.substr(0, 1);
      if (lead === "@") {
        const result = TimelineCalculator.calc(time, timelines);
        node.setAttribute(attribute, result);
      } else {
        const _nodes = node.element.querySelectorAll(query);
        for (let i = 0; i < _nodes.length; i++) {
          const gomlNode = GomlNode.fromElement(_nodes.item(i));
          const result = TimelineCalculator.calc(time, timelines);
          gomlNode.setAttribute(attribute, result);
        }
      }
    }
  }
  public getElement(query: string): IAnimationClipElement {
    return this.Elements.get(query)
  }
  public rootElement(): IAnimationClipElement {
    return this.getElement('@');
  }

  public getLength(): number {
    let length = 0;
    for (let elementIndex = 0; elementIndex < this._clip.length; elementIndex++) {
      const timelines = this._clip[elementIndex].timelines;
      for (let i = 0; i < timelines.length; i++) {
        const times = timelines[i].times;
        length = length <= times[times.length - 1] ? times[times.length - 1] : length;
      }
    }
    return length;
  }
}

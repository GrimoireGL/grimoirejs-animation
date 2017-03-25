import IAnimationClipRecipe from "./IAnimationClipRecipe";
import GomlNode from "grimoirejs/ref/Node/GomlNode";
import TimelineCalculator from "../Util/TimelineCalculator";
import AttributeParser from "../Util/AttributeParser";
export default class AnimationClip {
    constructor(private clip: IAnimationClipRecipe) {

    }
    public step(node: GomlNode, time: number): void {
        for (var key in this.clip) {
            const query:string = this.clip[key]["query"];
            const attribute = this.clip[key]["attribute"];
            const component = this.clip[key]["component"];
            const timelines = this.clip[key]["timelines"];
            const lead = query.substr(0, 1);
            if (lead === "@") {
                const result = TimelineCalculator.calc(time, timelines);
                const value = AttributeParser.parse(node.getAttributeRaw(attribute).Value);
                node.setAttribute(attribute, TimelineCalculator.updateValue(value, result));
            } else{
              const _nodes = node.element.querySelectorAll(query);
              for (let i = 0; i < _nodes.length; i++) {
                  const gomlNode = GomlNode.fromElement(_nodes.item(i));
                  const result = TimelineCalculator.calc(time, timelines);
                  const value = AttributeParser.parse(gomlNode.getAttributeRaw(attribute).Value);
                  gomlNode.setAttribute(attribute, TimelineCalculator.updateValue(value, result));
              }
            }
        }
    }
    public getLength(): number {
        let length = 0;
        for (var key in this.clip) {
            const timelines = this.clip[key]["timelines"];
            for (let i = 0; i < timelines.length; i++) {
                const times = timelines[i]["times"];
                length = length <= times[times.length - 1] ? times[times.length - 1] : length;
            }
        }
        return length;
    }
}
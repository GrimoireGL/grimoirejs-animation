import IAnimationClipRecipe from "./IAnimationClipRecipe";
import GomlNode from "grimoirejs/ref/Node/GomlNode";
import TimelineCalculator from "../Util/TimelineCalculator";
import AttributeParser from "../Util/AttributeParser";
export default class AnimationClip {
    constructor(private clip: IAnimationClipRecipe) {

    }
    public step(node: GomlNode, time: number): void {
        for (var key in this.clip) {
            const query = this.clip[key]["query"];
            const target = this.clip[key]["target"].split("|");
            const timelines = this.clip[key]["timelines"];
            if (query === "@") {
                const result = TimelineCalculator.calc(time, timelines);
                const value = AttributeParser.parse(node.getAttributeRaw(target[1]).Value);
                node.setAttribute(target[1], TimelineCalculator.updateValue(value, result));
            } else {
                //TODO queryが@でない場合の処理
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
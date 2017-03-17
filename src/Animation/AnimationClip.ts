import IAnimationClipRecipe from "./IAnimationClipRecipe";
import GomlNode from "grimoirejs/ref/Node/GomlNode";
import TimelineCalculator from "../Util/TimelineCalculator";
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
                console.log(result)
                node.setAttribute(target[1], result);
            } else {
                //TODO queryが@でない場合の処理
            }
        }
    }
}
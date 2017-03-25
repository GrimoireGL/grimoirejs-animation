import IAnimationClipRecipe from "./Schema/IAnimationClipRecipe";
import GomlNode from "grimoirejs/ref/Node/GomlNode";
import TimelineCalculator from "../Util/TimelineCalculator";
export default class AnimationClip {
    constructor(private _clip: IAnimationClipRecipe) {

    }
    public step(node: GomlNode, time: number): void {
        for (let elementIndex = 0; elementIndex < this._clip.length; elementIndex++) {
            const clipRecipe = this._clip[elementIndex];
            const query:string = clipRecipe.query;
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

    public getLength(): number {
        let length = 0;
        for (var key in this._clip) {
            const timelines = this._clip[key]["timelines"];
            for (let i = 0; i < timelines.length; i++) {
                const times = timelines[i]["times"];
                length = length <= times[times.length - 1] ? times[times.length - 1] : length;
            }
        }
        return length;
    }
}

import IAnimationEffect from "../Animation/Schema/IAnimationEffect";
import {EffectName} from "../Animation/Schema/IAnimationEffectName";
import NSIdentity from "grimoirejs/ref/Base/NSIdentity";
import IAnimationTimeline from "../Animation/Schema/IAnimationTimeline";
import Attribute from "grimoirejs/ref/Node/Attribute";
import Vector4 from "grimoirejs-math/ref/Vector4";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Vector2 from "grimoirejs-math/ref/Vector2";
import Color3 from "grimoirejs-math/ref/Color3";
import Color4 from "grimoirejs-math/ref/Color4";
import Quaternion from "grimoirejs-math/ref/Quaternion";

export default class TimelineCalculator {
  public static calc(time: number, element: IAnimationTimeline, attribute: Attribute): any {
    const timelinePosition = this._decideTimelinePosition(time, element.timeline);
    if (element.values.length - 1 === timelinePosition) {
      return element.values[timelinePosition];
    }
    if (element.defaultEffect !== void 0) {
      const t = Math.max(0, Math.min(1, (time - element.timeline[timelinePosition]) / (element.timeline[timelinePosition + 1] - element.timeline[timelinePosition])));
      const v1 = attribute.converter.convert(element.values[timelinePosition], attribute);
      const v2 = attribute.converter.convert(element.values[timelinePosition + 1], attribute);
      if (element.defaultEffect === EffectName.LINEAR) {
        switch ((attribute.converter.name as NSIdentity).name) {
          case "Number" || "Angle2D":
            return v1 + (v2 - v1) * t;
          case "Vector2":
            return Vector2.lerp(v1, v2, t);
          case "Vector3":
            return Vector3.lerp(v1, v2, t);
          case "Vector4":
            return Vector4.lerp(v1, v2, t);
          case "Rotation3":
            return Quaternion.slerp(v1, v2, t);
          case "Color3":
            const v3 = Vector3.lerp(v1.toVector(), v2.toVector(), t);
            return new Color3(v3.X, v3.Y, v3.Z);
          case "Color4":
            const v4 = Vector4.lerp(v1.toVector(), v2.toVector(), t);
            return new Color4(v4.X, v4.Y, v4.Z, v4.W);
          default:
            throw new Error('Converter ' + attribute.converter.name + ' is not supported.');
        }
      } else if (element.defaultEffect === EffectName.DESCRETE) {
        return element.values[timelinePosition];
      }
    }
  }
  private static _decideTimelinePosition(time: number, timeline: number[]): number {
    let left = 0;
    let right = timeline.length - 1;
    let mid;
    if (time < timeline[left]) {
      return left;
    } else if (time > timeline[right]) {
      return right;
    }
    while (right - left > 1) {
      mid = Math.floor((left + right) / 2);
      if (timeline[mid] === time) {
        return mid;
      } else if (timeline[mid] < time) {
        left = mid;
      } else if (time < timeline[mid]) {
        right = mid;
      }
    }
    return left;
  }
}
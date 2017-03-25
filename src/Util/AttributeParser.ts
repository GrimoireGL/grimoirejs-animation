import Vector3 from "grimoirejs-math/ref/Vector3";
import Quaternion from "grimoirejs-math/ref/Quaternion";
export default class AttributeParser {
    public static parse(value: any): number[] {
        let result: number[];
        if (value instanceof Vector3) {
            result = [value.X, value.Y, value.Z];
        } else if (value instanceof Quaternion) {
            result = [value.X, value.Y, value.Z, value.W];
        }
        return result;
    }

}
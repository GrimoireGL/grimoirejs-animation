import Vector3 from "grimoirejs-math/ref/Vector3";
export default class AttributeParser {
    public static parse(value: any): number[] {
        let result: number[];
        if (value instanceof Vector3) {
            result = [value.X, value.Y, value.Z];
        };
        return result;
    }

}
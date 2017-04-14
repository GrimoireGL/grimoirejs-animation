import {EffectName} from "./IAnimationEffectName"
interface IAnimationEffect {
    type?: EffectName;
    [options: string]: any;
}
export default IAnimationEffect;

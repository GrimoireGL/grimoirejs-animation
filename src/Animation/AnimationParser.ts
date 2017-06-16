import IAnimationRecipe from "./Schema/IAnimationRecipe";
import HashCalculator from "grimoirejs-fundamental/ref/Util/HashCalculator";
export default class AnimationParser {
  private static _parsedCache: { [key: number]: IAnimationRecipe } = {};
  public static parse(source: string): IAnimationRecipe {
    const sourceHash = HashCalculator.calcHash(source);
    if (AnimationParser._parsedCache[sourceHash] !== void 0) {
      return AnimationParser._parsedCache[sourceHash];
    } else {
      AnimationParser._parsedCache[sourceHash] = JSON.parse(source);
      return AnimationParser._parsedCache[sourceHash];
    }
  }
}

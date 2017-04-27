import IAnimationClipElement from "./IAnimationClipElement";
interface IAnimationClipRecipe {
  length: number;
  [index: number]: IAnimationClipElement
}
export default IAnimationClipRecipe;

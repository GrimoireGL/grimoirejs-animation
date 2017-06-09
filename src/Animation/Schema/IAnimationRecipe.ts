import IAnimationClipElement from "./IAnimationClipElement";
interface IAnimationRecipe {
  [clipName:string]: IAnimationClipElement[];
}
export default IAnimationRecipe;

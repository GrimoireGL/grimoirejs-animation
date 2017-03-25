import IAnimationClipRecipe from "./IAnimationClipRecipe";
interface IAnimationRecipe {
  [clipName:string]: IAnimationClipRecipe;
}
export default IAnimationRecipe;

import IAnimationMoment from "./IAnimationMoment";
interface IAnimationRecipe{
  [clipName:string]: IAnimationMoment[];
}
export default IAnimationRecipe;

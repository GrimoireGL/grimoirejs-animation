import IAnimationTimeline from "./IAnimationTimeline";
interface IAnimationRecipe{
  [clipName:string]: IAnimationTimeline[];
}
export default IAnimationRecipe;

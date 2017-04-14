import IAnimationEffect from "./IAnimationEffect";
interface IAnimationTimeline{
  values:number[];
  times:number[];
  effects?:IAnimationEffect[];
}

export default IAnimationTimeline;

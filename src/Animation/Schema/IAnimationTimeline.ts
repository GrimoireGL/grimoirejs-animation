import IAnimationEffect from  "./IAnimationEffect";
interface IAnimationTimeline {
  query: string;
  component: string;
  attribute: string;
  timeline: number[];
  values: any[];
  effects?: IAnimationEffect[];
  defaultEffect?: IAnimationEffect;
}
export default IAnimationTimeline;

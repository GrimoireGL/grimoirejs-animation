import IAnimationEffect from  "./IAnimationEffect";
interface IAnimationClipElement {
  query: string;
  component: string;
  attribute: string;
  timeline: number[];
  values: any[];
  effects?: IAnimationEffect[];
  defaultEffect?: IAnimationEffect;
}
export default IAnimationClipElement;

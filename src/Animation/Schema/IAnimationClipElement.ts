import IAnimationTimeline from  "./IAnimationTimeline";
import IAnimationEffect from  "./IAnimationEffect";
interface IAnimationClipElement {
  query: string;
  component: string;
  attribute: string;
  timelines: IAnimationTimeline[];
  effects?: IAnimationEffect[];
  defaultEffect?: IAnimationEffect;
}
export default IAnimationClipElement;

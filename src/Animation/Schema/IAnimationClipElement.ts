import IAnimationTimeline from  "./IAnimationTimeline";
interface IAnimationClipElement{
  query:string;
  component:string;
  attribute:string;
  timelines:IAnimationTimeline[];
}

export default IAnimationClipElement;

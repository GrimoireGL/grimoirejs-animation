export default class TimelineCalculator {
    public static calc(time: number, timelines: Array<Object>): number[] | number {
        let result = [];
        for (let i = 0; i < timelines.length; i++) {
            const r = this._calc(time, timelines[i]);
            if (r === null) {
                console.warn("Animation effect type is not defined");
            } else {
                result.push(r);
            }
        }
        if (result.length === 1) {
            return result[0];
        } else {
            return result;
        }
    }
    private static _decideTimelinePosition(time: number, times: number[]): number {
        let left = 0;
        let right = times.length - 1;
        let mid;
        if (time < times[left]) {
            return left;
        } else if (time > times[right]) {
            return right;
        }
        while (right - left > 1) {
            mid = Math.floor((left + right) / 2);
            if (times[mid] === time) {
                return mid;
            } else if (times[mid] < time) {
                left = mid;
            } else if (time < times[mid]) {
                right = mid;
            }
        }
        return left;
    }
    private static _calc(time: number, timeline: Object): number {
        const timelinePosition = this._decideTimelinePosition(time, timeline["times"]);
        if (timeline["values"].length - 1 === timelinePosition) {
            return timeline["values"][timelinePosition];
        }
        //TODO effectがLINERでない場合の処理
        if (timeline["effects"][timelinePosition] === "LINER") {
            const y1 = timeline["values"][timelinePosition];
            const y2 = timeline["values"][timelinePosition + 1];
            const x1 = timeline["times"][timelinePosition]
            const x2 = timeline["times"][timelinePosition + 1];
            return (y2 - y1) * (time - x1) / (x2 - x1) + y1;
        }
        return null;
    }
}
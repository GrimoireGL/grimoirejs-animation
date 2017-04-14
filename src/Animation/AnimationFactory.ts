import AnimationParser from "./AnimationParser";
import TextFileResolver from "grimoirejs-fundamental/ref/Asset/TextFileResolver";
import Animation from "./Animation";
export default class AnimationFactory {
    public static animationGenerators: { [key: string]: (() => Animation) } = {};
    public static registerdHandlers: { [key: string]: (() => void)[] } = {};

    public static addAnimationType(typeName: string, animationGenerator: () => Animation): void {
        AnimationFactory.animationGenerators[typeName] = animationGenerator;
        if (AnimationFactory.registerdHandlers[typeName]) {
            AnimationFactory.registerdHandlers[typeName].forEach((t) => t());
        }
    }
    public static addAnimation(typeName: string, source: string): void {
        const recipe = AnimationParser.parse(source);
        AnimationFactory.addAnimationType(typeName, () => {
            return new Animation(recipe);
        });
    }
    public static async addAnimationFromURL(typeName: string, url: string): Promise<void> {
        const source = await TextFileResolver.resolve(url);
        AnimationFactory.addAnimation(typeName, source);
    }
    private static _onRegister(typeName: string, handler: () => void): void {
        if (AnimationFactory.registerdHandlers[typeName]) {
            AnimationFactory.registerdHandlers[typeName].push(handler);
        } else {
            AnimationFactory.registerdHandlers[typeName] = [handler];
        }
    }
    public async instanciate(typeName: string): Promise<Animation> {
        if (AnimationFactory.animationGenerators[typeName]) {
            return AnimationFactory.animationGenerators[typeName]();
        } else {
            return await this._waitForRegistered(typeName);
        }
    }
    private _waitForRegistered(typeName: string): Promise<Animation> {
        return new Promise<Animation>((resolve) => {
            AnimationFactory._onRegister(typeName, () => {
                resolve(AnimationFactory.animationGenerators[typeName]());
            });
        });
    }
}

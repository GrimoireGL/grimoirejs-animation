import AnimationParser from "./AnimationParser";
import TextFileResolver from "grimoirejs-fundamental/ref/Asset/TextFileResolver";
import Animation from "./Animation";
/**
 * Store registered animations.
 * Animations are instanciated from this class.
 */
export default class AnimationFactory {
    /**
     * Registered animation generators.
     */
    public static animationGenerators: { [key: string]: (() => Animation) } = {};
    /**
     * To wait an animation loaded, instanciate can postpone instanciating by storeing this handler and call later.
     */
    public static onRegisterHandlers: { [key: string]: (() => void)[] } = {};

    /**
     * typeNames that already loaded or loading.
     */
    private static _knownTypeNames:Set<string> = new Set<string>();
    
    /**
     * Add animation type by generator and typeName
     * @param typeName 
     * @param animationGenerator 
     */
    public static addAnimationType(typeName: string, animationGenerator: () => Animation): void {
        if(this._knownTypeNames.has(typeName)){
            throw new Error(`Specified animation ${typeName} was loaded already.`);            
        }
        this._knownTypeNames.add(typeName);
        this.animationGenerators[typeName] = animationGenerator;
        if (AnimationFactory.onRegisterHandlers[typeName]) {
            AnimationFactory.onRegisterHandlers[typeName].forEach((t) => t());
        }
    }

    /**
     * Add animation type directly.
     * @param typeName 
     * @param source 
     */
    public static addAnimation(typeName: string, source: string): void {
        const recipe = AnimationParser.parse(source);
        AnimationFactory.addAnimationType(typeName, () => {
            return new Animation(recipe);
        });
    }

    /**
     * Load animation type from specified url.
     * @param typeName 
     * @param url 
     */
    public static async addAnimationFromURL(typeName: string, url: string): Promise<void> {
        if(this._knownTypeNames.has(typeName)){
            throw new Error(`Specified animation ${typeName} was loaded already.`);
        }
        this._knownTypeNames.add(typeName); // TextFileResolver can be async, to prevent being appended new loader for same typeName
                                             // Mark as the typeName loading temporary.
        const source = await TextFileResolver.resolve(url);
        this._knownTypeNames.delete(typeName); // Remove once.
        AnimationFactory.addAnimation(typeName, source);
    }
    
    private static _onRegister(typeName: string, handler: () => void): void {
        if (AnimationFactory.onRegisterHandlers[typeName]) {
            AnimationFactory.onRegisterHandlers[typeName].push(handler);
        } else {
            AnimationFactory.onRegisterHandlers[typeName] = [handler];
        }
    }
    /**
     * Instanciate animation by specifing typeName.
     * @param typeName 
     */
    public static async instanciate(typeName: string): Promise<Animation> {
        if (AnimationFactory.animationGenerators[typeName]) {
            return AnimationFactory.animationGenerators[typeName]();
        } else {
            return await this._waitForRegistered(typeName);
        }
    }
    private static _waitForRegistered(typeName: string): Promise<Animation> {
        return new Promise<Animation>((resolve) => {
            AnimationFactory._onRegister(typeName, () => {
                resolve(AnimationFactory.animationGenerators[typeName]());
            });
        });
    }
}

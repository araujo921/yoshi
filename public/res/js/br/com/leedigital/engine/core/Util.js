/**
 * 
 */
export default class Util {

    static invoker(methodName, arrayObject, contextObject) {
        for (let entity of arrayObject) {
            if (entity[methodName]) {
                entity[methodName](contextObject);
            }
        }
    }

}

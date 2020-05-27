export declare enum JSONObjectType {
    Array = 0,
    ObjectWithNonNumericKeys = 1,
    Object = 2,
    Primitive = 3
}
export interface JSONObjectKeys {
    labels: string[];
    type: JSONObjectType;
}
export default class JsonToTableUtils {
    /**
     * Get object type
     */
    static getObjectType(obj: any): JSONObjectType;
    static checkLabelTypes(labels: any[]): "string" | "number";
    static getUniqueObjectKeys(anArray: any[]): JSONObjectKeys;
}

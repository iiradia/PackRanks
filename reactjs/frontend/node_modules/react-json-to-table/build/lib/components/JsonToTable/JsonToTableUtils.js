"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSONObjectType;
(function (JSONObjectType) {
    JSONObjectType[JSONObjectType["Array"] = 0] = "Array";
    JSONObjectType[JSONObjectType["ObjectWithNonNumericKeys"] = 1] = "ObjectWithNonNumericKeys";
    JSONObjectType[JSONObjectType["Object"] = 2] = "Object";
    JSONObjectType[JSONObjectType["Primitive"] = 3] = "Primitive";
})(JSONObjectType = exports.JSONObjectType || (exports.JSONObjectType = {}));
var JsonToTableUtils = /** @class */ (function () {
    function JsonToTableUtils() {
    }
    /**
     * Get object type
     */
    JsonToTableUtils.getObjectType = function (obj) {
        if (obj !== null && typeof obj === "object") {
            if (Array.isArray(obj)) {
                return JSONObjectType.Array;
            }
            else {
                if (Object.keys(obj).length) {
                    return JSONObjectType.ObjectWithNonNumericKeys;
                }
                else {
                    return JSONObjectType.Object;
                }
            }
        }
        else {
            return JSONObjectType.Primitive;
        }
    };
    JsonToTableUtils.checkLabelTypes = function (labels) {
        var reduced = labels.reduce(function (accumulator, value) {
            return accumulator + (isNaN(Number(value)) ? value : Number(value));
        }, 0);
        return typeof reduced === "number" ? "number" : "string";
    };
    JsonToTableUtils.getUniqueObjectKeys = function (anArray) {
        var labels = [];
        var objectType = JSONObjectType.Object;
        anArray.forEach(function (item) {
            labels = labels.concat(Object.keys(item)).filter(function (elem, pos, arr) {
                return arr.indexOf(elem) === pos;
            });
        });
        return { labels: labels, type: objectType };
    };
    return JsonToTableUtils;
}());
exports.default = JsonToTableUtils;
//# sourceMappingURL=JsonToTableUtils.js.map
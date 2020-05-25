"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./JsonToTable.css");
var JsonToTableUtils_1 = require("./JsonToTableUtils");
var JsonToTableUtils_2 = require("./JsonToTableUtils");
var JsonToTable = /** @class */ (function (_super) {
    __extends(JsonToTable, _super);
    // constructor
    function JsonToTable(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.renderObject = function (obj, header, idx) {
            var phrase = [];
            var tmp;
            if (header) {
                phrase.push(_this.renderRowHeader(header));
            }
            var objType = JsonToTableUtils_2.default.getObjectType(obj);
            switch (objType) {
                case JsonToTableUtils_1.JSONObjectType.ObjectWithNonNumericKeys:
                    tmp = header ? (React.createElement("table", { key: "__j2t_tableObj" + idx },
                        React.createElement("tbody", { key: "__j2t_bObj" + idx }, _this.renderRows(obj)))) : (_this.renderRows(obj));
                    break;
                case JsonToTableUtils_1.JSONObjectType.Array:
                    tmp = header ? (React.createElement("table", { key: "__j2t_tableArr" + idx },
                        React.createElement("tbody", { key: "__j2t_bArr" + idx }, _this.parseArray(obj)))) : (_this.parseArray(obj));
                    break;
            }
            phrase.push(tmp);
            var retval = phrase.map(function (p) { return p; });
            return header ? (React.createElement("tr", { key: "__j2t_trObj" + idx }, _this.renderCell({ content: retval, colspan: 2 }))) : (retval);
        };
        _this.renderCell = function (params) {
            var content = params.content, colspan = params.colspan, isHeader = params.isHeader;
            var valueDisplay = isHeader ? React.createElement("strong", null, content) : content;
            return React.createElement("td", { colSpan: colspan ? colspan : 0, key: "__j2t_trObj" + valueDisplay }, valueDisplay);
        };
        _this.renderHeader = function (labels) {
            return (React.createElement("tr", { key: "__j2t_trHeader" }, labels.map(function (v) {
                return _this.renderCell({ content: v });
            })));
        };
        _this.renderValues = function (values) {
            return (React.createElement("tr", { key: "__j2t_trArrString" }, values.map(function (k) {
                return _this.renderCell({ content: k });
            })));
        };
        _this.renderRowValues = function (anArray, labels) {
            return anArray.map(function (item, idx) {
                return (React.createElement("tr", { key: "__j2t_Arr" + idx.toString() }, labels.map(function (k) {
                    var isValuePrimitive = JsonToTableUtils_2.default.getObjectType(k) === JsonToTableUtils_1.JSONObjectType.Primitive;
                    return isValuePrimitive
                        ? _this.renderCell({ content: item[k] })
                        : _this.renderObject(item[k], k, idx);
                })));
            });
        };
        _this.parseArray = function (anArray) {
            var phrase = [];
            var labels = JsonToTableUtils_2.default.getUniqueObjectKeys(anArray);
            if (JsonToTableUtils_2.default.checkLabelTypes(labels.labels) !== "number") {
                phrase.push(_this.renderHeader(labels.labels));
                phrase.push(_this.renderRowValues(anArray, labels.labels));
            }
            else {
                phrase.push(_this.renderValues(anArray));
            }
            return phrase;
        };
        _this.renderRow = function (k, v, idx) {
            return (React.createElement("tr", { key: "__j2t_tr" + idx },
                React.createElement("td", { key: "__j2t_tdk" + idx },
                    React.createElement("strong", null, k)),
                React.createElement("td", { key: "__j2t_tdv" + idx }, v)));
        };
        _this.renderRowHeader = function (label) {
            return (React.createElement("div", { key: "__j2t_rw" + label },
                React.createElement("strong", null, label)));
        };
        _this.renderRows = function (obj, labelKey) {
            return Object.keys(obj).map(function (k, idx) {
                var value = obj[k];
                var isValuePrimitive = JsonToTableUtils_2.default.getObjectType(value) === JsonToTableUtils_1.JSONObjectType.Primitive;
                // render row when value is primitive otherwise inspect the value and make the key as header
                var retval = isValuePrimitive
                    ? _this.renderRow(k, value, idx)
                    : _this.renderObject(value, k, idx);
                return retval;
            });
        };
        return _this;
    }
    JsonToTable.prototype.render = function () {
        return (React.createElement("div", { className: 'json-to-table' },
            React.createElement("table", { key: "__j2t_root_table" },
                React.createElement("tbody", { key: "__j2t_root_tbody" }, this.renderObject(this.props.json, undefined, 0)))));
    };
    return JsonToTable;
}(React.Component));
exports.default = JsonToTable;
//# sourceMappingURL=JsonToTable.js.map
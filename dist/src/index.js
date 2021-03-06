"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var path_1 = require("path");
var generator_1 = require("./generator");
var normalizer_1 = require("./normalizer");
var optimizer_1 = require("./optimizer");
var parser_1 = require("./parser");
var resolver_1 = require("./resolver");
var utils_1 = require("./utils");
var validator_1 = require("./validator");
exports.DEFAULT_OPTIONS = {
    bannerComment: "/**\n* This file was automatically generated by json-schema-to-typescript.\n* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,\n* and run json-schema-to-typescript to regenerate this file.\n*/",
    cwd: process.cwd(),
    declareReferenced: true,
    declareReferencedImport: '.gen',
    enableConstEnums: true,
    enableTrailingSemicolonForEnums: false,
    enableTrailingSemicolonForInterfaceProperties: true,
    enableTrailingSemicolonForInterfaces: false,
    enableTrailingSemicolonForTypes: true,
    indentWith: '  '
};
function compileFromFile(filename, options) {
    if (options === void 0) { options = exports.DEFAULT_OPTIONS; }
    var contents = utils_1.Try(function () { return fs_1.readFileSync(filename); }, function () { throw new ReferenceError("Unable to read file \"" + filename + "\""); });
    var schema = utils_1.Try(function () { return JSON.parse(contents.toString()); }, function () { throw new TypeError("Error parsing JSON in file \"" + filename + "\""); });
    return compile(schema, utils_1.stripExtension(filename), __assign({}, options, { cwd: path_1.dirname(filename) }));
}
exports.compileFromFile = compileFromFile;
function compile(schema, name, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _options, errors, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _options = __assign({}, exports.DEFAULT_OPTIONS, options);
                    errors = validator_1.validate(schema, name);
                    if (errors.length) {
                        errors.forEach(function (_) { return utils_1.error(_); });
                        throw new ValidationError;
                    }
                    // normalize options
                    if (!lodash_1.endsWith(_options.cwd, '/')) {
                        _options.cwd += '/';
                    }
                    _a = generator_1.generate;
                    _b = optimizer_1.optimize;
                    _c = parser_1.parse;
                    return [4 /*yield*/, resolver_1.dereference(normalizer_1.normalize(schema, name), _options.cwd)];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.apply(void 0, [_d.sent()])]),
                        _options])];
            }
        });
    });
}
exports.compile = compile;
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
//# sourceMappingURL=index.js.map
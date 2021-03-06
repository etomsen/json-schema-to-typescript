"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_color_1 = require("cli-color");
var lodash_1 = require("lodash");
var path_1 = require("path");
// TODO: pull out into a separate package
function Try(fn, err) {
    try {
        return fn();
    }
    catch (e) {
        return err(e);
    }
}
exports.Try = Try;
/**
 * Depth-first traversal
 */
function dft(object, cb) {
    for (var key in object) {
        if (!object.hasOwnProperty(key))
            continue;
        if (lodash_1.isPlainObject(object[key]))
            dft(object[key], cb);
        cb(object[key], key);
    }
}
exports.dft = dft;
function mapDeep(object, fn, key) {
    return fn(lodash_1.mapValues(object, function (_, key) {
        return lodash_1.isPlainObject(_) ? mapDeep(_, fn, key) : _;
    }), key);
}
exports.mapDeep = mapDeep;
/**
 * Eg. `foo/bar/baz.json` => `baz`
 */
function justName(filename) {
    if (filename === void 0) { filename = ''; }
    return stripExtension(path_1.basename(filename));
}
exports.justName = justName;
/**
 * Avoid appending "js" to top-level unnamed schemas
 */
function stripExtension(filename) {
    return filename.replace(path_1.extname(filename), '');
}
exports.stripExtension = stripExtension;
/**
 * Convert a string that might contain spaces or special characters to one that
 * can safely be used as a TypeScript interface or enum name.
 *
 * TODO: be non-destructive for caps (eg. "fooBAR" is ok, and shouldn't be converted to "fooBar")
 */
function toSafeString(string) {
    return lodash_1.upperFirst(lodash_1.camelCase(string));
}
exports.toSafeString = toSafeString;
function error() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    console.error.apply(console, [cli_color_1.whiteBright.bgRedBright('error')].concat(messages));
}
exports.error = error;
function log() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    if (process.env.DEBUG) {
        console.info.apply(console, [cli_color_1.whiteBright.bgCyan('debug')].concat(messages));
    }
}
exports.log = log;
//# sourceMappingURL=utils.js.map
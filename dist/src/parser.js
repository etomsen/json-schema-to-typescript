"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_color_1 = require("cli-color");
var lodash_1 = require("lodash");
var typeOfSchema_1 = require("./typeOfSchema");
var AST_1 = require("./types/AST");
var utils_1 = require("./utils");
function parse(schema, rootSchema, keyName, isSchema, processed) {
    if (rootSchema === void 0) { rootSchema = schema; }
    if (isSchema === void 0) { isSchema = true; }
    if (processed === void 0) { processed = new Map(); }
    // If we've seen this node before, return it.
    if (processed.has(schema)) {
        return processed.get(schema);
    }
    var definitions = getDefinitions(rootSchema);
    var keyNameFromDefinition = lodash_1.findKey(definitions, function (_) { return _ === schema; });
    // Cache processed ASTs before they are actually computed, then update
    // them in place using set(). This is to avoid cycles.
    // TODO: Investigate alternative approaches (lazy-computing nodes, etc.)
    var ast = {};
    processed.set(schema, ast);
    var set = function (_ast) { return Object.assign(ast, _ast); };
    return isSchema
        ? parseNonLiteral(schema, rootSchema, keyName, keyNameFromDefinition, set, processed)
        : parseLiteral(schema, keyName, keyNameFromDefinition, set);
}
exports.parse = parse;
function parseLiteral(schema, keyName, keyNameFromDefinition, set) {
    return set({
        keyName: keyName,
        params: schema,
        standaloneName: keyNameFromDefinition,
        type: 'LITERAL'
    });
}
function parseNonLiteral(schema, rootSchema, keyName, keyNameFromDefinition, set, processed) {
    utils_1.log(cli_color_1.whiteBright.bgBlue('parser'), schema, '<-' + typeOfSchema_1.typeOfSchema(schema), processed.has(schema) ? '(FROM CACHE)' : '');
    switch (typeOfSchema_1.typeOfSchema(schema)) {
        case 'ALL_OF':
            return set({
                comment: schema.description,
                keyName: keyName,
                params: schema.allOf.map(function (_) { return parse(_, rootSchema, undefined, true, processed); }),
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'INTERSECTION'
            });
        case 'ANY':
            return set({
                comment: schema.description,
                keyName: keyName,
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'ANY'
            });
        case 'ANY_OF':
            return set({
                comment: schema.description,
                keyName: keyName,
                params: schema.anyOf.map(function (_) { return parse(_, rootSchema, undefined, true, processed); }),
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'UNION'
            });
        case 'BOOLEAN':
            return set({
                comment: schema.description,
                keyName: keyName,
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'BOOLEAN'
            });
        case 'NAMED_ENUM':
            return set({
                comment: schema.description,
                keyName: keyName,
                params: schema.enum.map(function (_, n) { return ({
                    ast: parse(_, rootSchema, undefined, false, processed),
                    keyName: schema.tsEnumNames[n]
                }); }),
                standaloneName: keyName,
                type: 'ENUM'
            });
        case 'NAMED_SCHEMA':
            return set({
                comment: schema.description,
                keyName: keyName,
                params: parseSchema(schema, rootSchema, processed),
                standaloneName: computeSchemaName(schema),
                type: 'INTERFACE'
            });
        case 'NULL':
            return set({
                comment: schema.description,
                keyName: keyName,
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'NULL'
            });
        case 'NUMBER':
            return set({
                comment: schema.description,
                keyName: keyName,
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'NUMBER'
            });
        case 'OBJECT':
            return set({
                comment: schema.description,
                keyName: keyName,
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'OBJECT'
            });
        case 'ONE_OF':
            return set({
                comment: schema.description,
                keyName: keyName,
                params: schema.oneOf.map(function (_) { return parse(_, rootSchema, undefined, true, processed); }),
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'UNION'
            });
        case 'REFERENCE':
            throw utils_1.error('Refs should have been resolved by the resolver!', schema);
        case 'STRING':
            return set({
                comment: schema.description,
                keyName: keyName,
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'STRING'
            });
        case 'TYPED_ARRAY':
            if (Array.isArray(schema.items)) {
                return set({
                    comment: schema.description,
                    keyName: keyName,
                    params: schema.items.map(function (_) { return parse(_, rootSchema, undefined, true, processed); }),
                    standaloneName: schema.title || schema.id || keyNameFromDefinition,
                    type: 'TUPLE'
                });
            }
            else {
                return set({
                    comment: schema.description,
                    keyName: keyName,
                    params: parse(schema.items, rootSchema, undefined, true, processed),
                    standaloneName: schema.title || schema.id || keyNameFromDefinition,
                    type: 'ARRAY'
                });
            }
        case 'UNION':
            return set({
                comment: schema.description,
                keyName: keyName,
                params: schema.type.map(function (_) { return parse({ type: _ }, rootSchema, undefined, true, processed); }),
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'UNION'
            });
        case 'UNNAMED_ENUM':
            return set({
                comment: schema.description,
                keyName: keyName,
                params: schema.enum.map(function (_) { return parse(_, rootSchema, undefined, false, processed); }),
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'UNION'
            });
        case 'UNNAMED_SCHEMA':
            return set({
                comment: schema.description,
                keyName: keyName,
                params: parseSchema(schema, rootSchema, processed),
                standaloneName: computeSchemaName(schema)
                    || keyNameFromDefinition,
                type: 'INTERFACE'
            });
        case 'UNTYPED_ARRAY':
            return set({
                comment: schema.description,
                keyName: keyName,
                params: AST_1.T_ANY,
                standaloneName: schema.title || schema.id || keyNameFromDefinition,
                type: 'ARRAY'
            });
    }
}
/**
 * Compute a schema name using a series of fallbacks
 */
function computeSchemaName(schema) {
    return schema.title || schema.id;
}
/**
 * Helper to parse schema properties into params on the parent schema's type
 */
function parseSchema(schema, rootSchema, processed) {
    var asts = lodash_1.map(schema.properties, function (value, key) { return ({
        ast: parse(value, rootSchema, key, true, processed),
        isRequired: lodash_1.includes(schema.required || [], key),
        keyName: key
    }); });
    // handle additionalProperties
    switch (schema.additionalProperties) {
        case undefined:
        case true:
            return asts.concat({
                ast: AST_1.T_ANY_ADDITIONAL_PROPERTIES,
                isRequired: true,
                keyName: '[k: string]'
            });
        case false:
            return asts;
        // pass "true" as the last param because in TS, properties
        // defined via index signatures are already optional
        default:
            return asts.concat({
                ast: parse(schema.additionalProperties, rootSchema, '[k: string]', true, processed),
                isRequired: true,
                keyName: '[k: string]'
            });
    }
}
/**
 * TODO: Memoize
 */
function getDefinitions(schema, isSchema, processed) {
    if (isSchema === void 0) { isSchema = true; }
    if (processed === void 0) { processed = new Set(); }
    if (processed.has(schema)) {
        return {};
    }
    processed.add(schema);
    if (Array.isArray(schema)) {
        return schema.reduce(function (prev, cur) { return (__assign({}, prev, getDefinitions(cur, false, processed))); }, {});
    }
    if (lodash_1.isPlainObject(schema)) {
        return __assign({}, (isSchema && hasDefinitions(schema) ? schema.definitions : {}), Object.keys(schema).reduce(function (prev, cur) { return (__assign({}, prev, getDefinitions(schema[cur], false, processed))); }, {}));
    }
    return {};
}
/**
 * TODO: Reduce rate of false positives
 */
function hasDefinitions(schema) {
    return 'definitions' in schema;
}
//# sourceMappingURL=parser.js.map
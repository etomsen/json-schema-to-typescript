"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = {
    id: 'http://json-schema.org/draft-04/schema#',
    $schema: 'http://json-schema.org/draft-04/schema#',
    description: 'Core schema meta-schema',
    definitions: {
        schemaArray: {
            type: 'array',
            minItems: 1,
            items: { $ref: '#' }
        },
        positiveInteger: {
            type: 'integer',
            minimum: 0
        },
        positiveIntegerDefault0: {
            allOf: [{ $ref: '#/definitions/positiveInteger' }, { default: 0 }]
        },
        simpleTypes: {
            enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string']
        },
        stringArray: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
            uniqueItems: true
        }
    },
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uri'
        },
        $schema: {
            type: 'string',
            format: 'uri'
        },
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        default: {},
        multipleOf: {
            type: 'number',
            minimum: 0,
            exclusiveMinimum: true
        },
        maximum: {
            type: 'number'
        },
        exclusiveMaximum: {
            type: 'boolean',
            default: false
        },
        minimum: {
            type: 'number'
        },
        exclusiveMinimum: {
            type: 'boolean',
            default: false
        },
        maxLength: { $ref: '#/definitions/positiveInteger' },
        minLength: { $ref: '#/definitions/positiveIntegerDefault0' },
        pattern: {
            type: 'string',
            format: 'regex'
        },
        additionalItems: {
            anyOf: [
                { type: 'boolean' },
                { $ref: '#' }
            ],
            default: {}
        },
        items: {
            anyOf: [
                { $ref: '#' },
                { $ref: '#/definitions/schemaArray' }
            ],
            default: {}
        },
        maxItems: { $ref: '#/definitions/positiveInteger' },
        minItems: { $ref: '#/definitions/positiveIntegerDefault0' },
        uniqueItems: {
            type: 'boolean',
            default: false
        },
        maxProperties: { $ref: '#/definitions/positiveInteger' },
        minProperties: { $ref: '#/definitions/positiveIntegerDefault0' },
        required: { $ref: '#/definitions/stringArray' },
        additionalProperties: {
            anyOf: [
                { type: 'boolean' },
                { $ref: '#' }
            ],
            default: {}
        },
        definitions: {
            type: 'object',
            additionalProperties: { $ref: '#' },
            default: {}
        },
        properties: {
            type: 'object',
            additionalProperties: { $ref: '#' },
            default: {}
        },
        patternProperties: {
            type: 'object',
            additionalProperties: { $ref: '#' },
            default: {}
        },
        dependencies: {
            type: 'object',
            additionalProperties: {
                anyOf: [
                    { $ref: '#' },
                    { $ref: '#/definitions/stringArray' }
                ]
            }
        },
        enum: {
            type: 'array',
            minItems: 1,
            uniqueItems: true
        },
        type: {
            anyOf: [
                { $ref: '#/definitions/simpleTypes' },
                {
                    type: 'array',
                    items: { $ref: '#/definitions/simpleTypes' },
                    minItems: 1,
                    uniqueItems: true
                }
            ]
        },
        allOf: { $ref: '#/definitions/schemaArray' },
        anyOf: { $ref: '#/definitions/schemaArray' },
        oneOf: { $ref: '#/definitions/schemaArray' },
        not: { $ref: '#' }
    },
    dependencies: {
        exclusiveMaximum: ['maximum'],
        exclusiveMinimum: ['minimum']
    },
    default: {}
};
exports.output = "/**\n* This file was automatically generated by json-schema-to-typescript.\n* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,\n* and run json-schema-to-typescript to regenerate this file.\n*/\n\nexport type PositiveInteger = number;\nexport type PositiveIntegerDefault0 = PositiveInteger;\nexport type SchemaArray = HttpJsonSchemaOrgDraft04Schema[];\nexport type StringArray = string[];\nexport type SimpleTypes = (\"array\" | \"boolean\" | \"integer\" | \"null\" | \"number\" | \"object\" | \"string\");\n\n/**\n * Core schema meta-schema\n */\nexport interface HttpJsonSchemaOrgDraft04Schema {\n  id?: string;\n  $schema?: string;\n  title?: string;\n  description?: string;\n  default?: any;\n  multipleOf?: number;\n  maximum?: number;\n  exclusiveMaximum?: boolean;\n  minimum?: number;\n  exclusiveMinimum?: boolean;\n  maxLength?: PositiveInteger;\n  minLength?: PositiveIntegerDefault0;\n  pattern?: string;\n  additionalItems?: (boolean | HttpJsonSchemaOrgDraft04Schema);\n  items?: (HttpJsonSchemaOrgDraft04Schema | SchemaArray);\n  maxItems?: PositiveInteger;\n  minItems?: PositiveIntegerDefault0;\n  uniqueItems?: boolean;\n  maxProperties?: PositiveInteger;\n  minProperties?: PositiveIntegerDefault0;\n  required?: StringArray;\n  additionalProperties?: (boolean | HttpJsonSchemaOrgDraft04Schema);\n  definitions?: {\n    [k: string]: HttpJsonSchemaOrgDraft04Schema;\n  };\n  properties?: {\n    [k: string]: HttpJsonSchemaOrgDraft04Schema;\n  };\n  patternProperties?: {\n    [k: string]: HttpJsonSchemaOrgDraft04Schema;\n  };\n  dependencies?: {\n    [k: string]: (HttpJsonSchemaOrgDraft04Schema | StringArray);\n  };\n  enum?: any[];\n  type?: (SimpleTypes | SimpleTypes[]);\n  allOf?: SchemaArray;\n  anyOf?: SchemaArray;\n  oneOf?: SchemaArray;\n  not?: HttpJsonSchemaOrgDraft04Schema;\n  [k: string]: any;\n}\n";
//# sourceMappingURL=JSONSchema.js.map
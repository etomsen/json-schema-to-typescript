"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://github.com/fge/sample-json-schemas/blob/master/json-stat
 */
exports.input = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "JSON-stat 2.0 Schema",
    "id": "https://json-stat.org/format/schema/2.0/",
    "description": "This is version 1.03 of the JSON-stat 2.0 Schema (2016-05-04)",
    "definitions": {
        "strarray": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "uniqueItems": true
        },
        "version": {
            "type": "string",
            "enum": ["2.0"]
        },
        "updated": {
            "oneOf": [
                { "type": "string", "format": "date-time" },
                { "type": "string", "pattern": "^((19|20)\\d\\d)\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$" }
            ]
        },
        "href": {
            "type": "string",
            "format": "uri"
        },
        "label": {
            "type": "string"
        },
        "source": {
            "type": "string"
        },
        "extension": {
            "type": "object"
        },
        "error": {
            "type": "array"
        },
        "note": { "$ref": "#/definitions/strarray" },
        "category": {
            "type": "object",
            "properties": {
                "index": {
                    "oneOf": [
                        {
                            "$ref": "#/definitions/strarray"
                        },
                        {
                            "type": "object",
                            "additionalProperties": {
                                "type": "number"
                            }
                        }
                    ]
                },
                "label": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                },
                "note": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/strarray"
                    }
                },
                "unit": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "object",
                        "properties": {
                            "label": {
                                "$ref": "#/definitions/label"
                            },
                            "decimals": {
                                "type": "integer"
                            },
                            "position": {
                                "type": "string",
                                "enum": ["start", "end"]
                            }
                        }
                    }
                },
                "coordinates": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "array",
                        "items": [
                            { "type": "number" },
                            { "type": "number" }
                        ],
                        "additionalItems": false
                    }
                },
                "child": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/strarray"
                    }
                }
            },
            "additionalProperties": false
        },
        "link": {
            "type": "object",
            "patternProperties": {
                "^(about|alternate|appendix|archives|author|blocked-by|bookmark|canonical|chapter|collection|contents|copyright|create-form|current|derivedfrom|describedby|describes|disclosure|dns-prefetch|duplicate|edit|edit-form|edit-media|enclosure|first|glossary|help|hosts|hub|icon|index|item|last|latest-version|license|lrdd|memento|monitor|monitor-group|next|next-archive|nofollow|noreferrer|original|payment|pingback|preconnect|predecessor-version|prefetch|preload|prerender|prev|preview|previous|prev-archive|privacy-policy|profile|related|replies|search|section|self|service|start|stylesheet|subsection|successor-version|tag|terms-of-service|timegate|timemap|type|up|version-history|via|webmention|working-copy|working-copy-of)$": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string"
                            },
                            "class": { "type": "string", "enum": ["dataset", "collection", "dimension"] },
                            "href": { "$ref": "#/definitions/href" },
                            "label": { "$ref": "#/definitions/label" },
                            "note": { "$ref": "#/definitions/note" },
                            "link": { "$ref": "#/definitions/link" },
                            "updated": { "$ref": "#/definitions/updated" },
                            "source": { "$ref": "#/definitions/source" },
                            "extension": { "$ref": "#/definitions/extension" },
                            "category": { "$ref": "#/definitions/category" },
                            "id": { "$ref": "#/definitions/strarray" },
                            "size": {
                                "type": "array",
                                "items": {
                                    "type": "integer"
                                }
                            },
                            "role": {
                                "type": "object",
                                "properties": {
                                    "time": { "$ref": "#/definitions/strarray" },
                                    "geo": { "$ref": "#/definitions/strarray" },
                                    "metric": { "$ref": "#/definitions/strarray" }
                                },
                                "additionalProperties": false
                            },
                            "dimension": {
                                "type": "object",
                                "additionalProperties": {
                                    "type": "object",
                                    "properties": {
                                        "href": { "$ref": "#/definitions/href" },
                                        "label": { "$ref": "#/definitions/label" },
                                        "note": { "$ref": "#/definitions/note" },
                                        "link": { "$ref": "#/definitions/link" },
                                        "extension": { "$ref": "#/definitions/extension" },
                                        "category": { "$ref": "#/definitions/category" }
                                    },
                                    "additionalProperties": false,
                                    "required": ["category"]
                                }
                            },
                            "value": {
                                "oneOf": [
                                    {
                                        "type": "array",
                                        "items": {
                                            "anyOf": [
                                                { "type": "number" },
                                                { "type": "null" },
                                                { "type": "string" }
                                            ]
                                        }
                                    },
                                    {
                                        "type": "object",
                                        "additionalProperties": {
                                            "anyOf": [
                                                { "type": "number" },
                                                { "type": "null" },
                                                { "type": "string" }
                                            ]
                                        }
                                    }
                                ]
                            },
                            "status": {
                                "oneOf": [
                                    {
                                        "type": "string"
                                    },
                                    {
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    {
                                        "type": "object",
                                        "additionalProperties": {
                                            "type": "string"
                                        }
                                    }
                                ]
                            }
                        },
                        "additionalProperties": false
                    }
                }
            },
            "additionalProperties": false
        }
    },
    "oneOf": [
        {
            "type": "object",
            "properties": {
                "class": { "type": "string", "enum": ["dataset"] },
                "version": { "$ref": "#/definitions/version" },
                "href": { "$ref": "#/definitions/href" },
                "label": { "$ref": "#/definitions/label" },
                "note": { "$ref": "#/definitions/note" },
                "link": { "$ref": "#/definitions/link" },
                "updated": { "$ref": "#/definitions/updated" },
                "source": { "$ref": "#/definitions/source" },
                "error": { "$ref": "#/definitions/error" },
                "extension": { "$ref": "#/definitions/extension" },
                "id": { "$ref": "#/definitions/strarray" },
                "size": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                },
                "role": {
                    "type": "object",
                    "properties": {
                        "time": { "$ref": "#/definitions/strarray" },
                        "geo": { "$ref": "#/definitions/strarray" },
                        "metric": { "$ref": "#/definitions/strarray" }
                    },
                    "additionalProperties": false
                },
                "dimension": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "object",
                        "properties": {
                            "href": { "$ref": "#/definitions/href" },
                            "label": { "$ref": "#/definitions/label" },
                            "note": { "$ref": "#/definitions/note" },
                            "link": { "$ref": "#/definitions/link" },
                            "extension": { "$ref": "#/definitions/extension" },
                            "category": { "$ref": "#/definitions/category" }
                        },
                        "additionalProperties": false,
                        "required": ["category"]
                    }
                },
                "value": {
                    "oneOf": [
                        {
                            "type": "array",
                            "items": {
                                "anyOf": [
                                    { "type": "number" },
                                    { "type": "null" },
                                    { "type": "string" }
                                ]
                            }
                        },
                        {
                            "type": "object",
                            "additionalProperties": {
                                "anyOf": [
                                    { "type": "number" },
                                    { "type": "null" },
                                    { "type": "string" }
                                ]
                            }
                        }
                    ]
                },
                "status": {
                    "oneOf": [
                        {
                            "type": "string"
                        },
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        {
                            "type": "object",
                            "additionalProperties": {
                                "type": "string"
                            }
                        }
                    ]
                }
            },
            "additionalProperties": false,
            "required": ["version", "class", "value", "id", "size", "dimension"]
        },
        {
            "type": "object",
            "properties": {
                "class": { "type": "string", "enum": ["dimension"] },
                "version": { "$ref": "#/definitions/version" },
                "href": { "$ref": "#/definitions/href" },
                "label": { "$ref": "#/definitions/label" },
                "note": { "$ref": "#/definitions/note" },
                "link": { "$ref": "#/definitions/link" },
                "updated": { "$ref": "#/definitions/updated" },
                "source": { "$ref": "#/definitions/source" },
                "error": { "$ref": "#/definitions/error" },
                "extension": { "$ref": "#/definitions/extension" },
                "category": { "$ref": "#/definitions/category" }
            },
            "additionalProperties": false,
            "required": ["version", "class", "category"]
        },
        {
            "type": "object",
            "properties": {
                "class": { "type": "string", "enum": ["collection"] },
                "version": { "$ref": "#/definitions/version" },
                "href": { "$ref": "#/definitions/href" },
                "label": { "$ref": "#/definitions/label" },
                "note": { "$ref": "#/definitions/note" },
                "link": {
                    "type": "object",
                    "properties": {
                        "item": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "type": {
                                        "type": "string"
                                    },
                                    "class": { "type": "string", "enum": ["dataset", "collection", "dimension"] },
                                    "href": { "$ref": "#/definitions/href" },
                                    "label": { "$ref": "#/definitions/label" },
                                    "note": { "$ref": "#/definitions/note" },
                                    "link": { "$ref": "#/definitions/link" },
                                    "updated": { "$ref": "#/definitions/updated" },
                                    "source": { "$ref": "#/definitions/source" },
                                    "extension": { "$ref": "#/definitions/extension" },
                                    "category": { "$ref": "#/definitions/category" },
                                    "id": { "$ref": "#/definitions/strarray" },
                                    "size": {
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "role": {
                                        "type": "object",
                                        "properties": {
                                            "time": { "$ref": "#/definitions/strarray" },
                                            "geo": { "$ref": "#/definitions/strarray" },
                                            "metric": { "$ref": "#/definitions/strarray" }
                                        },
                                        "additionalProperties": false
                                    },
                                    "dimension": {
                                        "type": "object",
                                        "additionalProperties": {
                                            "type": "object",
                                            "properties": {
                                                "href": { "$ref": "#/definitions/href" },
                                                "label": { "$ref": "#/definitions/label" },
                                                "note": { "$ref": "#/definitions/note" },
                                                "link": { "$ref": "#/definitions/link" },
                                                "extension": { "$ref": "#/definitions/extension" },
                                                "category": { "$ref": "#/definitions/category" }
                                            },
                                            "additionalProperties": false,
                                            "required": ["category"]
                                        }
                                    },
                                    "value": {
                                        "oneOf": [
                                            {
                                                "type": "array",
                                                "items": {
                                                    "anyOf": [
                                                        { "type": "number" },
                                                        { "type": "null" },
                                                        { "type": "string" }
                                                    ]
                                                }
                                            },
                                            {
                                                "type": "object",
                                                "additionalProperties": {
                                                    "anyOf": [
                                                        { "type": "number" },
                                                        { "type": "null" },
                                                        { "type": "string" }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    "status": {
                                        "oneOf": [
                                            {
                                                "type": "string"
                                            },
                                            {
                                                "type": "array",
                                                "items": {
                                                    "type": "string"
                                                }
                                            },
                                            {
                                                "type": "object",
                                                "additionalProperties": {
                                                    "type": "string"
                                                }
                                            }
                                        ]
                                    }
                                },
                                "additionalProperties": false
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "updated": { "$ref": "#/definitions/updated" },
                "source": { "$ref": "#/definitions/source" },
                "error": { "$ref": "#/definitions/error" },
                "extension": { "$ref": "#/definitions/extension" }
            },
            "additionalProperties": false,
            "required": ["version", "class", "link"]
        }
    ]
};
exports.output = "/**\n* This file was automatically generated by json-schema-to-typescript.\n* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,\n* and run json-schema-to-typescript to regenerate this file.\n*/\n\n/**\n * This is version 1.03 of the JSON-stat 2.0 Schema (2016-05-04)\n */\nexport type JsonStat20Schema = ({\n    class: \"dataset\";\n    version: Version;\n    href?: Href;\n    label?: Label;\n    note?: Strarray;\n    link?: Link;\n    updated?: Updated;\n    source?: Source;\n    error?: Error;\n    extension?: Extension;\n    id: Strarray;\n    size: number[];\n    role?: {\n      time?: Strarray;\n      geo?: Strarray;\n      metric?: Strarray;\n    };\n    dimension: {\n      [k: string]: {\n        href?: Href;\n        label?: Label;\n        note?: Strarray;\n        link?: Link;\n        extension?: Extension;\n        category: Category;\n      };\n    };\n    value: ((number | null | string)[] | {\n      [k: string]: (number | null | string);\n    });\n    status?: (string | string[] | {\n      [k: string]: string;\n    });\n  } | {\n    class: \"dimension\";\n    version: Version;\n    href?: Href;\n    label?: Label;\n    note?: Strarray;\n    link?: Link;\n    updated?: Updated;\n    source?: Source;\n    error?: Error;\n    extension?: Extension;\n    category: Category;\n  } | {\n    class: \"collection\";\n    version: Version;\n    href?: Href;\n    label?: Label;\n    note?: Strarray;\n    link: {\n      item?: {\n          type?: string;\n          class?: (\"dataset\" | \"collection\" | \"dimension\");\n          href?: Href;\n          label?: Label;\n          note?: Strarray;\n          link?: Link;\n          updated?: Updated;\n          source?: Source;\n          extension?: Extension;\n          category?: Category;\n          id?: Strarray;\n          size?: number[];\n          role?: {\n            time?: Strarray;\n            geo?: Strarray;\n            metric?: Strarray;\n          };\n          dimension?: {\n            [k: string]: {\n              href?: Href;\n              label?: Label;\n              note?: Strarray;\n              link?: Link;\n              extension?: Extension;\n              category: Category;\n            };\n          };\n          value?: ((number | null | string)[] | {\n            [k: string]: (number | null | string);\n          });\n          status?: (string | string[] | {\n            [k: string]: string;\n          });\n        }[];\n    };\n    updated?: Updated;\n    source?: Source;\n    error?: Error;\n    extension?: Extension;\n  });\nexport type Version = \"2.0\";\nexport type Href = string;\nexport type Label = string;\nexport type Strarray = string[];\nexport type Updated = string;\nexport type Source = string;\nexport type Error = any[];\n\nexport interface Link {\n\n}\nexport interface Extension {\n  [k: string]: any;\n}\nexport interface Category {\n  index?: (Strarray | {\n    [k: string]: number;\n  });\n  label?: {\n    [k: string]: string;\n  };\n  note?: {\n    [k: string]: Strarray;\n  };\n  unit?: {\n    [k: string]: {\n      label?: Label;\n      decimals?: number;\n      position?: (\"start\" | \"end\");\n      [k: string]: any;\n    };\n  };\n  coordinates?: {\n    [k: string]: [number, number];\n  };\n  child?: {\n    [k: string]: Strarray;\n  };\n}\n";
//# sourceMappingURL=realWorld.jsonStat.js.map
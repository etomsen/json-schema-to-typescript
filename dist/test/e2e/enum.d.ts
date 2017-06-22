export declare const input: {
    "title": string;
    "type": string;
    "properties": {
        "stringEnum": {
            "type": string;
            "enum": string[];
        };
        "impliedStringEnum": {
            "enum": string[];
        };
        "booleanEnum": {
            "type": string;
            "enum": boolean[];
        };
        "impliedBooleanEnum": {
            "enum": boolean[];
        };
        "integerEnum": {
            "type": string;
            "enum": number[];
        };
        "impliedIntegerEnum": {
            "enum": number[];
        };
        "numberEnum": {
            "type": string;
            "enum": number[];
        };
        "namedIntegerEnum": {
            "type": string;
            "enum": number[];
            "tsEnumNames": string[];
        };
        "impliedNamedIntegerEnum": {
            "enum": number[];
            "tsEnumNames": string[];
        };
        "impliedHeterogeneousEnum": {
            "enum": (string | number | boolean | null)[];
        };
    };
    "required": string[];
    "additionalProperties": boolean;
};
export declare const outputs: {
    options: {
        enableConstEnums: boolean;
    };
    output: string;
}[];

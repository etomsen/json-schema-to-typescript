import { JSONSchema4 } from 'json-schema';
export { EnumJSONSchema, JSONSchema, NamedEnumJSONSchema } from './types/JSONSchema';
export interface Options {
    bannerComment: string;
    cwd: string;
    declareReferenced: boolean;
    declareReferencedImport: string;
    enableConstEnums: boolean;
    enableTrailingSemicolonForTypes: boolean;
    enableTrailingSemicolonForEnums: boolean;
    enableTrailingSemicolonForInterfaceProperties: boolean;
    enableTrailingSemicolonForInterfaces: boolean;
    indentWith: string;
}
export declare const DEFAULT_OPTIONS: Options;
export declare function compileFromFile(filename: string, options?: Options): Promise<string>;
export declare function compile(schema: JSONSchema4, name: string, options?: {}): Promise<string>;
export declare class ValidationError extends Error {
}

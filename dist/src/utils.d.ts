export declare function Try<T>(fn: () => T, err: (e: Error) => any): T;
/**
 * Depth-first traversal
 */
export declare function dft<T, U>(object: {
    [k: string]: any;
}, cb: (value: U, key: string) => T): void;
export declare function mapDeep(object: object, fn: (value: object, key?: string) => object, key?: string): object;
/**
 * Eg. `foo/bar/baz.json` => `baz`
 */
export declare function justName(filename?: string): string;
/**
 * Avoid appending "js" to top-level unnamed schemas
 */
export declare function stripExtension(filename: string): string;
/**
 * Convert a string that might contain spaces or special characters to one that
 * can safely be used as a TypeScript interface or enum name.
 *
 * TODO: be non-destructive for caps (eg. "fooBAR" is ok, and shouldn't be converted to "fooBar")
 */
export declare function toSafeString(string: string): string;
export declare function error(...messages: any[]): void;
export declare function log(...messages: any[]): void;

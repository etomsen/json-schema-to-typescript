import { JSONSchema4Type } from 'json-schema';
export declare type AST_TYPE = 'ANY' | 'ARRAY' | 'BOOLEAN' | 'ENUM' | 'INTERFACE' | 'INTERSECTION' | 'LITERAL' | 'NUMBER' | 'NULL' | 'OBJECT' | 'REFERENCE' | 'STRING' | 'TUPLE' | 'UNION';
export declare type AST = TAny | TArray | TBoolean | TEnum | TInterface | TNamedInterface | TIntersection | TLiteral | TNumber | TNull | TObject | TReference | TString | TTuple | TUnion;
export interface AbstractAST {
    comment?: string;
    keyName?: string;
    standaloneName?: string;
    type: AST_TYPE;
}
export declare type ASTWithComment = AST & {
    comment: string;
};
export declare type ASTWithName = AST & {
    keyName: string;
};
export declare type ASTWithStandaloneName = AST & {
    standaloneName: string;
};
export declare function hasComment(ast: AST): ast is ASTWithComment;
export declare function hasStandaloneName(ast: AST): ast is ASTWithStandaloneName;
export interface TAny extends AbstractAST {
    type: 'ANY';
}
export interface TArray extends AbstractAST {
    type: 'ARRAY';
    params: AST;
}
export interface TBoolean extends AbstractAST {
    type: 'BOOLEAN';
}
export interface TEnum extends AbstractAST {
    standaloneName: string;
    type: 'ENUM';
    params: TEnumParam[];
}
export interface TEnumParam {
    ast: AST;
    keyName: string;
}
export interface TInterface extends AbstractAST {
    type: 'INTERFACE';
    params: TInterfaceParam[];
}
export interface TNamedInterface extends AbstractAST {
    standaloneName: string;
    type: 'INTERFACE';
    params: TInterfaceParam[];
}
export interface TInterfaceParam {
    ast: AST;
    keyName: string;
    isRequired: boolean;
}
export interface TIntersection extends AbstractAST {
    type: 'INTERSECTION';
    params: AST[];
}
export interface TLiteral extends AbstractAST {
    params: JSONSchema4Type;
    type: 'LITERAL';
}
export interface TNumber extends AbstractAST {
    type: 'NUMBER';
}
export interface TNull extends AbstractAST {
    type: 'NULL';
}
export interface TObject extends AbstractAST {
    type: 'OBJECT';
}
export interface TReference extends AbstractAST {
    type: 'REFERENCE';
    params: string;
}
export interface TString extends AbstractAST {
    type: 'STRING';
}
export interface TTuple extends AbstractAST {
    type: 'TUPLE';
    params: AST[];
}
export interface TUnion extends AbstractAST {
    type: 'UNION';
    params: AST[];
}
export declare const T_ANY: TAny;
export declare const T_ANY_ADDITIONAL_PROPERTIES: TAny & ASTWithName;
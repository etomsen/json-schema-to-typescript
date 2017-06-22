export declare const input: {
    id: string;
    type: string;
    items: {
        type: string;
        properties: {
            id: {
                type: string;
                minLength: number;
                maxLength: number;
                pattern: string;
            };
            name: {
                type: string;
            };
        };
        required: string[];
    };
};
export declare const output: string;

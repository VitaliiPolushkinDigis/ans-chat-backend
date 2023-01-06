export declare const hashPassword: (rawPassword: string) => Promise<string>;
export declare function compareHash(rawPassword: string, hashedPassword: string): Promise<boolean>;

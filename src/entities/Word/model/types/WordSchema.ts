export enum WordComplexity {
    EASY = 1,
    MEDIUM = 2,
    HARD = 3,
}

export interface Word {
    id: string;
    value: string;
    complexity: WordComplexity;
}

export interface WordSchema {
    loading: boolean;
    list: any;
}

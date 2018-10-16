export interface Item {
    id: number;
    name: string;
    path: string;
    subitems?: Array<Item>;
    description?: string;
}

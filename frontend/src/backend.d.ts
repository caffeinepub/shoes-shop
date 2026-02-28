import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Shoe {
    id: string;
    imageUrls: Array<string>;
    name: string;
    description: string;
    sizes: Array<bigint>;
    category: string;
    colors: Array<string>;
    price: bigint;
}
export interface backendInterface {
    addShoe(id: string, name: string, description: string, category: string, price: bigint, sizes: Array<bigint>, colors: Array<string>, imageUrls: Array<string>): Promise<void>;
    filterByCategory(category: string): Promise<Array<Shoe>>;
    getAllShoes(): Promise<Array<Shoe>>;
    getShoe(id: string): Promise<Shoe>;
}

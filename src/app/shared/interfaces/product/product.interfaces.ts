import { ICat } from "../category/category.intarfaces";
export interface IProd {
    id?: string | number,
    title: string,
    describe: string,
    image: string,
    price: number,
    category: ICat,
    weight: number;
    size?: number,
    proteins?: number,
    carbohydrates?: number,
    jury?: number,
    caloric?: number,
    components?: string,
    urlName: string,
    count?: number
}
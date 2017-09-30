export interface Product{
    id: number,
    name: string,
    price: number
}

export interface Item{
    product_id: number,
    quantity: number
}
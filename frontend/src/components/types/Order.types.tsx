export type Order = {
    _id : string
    items_ordered : string[],
    quantity_ordered: Number[],
    status : string,
    total_price : Number
}
export interface OptionCount{
    scoops: ScoopsDetail[]
    toppings: ToppingsDetail[]
}

export interface ScoopsDetail {
    name: string
    amount: number
    pricePerItem: number
}

export interface ToppingsDetail {
    name: string
    amount: number
    pricePerItem: number
}

export enum IceCreamType {
    SCOOPS = "scoops",
    TOPPING = "toppings"
}
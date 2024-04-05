export interface SaleItem {
    item: string;
    qty: number;
    each: number;
}

export const items: SaleItem[] = [
    {
        item: 'milk',
        qty: 2,
        each: 25,
    },

    {
        item: 'bread',
        qty: 1,
        each: 70,
    },

    {
        item: 'eggs',
        qty: 3,
        each: 25,
    },

    {
        item: 'chips',
        qty: 1,
        each: 150,
    },

    {
        item: 'chocolate',
        qty: 1,
        each: 100,
    },
];
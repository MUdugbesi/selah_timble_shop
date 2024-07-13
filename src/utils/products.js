import { v4 as uuid } from 'uuid';
import blackBag from '../assets/images/addidas_bag_one.png';

export const Products = [
    { id: uuid(), name: 'BackPack', price: 39.00, img: blackBag, slug: "black_backpack", description: 'They quickly darken in sunlight and fade back to clear indoors: protecting you from UV rays and filtering blue-violet light.' },

    { id: uuid(), name: 'Glasses', price: 25.00, img: blackBag, slug: "glasses_black" },
    { id: uuid(), name: 'Black BackPack', price: 39.00, img: blackBag, slug: "black_backpack" },
    { id: uuid(), name: 'Black BackPack', price: 39.00, img: blackBag, slug: "black_backpack" },
    { id: uuid(), name: 'Black BackPack', price: 39.00, img: blackBag, slug: "black_backpack" },
    { id: uuid(), name: 'Black BackPack', price: 39.00, img: blackBag, slug: "black_backpack" },
    { id: uuid(), name: 'Black BackPack', price: 39.00, img: blackBag, slug: "black_backpack" },
    { id: uuid(), name: 'Black BackPack', price: 39.00, img: blackBag, slug: "black_backpack" },
    { id: uuid(), name: 'Black BackPack', price: 39.00, img: blackBag, slug: "black_backpack" },
    { id: uuid(), name: 'Black BackPack', price: 39.00, img: blackBag, slug: "black_backpack" },
];

export const Details = [
    {
        title: 'CATEGORIES',
        list: ['ACCESSORIES', 'DRESSES', 'CARDIGANS', 'JEANS', 'SKIRTS', 'CAPS', 'TOPS', 'JACKET', 'SWEATER', 'UNCATEGORIZED']
    },
    {
        title: 'FILTER BY',
        list: ['ACCESSORIES', 'CARDIGANS', 'JEANS', 'CAPS',]
    },
    {
        title: 'SIZE',
        list: ['S', 'M', 'L', 'XL',]
    }
]

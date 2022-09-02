import { TagLink } from 'contentful';

export type Picture = {
    id: string;
    url: string;
    width: number;
    height: number;
};

export type Product = {
    id: string;
    title: string;
    title_en: string;
    price: number;
    tags: TagLink[];
    pictures: Picture[];
};

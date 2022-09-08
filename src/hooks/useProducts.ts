import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import type { EntryFields, Asset } from 'contentful';
import type { Product } from '@/types';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/contentful';

type ProductEntryFields = {
    title: EntryFields.Text;
    price: EntryFields.Number;
    pictures: Asset[];
};

export const getProducts = async (): Promise<Product[]> => {
    const products = await client.getEntries<ProductEntryFields, 'he' | 'en'>({
        content_type: 'product'
    });

    return products.items.map(({ sys, fields, metadata }) => ({
        id: sys.id,
        title: fields.title.he!,
        title_en: fields.title.en || '',
        price: fields.price!.he!,
        tags: metadata.tags.map((tag) => tag.sys.id),
        pictures: fields.pictures!.he!.map((pic) => ({
            id: pic.sys.id,
            url: `https:${pic.fields.file!.he!.url}`,
            width: pic.fields.file!.he!.details.image!.width,
            height: pic.fields.file!.he!.details.image!.height
        }))
    }));
};

type QueryFnType = typeof getProducts;

type UseProductsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useProducts = ({ config }: UseProductsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['products'],
        queryFn: getProducts,
        ...config
    });
};

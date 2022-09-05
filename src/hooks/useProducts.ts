import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import type { EntryFields, Asset } from 'contentful';
import type { Product } from '@/types';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/contentful';

type ProductEntryFields = {
    title: EntryFields.Symbol;
    price: EntryFields.Integer;
    pictures: Asset[];
};

export const getProducts = async (): Promise<Product[]> => {
    const products = await client.getEntries<ProductEntryFields, 'he' | 'en'>();

    return products.items.map((product) => ({
        id: product.sys.id,
        title: product.fields.title.he!,
        title_en: product.fields.title.en || '',
        price: product.fields.price!.he!,
        tags: product.metadata.tags.map((tag) => tag.sys),
        pictures: product.fields.pictures!.he!.map((pic) => ({
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

export const useProducts = ({ config }: UseProductsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['products'],
        queryFn: () => getProducts(),
        ...config
    });
};

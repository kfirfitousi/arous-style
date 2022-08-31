import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import type { TagLink } from 'contentful';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/contentful';

type Picture = {
    id: string;
    url: string;
    title: string;
    width: number;
    height: number;
    price: string;
    tags: TagLink[];
};

export const getPictures = async (query: string[]): Promise<Picture[]> => {
    const assets = await client.getAssets();

    return assets.items
        .filter(
            (item) => !query.length || item.metadata.tags.some((tag) => query.includes(tag.sys.id))
        )
        .map((asset) => ({
            id: asset.sys.id,
            url: `https:${asset.fields.file.url}`,
            title: asset.fields.title,
            width: asset.fields.file.details.image!.width,
            height: asset.fields.file.details.image!.height,
            price: asset.fields.description,
            tags: asset.metadata.tags
        }));
};

type QueryFnType = typeof getPictures;

type UsePicturesOptions = {
    query: string[];
    config?: QueryConfig<QueryFnType>;
};

export const usePictures = ({ query, config }: UsePicturesOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['pictures', query],
        queryFn: () => getPictures(query),
        ...config
    });
};

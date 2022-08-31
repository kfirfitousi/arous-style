import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

type Picture = {
    id: string;
    url: string;
    title: string;
    width: number;
    height: number;
    price: string;
    tags: TagLink[];
};

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/contentful';
import { TagLink } from 'contentful';

export const getPictures = async (filter: string): Promise<Picture[]> => {
    const assets = await client.getAssets();

    return assets.items
        .filter((item) => !filter || item.metadata.tags.some((tag) => tag.sys.id === filter))
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
    filter: string;
    config?: QueryConfig<QueryFnType>;
};

export const usePictures = ({ filter, config }: UsePicturesOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['pictures', filter],
        queryFn: () => getPictures(filter),
        ...config
    });
};

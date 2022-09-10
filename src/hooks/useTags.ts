import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { useQuery } from '@tanstack/react-query';
import { contentfulClient } from '@/lib/contentful';

type Tag = {
    id: string;
    name: string;
};

export const getTags = async (): Promise<Tag[]> => {
    const tags = await contentfulClient.getTags();

    return tags.items.map((tag) => ({
        id: tag.sys.id,
        name: tag.name
    }));
};

type QueryFnType = typeof getTags;

type UseTagsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useTags = ({ config }: UseTagsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        staleTime: 24 * 60 * 60 * 1000,
        queryKey: ['tags'],
        queryFn: getTags,
        ...config
    });
};

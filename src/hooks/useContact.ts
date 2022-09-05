// import type { RoundResult, SubmitResponse } from '../types';
import type { ContactFormResponse, Product } from '@/types';
import type { MutationConfig } from '@/lib/react-query';

import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';

type SubmitParams = {
    name: string;
    phone: string;
    message?: string;
    product: Product;
};

export const sendMessage = (data: SubmitParams) => {
    return axios.post('/api/contact', {
        ...data
    });
};

type UseContactOptions = {
    config?: MutationConfig<typeof sendMessage>;
};

export const useContact = ({ config }: UseContactOptions = {}) => {
    return useMutation({
        mutationFn: sendMessage,
        ...config
    });
};

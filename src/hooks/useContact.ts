import type { ContactFormFields, ContactResponse } from '@/types';
import type { MutationConfig } from '@/lib/react-query';

import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';

export const sendMessage = (data: ContactFormFields): Promise<ContactResponse> => {
    return axios.post('/api/contact', data);
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

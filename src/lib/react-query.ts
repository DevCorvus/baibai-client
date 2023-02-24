import { MutationCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message, {
          position: 'bottom-left',
        });
      }
    },
  }),
});

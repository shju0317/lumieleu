import pb from '@/api/pocketbase';
import { useQuery } from '@tanstack/react-query';

function useOrderedProduct() {
  // const userInfo = pb.authStore.model;
  const userId = 'dmadsf8349efnev';

  async function fetchOrderedProduct() {
    const order = await pb.collection('orders').getFullList({
      filter: `orderer = '${userId}'`,
      expand: 'product',
      // sort: '-date'
    });

    return order;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrderedProduct,
  });

  return { data, isLoading, error };
}

export default useOrderedProduct
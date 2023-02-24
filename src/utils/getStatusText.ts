import { ProductStatus } from '../interfaces/product';

export function getStatusText(status: ProductStatus): string {
  switch (status) {
    case 'new':
      return 'New';
    case 'like-new':
      return 'Like new';
    case 'refurbished':
      return 'Refurbished';
    case 'secondhand':
      return 'Secondhand';
    default:
      return 'Unknown';
  }
}

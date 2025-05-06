import ProductDetailPage from '@/components/pages/ProductDetailPage';
import ProductModel from '@/db/models/ProductModel';
import { ProductType } from '@/types/types';

const ProductById = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const getProductById = await ProductModel.findById(id);
  const data: ProductType = getProductById as ProductType;
  if (!getProductById) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center"></div>
        <p className="text-4xl font-bold text-gray-800">404</p>
        <h1 className="text-2xl font-semibold text-gray-600 mt-2">Product not found</h1>
      </div>
    );
  }
  return (
    <>
      <ProductDetailPage product={data} />
    </>
  );
};

export default ProductById;

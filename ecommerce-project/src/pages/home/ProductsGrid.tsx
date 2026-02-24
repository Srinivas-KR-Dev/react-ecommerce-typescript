import Product from './Product';
import type { Product as ProductType } from '../../types/product';

type ProductsGridProps = {
    products: ProductType[];
};

function ProductsGrid({ products }: ProductsGridProps) {
    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    <Product key={product.id} product={product} />
                );
            })}
        </div>
    );
}

export default ProductsGrid;
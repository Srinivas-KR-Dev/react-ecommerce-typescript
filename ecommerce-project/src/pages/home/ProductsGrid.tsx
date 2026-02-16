import Product from './Product';
import type { LoadCart } from '../../types/cart';
import type { Product as ProductType } from '../../types/product';

type ProductsGridProps = {
    products: ProductType[];
    loadCart: LoadCart;
};

function ProductsGrid({ products, loadCart }: ProductsGridProps) {

    return (
        <div className="products-grid">

            {products.map((product) => {
                return (
                    <Product key={product.id} product={product} loadCart={loadCart} />
                );
            })}
        </div>
    );
}

export default ProductsGrid;
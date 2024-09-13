import HomeBlog from '../features/home/HomeBlog';
import HomeIntro from '../features/home/HomeIntro';
import HomeBanner from '../features/home/HomeBanner';
import HomeStoreLocation from '../features/home/HomeStoreLocation';
import { ProductSlider } from '../features/product/ProductSlider';
import { useBestSellerProducts } from '../features/product/useBestSellerProducts';
import { useBigSalesProducts } from '../features/product/useBigSalesProducts';
import Error from '../ui/Error';
import Loading from '../ui/Loading';
import SyncLoader from 'react-spinners/SyncLoader';

function Home() {
    const {
        data: bestsellers,
        isLoading: isLoadingBestSellers,
        error: errorBestSellers,
    } = useBestSellerProducts();
    const {
        data: bigsales,
        isLoading: isLoadingBigSales,
        error: errorBigSales,
    } = useBigSalesProducts();

    if (errorBestSellers || errorBigSales)
        return (
            <div>
                {errorBestSellers && (
                    <Error>Error: {errorBestSellers?.message}</Error>
                )}
                {errorBigSales && (
                    <Error>Error: {errorBigSales?.message}</Error>
                )}
            </div>
        );

    return (
        <div>
            <HomeBanner />
            <div>
                <HomeIntro />
                {isLoadingBestSellers ? (
                    <Loading>
                        <SyncLoader color='var(--color-grey-600)' />
                    </Loading>
                ) : (
                    <ProductSlider>
                        <ProductSlider.Title>
                            Best seller - Most favorite products
                        </ProductSlider.Title>
                        <ProductSlider.Products products={bestsellers} />
                    </ProductSlider>
                )}
                {isLoadingBigSales ? (
                    <Loading>
                        <SyncLoader color='var(--color-grey-600)' />
                    </Loading>
                ) : (
                    <ProductSlider>
                        <ProductSlider.Title>Big Sales</ProductSlider.Title>
                        <ProductSlider.Products products={bigsales} />
                    </ProductSlider>
                )}

                <HomeBlog />
                <HomeStoreLocation />
            </div>
        </div>
    );
}

export default Home;

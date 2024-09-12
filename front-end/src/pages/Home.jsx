import HomeBlog from '../features/home/HomeBlog';
import HomeIntro from '../features/home/HomeIntro';
import HomeBanner from '../features/home/HomeBanner';
import HomeStoreLocation from '../features/home/HomeStoreLocation';
import { ProductSlider } from '../features/product/ProductSlider';
import { data } from '../features/product/glassesData';

function Home() {
    return (
        <div>
            <HomeBanner />
            <div>
                <HomeIntro />
                <ProductSlider>
                    <ProductSlider.Title>
                        Best seller - Most favorite products
                    </ProductSlider.Title>
                    <ProductSlider.Products products={data} />
                </ProductSlider>
                <ProductSlider>
                    <ProductSlider.Title>Limited Sales</ProductSlider.Title>
                    <ProductSlider.Products products={data} />
                </ProductSlider>
                <HomeBlog />
                <HomeStoreLocation />
            </div>
        </div>
    );
}

export default Home;

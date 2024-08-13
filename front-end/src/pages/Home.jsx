import HomeBlog from '../features/home/HomeBlog';
import HomeIntro from '../features/home/HomeIntro';
import HomeBanner from '../features/home/HomeBanner';
import HomeStoreLocation from '../features/home/HomeStoreLocation';

function Home() {
    return (
        <div>
            <HomeBanner />
            <div className='container'>
                <HomeIntro />
                <HomeStoreLocation />
                <HomeBlog />
            </div>
        </div>
    );
}

export default Home;

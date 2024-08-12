import HomeBlog from '../features/home/HomeBlog';
import HomeIntro from '../features/home/HomeIntro';
import HomeBanner from '../features/home/HomeBanner';

function Home() {
    return (
        <div>
            <HomeBanner />
            <div className='container'>
                <HomeIntro />
                <HomeBlog />
            </div>
        </div>
    );
}

export default Home;

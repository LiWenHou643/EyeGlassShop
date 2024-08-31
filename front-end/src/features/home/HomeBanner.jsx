import Carousels from '../../ui/Carousels';

const hotPosts = ['carousel1.jpg', 'carousel2.jpg', 'carousel3.png'];
function HomeBanner() {
    return (
        <div>
            <Carousels id='hotpost' isBanner data={hotPosts} />
        </div>
    );
}

export default HomeBanner;

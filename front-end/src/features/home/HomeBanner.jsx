import Carousels from './Carousels';

const images = ['carousel1.jpg', 'carousel2.jpg', 'carousel3.png'];

function HomeBanner() {
    return (
        <div>
            <div className='d-none d-md-block'>
                <Carousels ratio='5/2' data={images} />
            </div>
            <div className='text-center d-block d-md-none mt-5'>
                <h1 className='fw-bolder text-uppercase'>
                    Welcome to eye - hero
                </h1>
            </div>
        </div>
    );
}

export default HomeBanner;

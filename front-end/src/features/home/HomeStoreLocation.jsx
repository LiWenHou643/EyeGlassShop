import styled from 'styled-components';
import ImgContainer from '../../ui/ImageContainer';
import Section from '../../ui/Section';
import { HiArrowRight } from 'react-icons/hi2';

const Background = styled.div`
    background-image: url('home-bg-banner.jpg');
`;
function HomeStoreLocation() {
    return (
        <Section className='p-section'>
            <Background>
                <div className='row'>
                    <div className='col-12 col-md-7'>
                        <ImgContainer>
                            <img src='he_thong_cua_hang.jpg' alt='store' />
                        </ImgContainer>
                    </div>

                    <div className='col-12 col-md-5 p-5 my-5 d-flex flex-column justify-content-between gap-5'>
                        <h1 className='fw-bold'>EYEHERO GLASS SHOP SYSTEM</h1>
                        <p>
                            EYEHERO Eyewear system with 38+ branches nationwide,
                            concentrated mostly in large provinces and cities
                            such as: City. Ho Chi Minh, City. Hanoi, City. Da
                            Nang, City. Can Tho and many other provinces.
                        </p>

                        <button className='btn btn-dark text-uppercase fw-bold py-4'>
                            <h3>
                                Discovery now <HiArrowRight />
                            </h3>
                        </button>
                    </div>
                </div>
            </Background>
        </Section>
    );
}

export default HomeStoreLocation;

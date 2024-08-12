import styled from 'styled-components';
import { HiOutlineEye } from 'react-icons/hi2';
import { HiOutlineRefresh } from 'react-icons/hi';
import { HiOutlineReply } from 'react-icons/hi';
import { MdOutlineCleanHands } from 'react-icons/md';

const IntroContainer = styled.section`
    margin-top: 60px;

    @media (max-width: 576px) {
        margin: 80px;
    }

    @media (max-width: 480px) {
        margin: 30px;
    }

    @media (max-width: 400px) {
        margin-left: 0px;
        margin-right: 0px;
    }
`;

const IntroIcon = styled.div`
    height: 50px;
    width: 50px;
    margin-right: 10px;

    svg {
        font-size: 50px;
    }
`;

function HomeIntro() {
    return (
        <IntroContainer>
            <div className='row justify-content-between flex-wrap'>
                <div className='d-flex align-items-center col-12 col-sm-6 col-md-3'>
                    <IntroIcon>
                        <MdOutlineCleanHands />
                    </IntroIcon>
                    <div>
                        <h2 className='fw-bold mb-4'>Welcome to our blog!</h2>
                        <h3>at the entire Eye Hero eyewear system</h3>
                    </div>
                </div>

                <div className='d-flex align-items-center col-12 col-sm-6 col-md-3'>
                    <IntroIcon>
                        <HiOutlineReply />
                    </IntroIcon>
                    <div>
                        <h2 className='fw-bold mb-4'>Exchange Return</h2>
                        <h3>within 7 days</h3>
                    </div>
                </div>

                <div className='d-flex align-items-center col-12 col-sm-6 col-md-3'>
                    <IntroIcon>
                        <HiOutlineRefresh />
                    </IntroIcon>
                    <div>
                        <h2 className='fw-bold mb-4'>Old Autumn Renewed</h2>
                        <h3>Subsidy up to 600,000 VND</h3>
                    </div>
                </div>

                <div className='d-flex align-items-center col-12 col-sm-6 col-md-3'>
                    <IntroIcon>
                        <HiOutlineEye />
                    </IntroIcon>
                    <div>
                        <h2 className='fw-bold mb-4'>
                            Eye Measurement Support
                        </h2>
                        <h3>at the entire Eye Hero eyewear system</h3>
                    </div>
                </div>
            </div>
        </IntroContainer>
    );
}

export default HomeIntro;

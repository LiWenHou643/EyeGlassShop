import styled from 'styled-components';
import {
    HiOutlineShieldCheck,
    HiOutlineTruck,
    HiOutlineUserGroup,
} from 'react-icons/hi2';
import { HiOutlineRefresh } from 'react-icons/hi';

const IntroContainer = styled.section`
    margin-top: 60px;
    background-color: var(--color-grey-0);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    h3 {
        font-size: 1.6rem;
    }
    h4 {
        font-size: 1.4rem;
    }

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
        font-size: 35px;
    }
`;

const IntroItem = styled.div`
    @media (min-width: 769px) {
        &:not(:last-child) {
            border-right: 1px solid var(--color-grey-200);
        }
    }
`;
function HomeIntro() {
    return (
        <IntroContainer className='row justify-content-between flex-wrap p-5 gap-5 gap-sm-0'>
            <IntroItem className='text-center col-12 col-sm-6 col-md-3 my-sm-4'>
                <IntroIcon className='w-100 text-center'>
                    <HiOutlineTruck />
                </IntroIcon>
                <h3 className='fw-semibold'>Free Delivery</h3>
                <h4 className='text-secondary'>Free Shipping on all order</h4>
            </IntroItem>

            <IntroItem className='text-center col-12 col-sm-6 col-md-3 my-sm-4'>
                <IntroIcon className='w-100 text-center'>
                    <HiOutlineRefresh />
                </IntroIcon>
                <h3 className='fw-semibold'>Return Policy</h3>
                <h4 className='text-secondary'>30-day Money Back Guarantee</h4>
            </IntroItem>

            <IntroItem className='text-center col-12 col-sm-6 col-md-3 my-sm-4'>
                <IntroIcon className='w-100 text-center'>
                    <HiOutlineUserGroup />
                </IntroIcon>
                <h3 className='fw-semibold'>24/7 Support</h3>
                <h4 className='text-secondary'>Customer Support Friendly</h4>
            </IntroItem>

            <IntroItem className='text-center col-12 col-sm-6 col-md-3 my-sm-4'>
                <IntroIcon className='w-100 text-center'>
                    <HiOutlineShieldCheck />
                </IntroIcon>
                <h3 className='fw-semibold'>Secure Payment</h3>
                <h4 className='text-secondary'>100% Secure Payment</h4>
            </IntroItem>
        </IntroContainer>
    );
}

export default HomeIntro;

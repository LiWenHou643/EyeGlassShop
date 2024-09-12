import styled from 'styled-components';
import ImageContainer from '../ui/ImageContainer';
import NumberInput from '../ui/NumberInput';
import Button from '../ui/Button';
import { useState } from 'react';
import { HiOutlineArrowRight, HiOutlineTrash } from 'react-icons/hi2';

const StyledContainer = styled.div`
    margin-top: 200px;

    @media (max-width: 1023px) {
        margin-top: 40px;
    }
    @media (min-width: 1200px) {
        padding: 0rem;
    }
    @media (min-width: 1400px) {
        padding: 0 4rem;
    }

    > div {
        position: relative;
        overflow: hidden;
        border-radius: 4rem;
        &::before {
            content: '';
            position: absolute;
            inset: 0;
            background: var(--color-grey-100);
            opacity: 0.6;
            z-index: 1;
        }
        & > * {
            position: relative;
            z-index: 2;
        }
    }
`;

function Cart() {
    const [numberValue, setNumberValue] = useState(1);

    const handleValueChange = (newValue) => {
        setNumberValue(newValue);
    };

    return (
        <StyledContainer>
            <div className='row mx-0 pt-4 pb-5 px-5'>
                <div className='col-12 col-xl-9'>
                    <table className='table '>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Image</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Unit Price</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Subtotal</th>
                                <th scope='col'>Discount</th>
                                <th scope='col'>Total</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope='row'>1</th>
                                <td>
                                    <ImageContainer>
                                        <img
                                            src='https://via.placeholder.com/150'
                                            alt='product'
                                        />
                                    </ImageContainer>
                                </td>
                                <td>
                                    <p className='text-center'>Product Name</p>
                                </td>
                                <td>
                                    <p className='text-center'>100.000d</p>
                                </td>
                                <td>
                                    <NumberInput onChange={handleValueChange} />
                                </td>
                                <td>
                                    <p className='text-center'>100.000d</p>
                                </td>
                                <td>
                                    <p className='text-center'>10%</p>
                                </td>
                                <td>
                                    <p className='text-center'>90.000d</p>
                                </td>
                                <td>
                                    <Button
                                        $variation='danger'
                                        className='px-3'
                                    >
                                        <HiOutlineTrash className='text-light fs-2' />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-12 col-xl-3 ps-5'>
                    <div className='text-end text-xl-start py-4 ps-5'>
                        <h1>Order Summary</h1>
                        <h4>Subtotal: $100</h4>
                        <h4>Shipping: $10</h4>
                        <h4>Total: $110</h4>
                        <div className='d-flex justify-content-end justify-content-xl-start'>
                            <Button className='fs-3 d-flex align-items-center justify-content-center'>
                                Checkout
                                <HiOutlineArrowRight className='ms-2' />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
}

export default Cart;

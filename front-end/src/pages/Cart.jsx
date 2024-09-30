import styled from 'styled-components';
import ImageContainer from '../ui/ImageContainer';
import NumberInput from '../ui/NumberInput';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import EmptyData from '../ui/EmptyData';
import { HiOutlineArrowRight, HiOutlineTrash } from 'react-icons/hi2';
import { useCart } from '../features/cart/useCart';
import { useState } from 'react';
import { RingLoader } from 'react-spinners';

const StyledContainer = styled.div`
    @media (min-width: 1200px) {
        padding: 0rem;
    }
    @media (min-width: 1400px) {
        padding: 0 4rem;
    }

    // > div {
    //     border-radius: 4rem;
    //     position: relative;
    //     overflow: hidden;
    //     &::before {
    //         content: '';
    //         position: absolute;
    //         inset: 0;
    //         background: var(--color-grey-100);
    //         opacity: 0.6;
    //         z-index: 1;
    //     }
    //     & > * {
    //         position: relative;
    //         z-index: 2;
    //     }
    // }
`;

const Li = styled.li`
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
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
`;
function Cart() {
    const [numberValue, setNumberValue] = useState(1);

    const handleValueChange = (newValue) => {
        setNumberValue(newValue);
    };

    const { isLoading, isFetching, data, count, error } = useCart();

    if (isLoading || isFetching)
        return (
            <Loading>
                <RingLoader color='blue' />
            </Loading>
        );
    if (error) return <Error>Error: {error.message}</Error>;
    if (!isFetching && count === 0)
        return <EmptyData resourceName={'products'} />;

    return (
        <StyledContainer>
            <div className='p-5'>
                <div className='form-check form-check-inline mb-4 fs-2'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        id='inlineCheckbox1'
                        value='option1'
                    />
                    <label
                        className='form-check-label'
                        htmlFor='inlineCheckbox1'
                    >
                        Select all
                    </label>
                </div>
                <ul>
                    {data &&
                        data.map((item) => (
                            <Li
                                key={item.id}
                                className='row justify-content-between align-items-center'
                            >
                                <div className='col-1'>
                                    <input
                                        className='form-check-input'
                                        type='checkbox'
                                        id='inlineCheckbox1'
                                        value='option1'
                                    />
                                </div>
                                <div className='col-2'>
                                    <ImageContainer $fit='contain' $ratio='5/3'>
                                        <img src={item.image} alt={item.name} />
                                    </ImageContainer>
                                </div>
                                <div className='col-9 d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    <p>{item.price}</p>
                                    <NumberInput
                                        value={numberValue}
                                        onChange={handleValueChange}
                                    />
                                    <Button $variation='success'>
                                        <HiOutlineArrowRight />
                                    </Button>
                                    <Button $variation='danger'>
                                        <HiOutlineTrash />
                                    </Button>
                                </div>
                            </Li>
                        ))}
                </ul>
            </div>
        </StyledContainer>
    );
}

export default Cart;

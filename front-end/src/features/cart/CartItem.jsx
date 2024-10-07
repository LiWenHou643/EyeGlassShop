import styled from 'styled-components';
import ImageContainer from '../../ui/ImageContainer';
import NumberInput from '../../ui/NumberInput';
import Button from '../../ui/Button';
import { HiOutlineArrowRight, HiOutlineTrash } from 'react-icons/hi2';
import { formatPrice } from '../../utils/helperFunction';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

function CartItem({ item }) {
    const axios = useAxiosPrivate();
    const handleQuantityChange = async (newQuantity) => {
        try {
            await axios.put(`/user/cart/add/${item.id}`, {
                quantity: newQuantity,
            });
            // Optionally refresh cart or show a success message
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Optionally revert the UI if needed
        }
    };

    return (
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
            <div className='col-9'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                    <NumberInput
                        initialValue={item.quantity}
                        onChange={handleQuantityChange}
                    />
                    <div className='d-flex gap-2'>
                        <Button $variation='success'>
                            <HiOutlineArrowRight />
                        </Button>
                        <Button $variation='danger'>
                            <HiOutlineTrash />
                        </Button>
                    </div>
                </div>
                <hr />
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='col-5'>
                        Price unit: {formatPrice(item.priceAtTime)} VND
                    </p>
                    <p className='col-3'>Discount: {item.discount}%</p>
                    <p className='col-4'>
                        Total: {formatPrice(item.totalPrice)} VND
                    </p>
                </div>
            </div>
        </Li>
    );
}

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

export default CartItem;

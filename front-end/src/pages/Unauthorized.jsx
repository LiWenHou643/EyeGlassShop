import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className='d-flex justify-content-center flex-column align-items-center'>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <br />
            <div className='flexGrow'>
                <Button onClick={goBack}>Go Back</Button>
            </div>
        </section>
    );
};

export default Unauthorized;

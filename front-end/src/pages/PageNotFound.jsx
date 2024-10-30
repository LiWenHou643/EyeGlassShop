const PageNotFound = () => {
    return (
        <div className='container text-center vh-50'>
            <h1 className='display-1 text-danger'>404</h1>
            <h2>Oops! The page you are looking for does not exist.</h2>
            <a href='/' className='btn btn-primary'>
                Go back to Home
            </a>
        </div>
    );
};

export default PageNotFound;

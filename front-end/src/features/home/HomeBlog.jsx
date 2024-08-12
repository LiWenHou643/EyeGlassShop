import styled from 'styled-components';
import BlogPosts from './BlogPosts';
import HotPost from './HotPost';

const Row = styled.div`
    margin-top: 50px;
`;
function HomeBlog() {
    return (
        <section className='row'>
            <Row className='col-12 col-md-6'>
                <HotPost />
            </Row>
            <Row className='col-12 col-md-6'>
                <BlogPosts />
            </Row>
        </section>
    );
}

export default HomeBlog;

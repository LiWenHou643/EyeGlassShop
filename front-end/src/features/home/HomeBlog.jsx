import styled from 'styled-components';
import BlogPosts from './BlogPosts';
import HotPost from './HotPost';
import Section from '../../ui/Section';

const Row = styled.div`
    margin-top: 50px;
`;
function HomeBlog() {
    return (
        <Section className='row'>
            <Row className='col-12 col-md-6'>
                <HotPost />
            </Row>
            <Row className='col-12 col-md-6'>
                <BlogPosts />
            </Row>
        </Section>
    );
}

export default HomeBlog;

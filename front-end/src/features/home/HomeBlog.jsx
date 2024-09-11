import BlogPosts from './BlogPosts';
import HotPost from './HotPost';
import Section from '../../ui/Section';

function HomeBlog() {
    return (
        <Section className='row justify-content-between'>
            <div className='col-12 col-lg-6'>
                <HotPost />
            </div>
            <div className='col-12 col-lg-5'>
                <BlogPosts />
            </div>
        </Section>
    );
}

export default HomeBlog;

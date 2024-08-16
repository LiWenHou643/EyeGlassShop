import BlogPosts from './BlogPosts';
import HotPost from './HotPost';
import Section from '../../ui/Section';

function HomeBlog() {
    return (
        <Section className='row'>
            <div className='col-12 col-md-6 py-5'>
                <HotPost />
            </div>
            <div className='col-12 col-md-6 py-5'>
                <BlogPosts />
            </div>
        </Section>
    );
}

export default HomeBlog;

import React from 'react';
import styled from 'styled-components';
import ImageContainer from '../../ui/ImageContainer';
import { Link } from 'react-router-dom';
import { calDateAgo } from '../../utils/helperFunction';
import { formatDate } from '../../utils/helperFunction';
const dummyData = [
    {
        id: 1,
        title: 'Opening and recruitment',
        content:
            'Eye Hero open new branch in the Can Tho city. Eye Hero also employ new staffs to serve the customers.',
        postedDate: '2024-8-8',
        img: 'postImage/opening.jpg',
    },
    {
        id: 2,
        title: 'Promotions and gifts',
        content:
            'Eye Hero has promotions for customers who buy glasses and contact lenses. Eye Hero also give gifts to customers who buy glasses and contact lenses.',
        postedDate: '2024-7-30',
        img: 'postImage/voucher.jpg',
    },
    {
        id: 3,
        title: 'Opening and recruitment',
        content:
            'Eye Hero open new branch in the Can Tho city. Eye Hero also employ new staffs to serve the customers.',
        postedDate: '2024-7-1',
        img: 'postImage/glasses.png',
    },
];

const StyledLink = styled(Link)`
    background-color: var(--color-grey-100);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 160px;
`;

const Content = styled.p`
    overflow: hidden;
    width: 100%;
    height: 50px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

function BlogPosts() {
    return (
        <div>
            <h1 className='mb-4'>Blog Posts</h1>

            <div>
                {dummyData.map((post) => (
                    <StyledLink
                        key={post.id}
                        href='#'
                        className='d-flex rounded-3 mb-4'
                        aria-current='true'
                    >
                        <div className='col-5'>
                            <ImageContainer $ratio='3/2'>
                                <img src={post.img} alt={post.title} />
                            </ImageContainer>
                        </div>
                        <div className='col-7 p-4 d-flex flex-column justify-content-between'>
                            <h3 className='fw-bold'>{post.title}</h3>
                            <Content>{post.content}</Content>
                            <div className='d-flex justify-content-between'>
                                <small>{formatDate(post.postedDate)}</small>
                                <small>
                                    {calDateAgo(post.postedDate) === 0
                                        ? 'Today'
                                        : calDateAgo(post.postedDate) === 1
                                        ? 'Yesterday'
                                        : `${calDateAgo(
                                              post.postedDate
                                          )} days ago`}
                                </small>
                            </div>
                        </div>
                    </StyledLink>
                ))}
            </div>
        </div>
    );
}

export default BlogPosts;

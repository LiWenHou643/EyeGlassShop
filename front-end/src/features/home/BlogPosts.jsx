import React from 'react';
import { Link } from 'react-router-dom';
import { calDateAgo } from '../../utils/helperFunction';
import styled from 'styled-components';

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

const ImgContainer = styled.div`
    height: 100%;
    aspect-ratio: 1;
    flex-shrink: 0;
`;

const Img = styled.img`
    height: 100%;
    object-fit: cover;
`;

const Content = styled.p`
    overflow: hidden;
    width: 100%;
    height: 50px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

function BlogPosts() {
    return (
        <div>
            <h1 className='mb-4'>Blog Posts</h1>

            <div className='d-flex flex-wrap gap-4'>
                {dummyData.map((post) => (
                    <StyledLink
                        key={post.id}
                        href='#'
                        className='d-flex rounded-3'
                        aria-current='true'
                    >
                        <ImgContainer>
                            <Img
                                className='rounded-start'
                                src={post.img}
                                alt={post.title}
                            />
                        </ImgContainer>
                        <div className='d-flex flex-column justify-content-between p-5 p-lg-3 p-xl-5'>
                            <div className='d-flex justify-content-between'>
                                <h3 className='mb-3 fw-bold'>{post.title}</h3>
                                <small>
                                    {calDateAgo(post.postedDate) === 0
                                        ? 'Today'
                                        : `${calDateAgo(
                                              post.postedDate
                                          )} days ago`}
                                </small>
                            </div>
                            <Content>{post.content}</Content>
                            <small>Posted date: {post.postedDate}</small>
                        </div>
                    </StyledLink>
                ))}
            </div>
        </div>
    );
}

export default BlogPosts;

import React from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    background: var(--color-footer);
    color: var(--color-grey-900);
    margin-top: 10rem;
    border-top: 2px solid var(--color-grey-800);
`;

const P = styled.p`
    color: var(--color-grey-600);
    font-size: 1.6rem;
`;

const Button = styled.button`
    background-color: var(--color-grey-200);
    color: var(--color-grey-900);
    border: none;
    padding: 1rem 2rem;
    border-radius: 1rem;
    font-size: 1.8rem;

    &:hover {
        background-color: var(--color-grey-300);
    }

    transition: background-color 0.5s;
`;

const ImgContainer = styled.div`
    background-color: var(--color-const-grey-100);
    overflow: hidden;
    width: 130px;
    height: 40px;
    border-radius: 0.5rem;
    padding: 0.4rem;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

const ImgLink = styled.a`
    width: 70px;
    height: 70px;
    cursor: pointer;
    i {
        display: block;
        width: 100%;
        height: 100%;
        background: ${(props) => `url(${props.$src})} no-repeat center center`};
        background-size: contain;
        &:hover {
            scale: 1.1;
        }
    }
`;

const ALink = styled.a`
    text-transform: capitalize;
    color: var(--color-grey-600);

    &:hover {
        color: var(--color-grey-900);
    }
`;

const Footer = () => (
    <StyledFooter className='page-footer font-small blue'>
        <div className='container py-md-5'>
            <div className='mb-md-5 pt-4 mt-4 container-fluid text-center text-md-start'>
                <div className='row'>
                    <div className='col-md-4 mt-md-0 mt-3'>
                        <h2 className='text-uppercase mb-4'>Your Opinion</h2>
                        <P>
                            We always appreciate your feedback. Please let us
                            know
                        </P>
                        <br />
                        <Button>Fill this form</Button>
                    </div>

                    <hr className='clearfix w-100 d-md-none pb-0 my-4' />

                    <div className='col-md-3 offset-md-1 mt-md-0 mt-3'>
                        <h2 className='text-uppercase'>Hot line</h2>
                        <P>0939 999 999</P>
                        <P>(9:00 - 22:00)</P>
                        <br />
                        <h2 className='text-uppercase'>Email</h2>
                        <P>eyehero@gmail.com</P>
                    </div>

                    <hr className='clearfix w-100 d-md-none pb-0 my-4' />

                    <div className='col-md-3 offset-md-1 mb-md-0 mb-3'>
                        <div className='d-flex justify-content-center justify-content-md-start flex-wrap gap-3'>
                            <ImgLink to='#' $src='/fb.svg'>
                                <i />
                            </ImgLink>
                            <ImgLink to='#' $src='/instagram.svg'>
                                <i />
                            </ImgLink>
                            <ImgLink to='#' $src='/tiktok.svg'>
                                <i />
                            </ImgLink>
                            <ImgLink to='#' $src='/zalo.svg'>
                                <i />
                            </ImgLink>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className='mt-md-5 pb-4 mb-4 container-fluid text-center text-md-start'>
                <div className='row'>
                    <div className='col-md-3 mt-md-0 mt-3'>
                        <h2 className='text-uppercase mb-4'>Introduce</h2>
                        <P>
                            We are the best eye glasses shop in Viet Nam. We
                            have all types of fashion glasses for you to choose
                            from eyeglass to sunglasses or only eyeframe.
                        </P>
                    </div>
                    <hr className='clearfix w-100 d-md-none pb-0 my-4' />

                    <div className='col-md-3 mt-md-0 mt-3'>
                        <h2 className='text-uppercase mb-4'>Policies</h2>
                        <ul>
                            <li>
                                <ALink href=''>
                                    <HiOutlinePaperAirplane />
                                    <span className='ms-3'>
                                        Insurance Policy
                                    </span>
                                </ALink>
                            </li>
                            <li>
                                <ALink href=''>
                                    <HiOutlinePaperAirplane />
                                    <span className='ms-3'>
                                        Shipping and Inspection Policy
                                    </span>
                                </ALink>
                            </li>
                            <li>
                                <ALink href=''>
                                    <HiOutlinePaperAirplane />
                                    <span className='ms-3'>Payment Policy</span>
                                </ALink>
                            </li>
                            <li>
                                <ALink href=''>
                                    <HiOutlinePaperAirplane />
                                    <span className='ms-3'>
                                        Warranty Policy
                                    </span>
                                </ALink>
                            </li>
                        </ul>
                    </div>

                    <hr className='clearfix w-100 d-md-none pb-0 my-4' />

                    <div className='col-md-3 mb-md-0 mb-3'>
                        <h2 className='text-uppercase mb-4'>Contacts</h2>
                        <ul className='list-unstyled'>
                            <li>
                                <P href='#!'>
                                    <strong>Address: </strong>Mau Than, Ninh
                                    Kieu, Can Tho, Viet Nam
                                </P>
                            </li>
                            <li>
                                <P href='#!'>
                                    <strong>Hotline: </strong>
                                </P>
                            </li>
                            <li>
                                <P href='#!'>
                                    <strong>Email: </strong>
                                </P>
                            </li>
                        </ul>
                    </div>
                    <hr className='clearfix w-100 d-md-none pb-0 my-4' />

                    <div className='col-md-3 mb-md-0 mb-3'>
                        <h2 className='text-uppercase mb-4'>E-commerce</h2>
                        <div className='d-flex flex-wrap justify-content-center justify-content-md-start gap-4'>
                            <Link>
                                <ImgContainer>
                                    <Img src='/shopee.png' alt='' />
                                </ImgContainer>
                            </Link>
                            <Link>
                                <ImgContainer>
                                    <Img src='/lazada.png' alt='' />
                                </ImgContainer>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='footer-copyright text-center'>
                © 2024 Copyright:
                <a href='https://eyeghero@gmail.com/'> Eye Hero Corp</a>
            </div>
        </div>
    </StyledFooter>
);

export default Footer;

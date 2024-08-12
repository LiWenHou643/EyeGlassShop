import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    background-color: var(--color-grey-800);
    color: var(--color-grey-100);
`;
const StyledRow = styled.div``;

const P = styled.p`
    color: var(--color-grey-400);
    font-size: 1.6rem;
`;

const Button = styled.button`
    color: var(--color-grey-800);
    border: none;
    padding: 1rem 2rem;
    border-radius: 1rem;
    font-size: 1.8rem;

    &:hover {
        background-color: var(--color-green-600);
    }

    transition: background-color 0.5s;
`;

const ImgContainer = styled.div`
    background-color: var(--color-grey-100);
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

const Footer = () => (
    <StyledFooter className='page-footer font-small blue pt-4 mt-5'>
        <div className='container py-5'>
            <StyledRow className='mb-md-5 pt-4 mt-4 container-fluid text-center text-md-start'>
                <div className='row'>
                    <div className='col-md-4 mt-md-0 mt-3'>
                        <h2 className='text-uppercase mb-4'>Your Opinion</h2>
                        <p>
                            We always appreciate your feedback. Please let us
                            know
                        </p>
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
                        <h2 className='text-uppercase mb-4'>Links</h2>
                        <ul className='list-unstyled'>
                            <li>
                                <P href='#!'>Link 1</P>
                            </li>
                            <li>
                                <P href='#!'>Link 2</P>
                            </li>
                            <li>
                                <P href='#!'>Link 3</P>
                            </li>
                            <li>
                                <P href='#!'>Link 4</P>
                            </li>
                        </ul>
                    </div>
                </div>
            </StyledRow>

            <hr />

            <StyledRow className='mt-md-5 pb-4 mb-4 container-fluid text-center text-md-start'>
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
                        <P>
                            1 year warranty commitment with 1 for 1 return.
                            Daily promotion with many attractive gifts.
                        </P>
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
                                    <Img src='shopee.png' alt='' />
                                </ImgContainer>
                            </Link>
                            <Link>
                                <ImgContainer>
                                    <Img src='lazada.png' alt='' />
                                </ImgContainer>
                            </Link>
                        </div>
                    </div>
                </div>
            </StyledRow>

            <StyledRow className='footer-copyright text-center'>
                © 2024 Copyright:
                <a href='https://eyeghero@gmail.com/'> Eye Hero Corp</a>
            </StyledRow>
        </div>
    </StyledFooter>
);

export default Footer;

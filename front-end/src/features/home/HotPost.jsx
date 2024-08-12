import Carousels from '../../ui/Carousels';
import styled from 'styled-components';

const hotPosts = [
    {
        id: 1,
        title: 'What is the best distance from the eyes to the screen?',
        img: 'postImage/khoang-cach-tu-mat-den-man-hinh-may-tinh.jpg',
        content:
            'Properly placing your computer screen is the key to protecting your eye health. Sitting in the wrong posture or at an inappropriate distance can lead to many problems such as eye strain, blurred vision, and headaches.',
        postedDate: '2024-08-01',
    },
    {
        id: 2,
        title: 'Why do old people have to wear glasses? When do you need to wear glasses?',
        img: 'postImage/tai-sao-nguoi-gia-phai-deo-kinh-lao.jpg',
        content:
            'Blurred vision when seeing up close is a common problem in the elderly. The main cause is presbyopia - a phenomenon in which the eyes gradually lose their ability to adjust, leading to difficulties in focusing on close objects.',
        postedDate: '2024-7-10',
    },
    {
        id: 3,
        title: 'The correct distance from the eyes to the notebook helps protect eyesight',
        img: 'postImage/khoang-cach-tu-mat-den-sach.jpg',
        content:
            'Eye health is extremely important, especially for students. Sitting in the correct posture to study, especially keeping the distance between the eyes and the notebook is appropriate, will help protect your eyesight.',
        postedDate: '2024-07-20',
    },
    {
        id: 4,
        title: 'Wearing glasses causes a crease in the bridge of the nose? 5 ways to wear glasses without leaving a mark on your nose',
        img: 'postImage/deo-kinh-bi-han-song-mui.jpg',
        content:
            'Wearing glasses for a long time can cause a crease in the bridge of the nose, which is not only unsightly but also causes discomfort. Here are 5 ways to help you wear glasses without leaving a mark on your nose.',
        postedDate: '2024-07-20',
    },
];

const StyledContainer = styled.div``;

function HotPost() {
    return (
        <StyledContainer>
            <h1>Hot Post</h1>
            <Carousels id='hotpost' data={hotPosts} />
        </StyledContainer>
    );
}

export default HotPost;

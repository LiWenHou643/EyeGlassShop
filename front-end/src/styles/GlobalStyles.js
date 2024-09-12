import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode {
    /* Grey */
    --color-grey-0: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;

    --backdrop-color: rgba(255, 255, 255, 0.1);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
    

    --image-grayscale: 0;
    --image-opacity: 100%;

    --color-header: radial-gradient(circle, rgba(183, 163, 255, 1) 0%, rgba(91, 166, 255, 1) 100%);
    --color-bg: linear-gradient(90deg, rgba(196,255,248,1) 0%, rgba(186,200,255,1) 50%, rgba(186,217,255,1) 100%);
  }
  
  &.dark-mode {
    --color-grey-0: #18212f;
    --color-grey-50: #111827;
    --color-grey-100: #1f2937;
    --color-grey-200: #374151;
    --color-grey-300: #4b5563;
    --color-grey-400: #6b7280;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;

    --backdrop-color: rgba(0, 0, 0, 0.3);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 80%;

    --color-header: radial-gradient(circle, rgba(122,102,193,1) 0%, rgba(55,126,210,1) 100%);
    --color-bg: linear-gradient(90deg, rgba(76,114,161,1) 0%, rgba(94,136,155,1) 30%, rgba(107,114,152,1) 70%, rgba(76,114,161,1) 100%);
    --color-footer: radial-gradient(circle, rgba(20, 30, 30, 1) 0%, rgba(0, 0, 20, 1) 100%);

  }
  
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  --color-red-300: #FF9696;
  --color-pink-100: #fce7f3;
  --color-pink-200: #fbcfe8;
  --color-pink-300: #f9a8d4;
  --color-indigo-300: #a5b4fc;
  --color-indigo-400: #818cf8;
  --color-indigo-500: #6366f1;
  --color-blue-200: #bfdbfe;

  --color-const-grey-0: #fff;
  --color-const-grey-50: #f9fafb;
  --color-const-grey-100: #f3f4f6;
  --color-const-grey-200: #e5e7eb;
  --color-const-grey-300: #d1d5db;
  --color-const-grey-400: #9ca3af;
  --color-const-grey-500: #6b7280;
  --color-const-grey-600: #4b5563;
  --color-const-grey-700: #374151;
  --color-const-grey-800: #1f2937;
  --color-const-grey-900: #111827;

}

*,
*::before,
*::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* Creating animations for dark mode */
    transition: background-color 0.3s, border 0.3s;
}

html {
    font-size: 62.5%;
}

body {
    font-family: 'Poppins', sans-serif;
    color: var(--color-grey-700);
    background: var(--color-bg);
    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
}

input,
button,
textarea,
select {
    font: inherit;
    color: inherit;
}

button {
    cursor: pointer;
}

*:disabled {
    cursor: not-allowed;
}

select:disabled,
input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
}

input:focus-visible {
    outline: none;
    border: none;
}


/* Parent selector, finally 😃 */
button:has(svg) {
    line-height: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

ul {
    list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
    overflow-wrap: break-word;
    hyphens: auto;
}

p {
    text-align: justify;
}

img {
    max-width: 100%;

    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

p,
ol,
ul {
    padding: 0 !important;
    margin: 0 !important;
}

.pagination {
    gap: 0.5rem;
    border-top: 1px solid var(--color-grey-800);
    border-bottom: 1px solid var(--color-grey-800);
    padding: 0.5rem !important;
}

.pagination a{
    display: inline-block;
    width: 4rem;
    text-align: center;
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    transition: 0s;
}

.pagination a:hover {
    background-color: var(--color-grey-0);
}

.pagination li.active a{
    background-color: var(--color-const-grey-100);
    color: var(--color-const-grey-800);

}


/* Custom CSS for dropdown */
.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0;
    /* remove the gap so it doesn't close */
}

/* Custom CSS for repositioning slick arrows */
.slick-prev {
    left: 10px;
    /* Adjust this value to move the left arrow */
    width: 40px;
    /* Optional: adjust width */
    height: 40px;
    /* Optional: adjust height */
    z-index: 1;
    border-radius: 50%;

}

.slick-prev::before,
.slick-next::before {
    z-index: 1;
    color: var(--color-grey-900);
    width: 40px;
    /* Optional: adjust width */

}

.slick-next {
    right: 10px;
    /* Adjust this value to move the right arrow */
    width: 40px;
    /* Optional: adjust width */
    height: 40px;
    /* Optional: adjust height */
    z-index: 1;
    border-radius: 50%;

}

.slick-dots li button:before {
    color: var(--color-grey-900);
    opacity: 0.25;
}

.slick-dots li.slick-active button:before {
    color: var(--color-grey-900);
    opacity: 1;
}

.breadcrumb-item.active {
    color: var(--color-grey-600);
}
`;

export default GlobalStyles;

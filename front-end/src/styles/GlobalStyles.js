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

    /* Sky */
    --color-sky-50: #f0f9ff;
    --color-sky-100: #e0f2fe;
    --color-sky-200: #bae6fd;
    --color-sky-300: #7dd3fc;
    --color-sky-400: #38bdf8;
    --color-sky-500: #0ea5e9;
    --color-sky-600: #0284c7;
    --color-sky-700: #0369a1;
    --color-sky-800: #075985;
    --color-sky-900: #0c4a6e;
    --color-sky-950: #082f49;

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
    --color-bg: linear-gradient(90deg, rgba(76,114,161,1) 0%, rgba(0,56,71,1) 50%, rgba(76,114,161,1) 100%);
    --color-footer: radial-gradient(circle, rgba(20, 30, 30, 1) 0%, rgba(0, 0, 20, 1) 100%);

  }
  
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  --color-red-300: #FF9696;

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

input:focus,
button:focus,
textarea:focus,
select:focus {
    outline: 2px solid var(--color-grey-800);
    outline-offset: -1px;
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

.active>.page-link {
    background-color: var(--color-brand-600);
    border-color: var(--color-brand-600);
}

.pagination {
    gap: 0.6rem;
}

.page-link {
    color: var(--color-grey-700);
    font-size: 1.4rem;
    padding: 0.2rem 1.2rem;
}

.page-link::hover {
    background-color: var(--color-brand-500);
}

.page-link:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
    box-shadow: none;
    background-color: var(--color-grey-0);
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


`;

export default GlobalStyles;

/*
FOR DARK MODE

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

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/

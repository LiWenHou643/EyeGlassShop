export function calDateAgo(givenDate) {
    const currentDate = new Date();
    const pastDate = new Date(givenDate);
    const timeDifference = currentDate - pastDate;
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
}

export function formatDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
        month: 'short', // Abbreviated month name
        day: '2-digit', // Day of the month with leading zeros if necessary
        year: 'numeric', // Full numeric year
    });
}

export function exactNameFromEmail(email) {
    return email.split('@')[0];
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function countDiscount(price, discount) {
    return price - (price * discount) / 100;
}

export function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatSoldAmount(soldAmount) {
    if (soldAmount >= 1000) {
        return (soldAmount / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return soldAmount.toString();
}

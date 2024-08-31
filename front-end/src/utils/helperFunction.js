export function calDateAgo(givenDate) {
    const currentDate = new Date();
    const pastDate = new Date(givenDate);
    const timeDifference = currentDate - pastDate;
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
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

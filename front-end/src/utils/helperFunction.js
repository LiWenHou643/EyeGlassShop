export function calDateAgo(givenDate) {
    // Get the current date
    const currentDate = new Date();

    // Parse the given date
    const pastDate = new Date(givenDate);

    // Calculate the difference in time (in milliseconds)
    const timeDifference = currentDate - pastDate;

    // Convert time difference from milliseconds to days
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return dayDifference;
}

export function exactNameFromEmail(email) {
    return email.split('@')[0];
}

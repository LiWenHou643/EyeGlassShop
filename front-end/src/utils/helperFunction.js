import { jwtDecode } from 'jwt-decode';
import { SHIPPING_CONSTANTS } from './constant';

export const calDateAgo = (givenDate) => {
    const currentDate = new Date();
    const pastDate = new Date(givenDate);
    const timeDifference = currentDate - pastDate;
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
};

export const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
        month: 'short', // Abbreviated month name
        day: '2-digit', // Day of the month with leading zeros if necessary
        year: 'numeric', // Full numeric year
    });
};

export const exactNameFromEmail = (email) => {
    return email.split('@')[0];
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const countDiscount = (price, discount) => {
    return price - (price * discount) / 100;
};

export const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatSoldAmount = (soldAmount) => {
    if (soldAmount >= 1000) {
        return (soldAmount / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return soldAmount.toString();
};

export const logJwtLifeTime = (token) => {
    if (!token) return;

    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = decodedToken.exp < currentTime;
    !isExpired
        ? console.log(
              'token will expire in: ',
              decodedToken.exp - currentTime,
              ' seconds'
          )
        : console.log(
              'token expired in ',
              decodedToken.exp - currentTime,
              ' seconds'
          );
};

export const haversineDistance = async (address) => {
    const coord1 = SHIPPING_CONSTANTS.SHOP_LOCATION;

    const formattedAddress = `${address.streetAddress}, ${address.ward}, ${address.district}, ${address.city}, Vietnam`;

    console.log(formattedAddress);
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            formattedAddress
        )}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
    }

    const data = await response.json();
    console.log(data);

    if (data.length === 0) {
        throw new Error('No results found');
    }
    const coord2 = data[0];

    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lon - coord1.lon);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coord1.lat)) *
            Math.cos(toRad(coord2.lat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return parseFloat((R * c).toFixed(2)); // Distance in kilometers
};

export const calculateDeliveryCost = (distance) => {
    const { COST_PER_KM, FREE_SHIPPING_DISTANCE } = SHIPPING_CONSTANTS;
    if (distance <= FREE_SHIPPING_DISTANCE) return 0;
    return COST_PER_KM * distance;
};

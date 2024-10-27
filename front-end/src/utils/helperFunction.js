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
    return email?.split('@')[0];
};

export const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
};

export const countDiscount = (price, discount) => {
    return price - (price * discount) / 100;
};

export const formatPrice = (value, decimals = 2) => {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
};
export const formatSoldAmount = (soldAmount) => {
    if (soldAmount >= 1000) {
        return (soldAmount / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return soldAmount?.toString();
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

export const formatAddress = (address) => {
    return `${address?.streetAddress}, ${address?.ward}, ${address?.district}, ${address?.city}`;
};

const getCoordinates = async (address) => {
    const formattedAddress = formatAddress(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        formattedAddress
    )}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const { lat, lon } = data[0]; // Get latitude and longitude from the first result
            return { lat, lon };
        } else {
            console.error('No results found.');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
};

export const haversineDistance = async (address) => {
    const apiKey = SHIPPING_CONSTANTS.MAP_API_KEY; // Replace with your OpenRouteService API key
    const endCoords = SHIPPING_CONSTANTS.SHOP_LOCATION;
    const startCoords = await getCoordinates(address);

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?start=${startCoords.lon},${startCoords.lat}&end=${endCoords.lon},${endCoords.lat}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const route = data.features[0];
            const distance = route.properties.segments[0].distance; // Distance in meters

            return (distance / 1000).toFixed(2);
        } else {
            console.log('No routes found.');
        }
    } catch (error) {
        console.error('Error fetching distance:', error);
        throw error; // Propagate error for further handling
    }
};

export const calculateDeliveryCost = (distance) => {
    const { COST_PER_KM, FREE_SHIPPING_DISTANCE } = SHIPPING_CONSTANTS;
    if (distance <= FREE_SHIPPING_DISTANCE) return 0;
    return COST_PER_KM * distance;
};

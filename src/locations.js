const fs = require("fs");
const NodeGeocoder = require('node-geocoder');

const options = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: process.env.GOOGLE_API_KEY,
	sensor: true
};

const geocoder = NodeGeocoder(options);

const getLocations = async function(addresses) {
	try {
		const geocoded = await geocoder.batchGeocode(addresses);
		const locations = geocoded.filter(({ error }) => !error)
			.map(({ error, value: [result] }) => ({
				lat: result.latitude,
				lng: result.longitude
			}));
		return locations;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getLocations
};

const axiosInstance = require('../axios/AxiosInstance');
require('dotenv').config();

function getCustomersWithFlag(obj) {
    // Prepare query parameters
    const params = {};
    if (obj.productRef) {
        params.productRef = obj.productRef;
    } else if (obj.variantRef) {
        params.variantRef = obj.variantRef;
    }
    if (obj.notifyMe) {
        params.notifyMe = obj.notifyMe.toString(); // Assuming notifyMe is a boolean, convert to string if necessary
    } else if (obj.preRelease) {
        params.preRelease = obj.preRelease.toString(); // Same assumption as above
    }

    axiosInstance.get('/api/wishlist/items/getCustomersWithFlag', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${obj.token}`,
            'X-TWC-Tenant': obj.tenant
        },
        params: params // Pass query parameters
    })
    .then(response => {
        if (obj.onSuccess) {
            obj.onSuccess(response.data);
        }
    })
    .catch(error => {
        if (obj.onError) {
            obj.onError(error?.response || error);
        }
    });
}

module.exports = getCustomersWithFlag;

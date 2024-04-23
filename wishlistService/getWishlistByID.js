const axiosInstance = require('../axios/AxiosInstance');
require('dotenv').config();

function getWishlistByID(obj) {
    // Check if pagination parameters are provided and include them
    const params = {};
    if (obj.pageSize) {
        params.pageSize = obj.pageSize;
    }
    if (obj.lastItemId) {
        params.lastItemId = obj.lastItemId;
    }

    axiosInstance.get(`/wsservice/api/wishlists/${obj.wishlistID}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${obj.token}`,
            'X-TWC-Tenant': obj.tenant
        },
        params: params  // Include pagination parameters in the request if any
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

module.exports = getWishlistByID;
// let onSuccess = function (lists) {
//     // Successfully fetched all lists 
//     console.log("Fetched all Lists", lists);
// }
// // Define error callback
// let onError = function (error) {
//     console.log("Error while fetching all Lists", error);
// }
// const token = process.env.token;
// const tenant = "sunils_electronics";
// const wishlistID = "0cb1529c-2bf8-45d2-a124-5a97fa692ab6";
// findWishlistByID({
//     onSuccess,
//     onError,
//     token,
//     tenant,   
//     wishlistID
// });

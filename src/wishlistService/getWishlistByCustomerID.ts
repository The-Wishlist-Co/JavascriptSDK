import { axiosInstance } from "../axios/AxiosInstance";

export function getWishlistByCustomerID(obj) {
  // Include pagination parameters in the request
  const params = {
    pageSize: obj.pageSize || 10, // Default page size to 10 if not specified
    lastItemId: obj.lastItemId || "", // Default to an empty string if not provided
  };

  axiosInstance
    .get(`/wsservice/api/wishlists/customer/${obj.customerID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant,
      },
      params: params, // Pass pagination parameters as part of the query
    })
    .then((response) => {
      if (obj.onSuccess) {
        obj.onSuccess(response.data);
      }
    })
    .catch((error) => {
      if (obj.onError) {
        obj.onError(error?.response || error);
      }
    });
}

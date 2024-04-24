import { axiosInstance } from "../axios/AxiosInstance";

export function getWishlistByCustomerRef(obj) {
  // Include pagination parameters in the request
  const params = {
    pageSize: obj.pageSize || 10, // Default page size to 10 if not specified
    lastItemId: obj.lastItemId || "", // Default to an empty string if not provided
  };
  axiosInstance
    .get(`/wsservice/api/wishlists/customer/${obj.customerRef}/byref`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant,
      },
      params: params, // Pass pagination parameters as part of the query
    })
    .then((response) => {
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}

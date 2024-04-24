// Get all wishlists for a given customer by customer ID or customer Ref

import { axiosInstance } from "../axios/AxiosInstance";

export function getWishlistByCustomer(obj) {
  const params = new URLSearchParams();

  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  if (obj.pageSize) params.append("pageSize", obj.pageSize);
  if (obj.lastItemId) params.append("lastItemId", obj.lastItemId);

  axiosInstance
    .get(`/wsservice/api/wishlists/lookup?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant,
      },
    })
    .then((response) => {
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}

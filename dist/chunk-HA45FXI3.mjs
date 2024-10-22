import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/deleteAllWishlist.ts
function deleteAllWishlist(obj) {
  const params = new URLSearchParams();
  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  axiosInstance.delete(`/wsservice/api/wishlists/customer?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

export { deleteAllWishlist };

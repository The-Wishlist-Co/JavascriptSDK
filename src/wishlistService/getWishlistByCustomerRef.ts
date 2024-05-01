import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Retrieves the wishlist for a customer based on the customer reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.pageSize - The number of items to retrieve per page (default: 10).
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.customerRef - The customer reference.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle a successful response.
 * @param obj.onError - The callback function to handle an error response.
 */
export function getWishlistByCustomerRef(obj: {
  pageSize?: number;
  lastItemId?: string;
  customerRef: string;
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
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

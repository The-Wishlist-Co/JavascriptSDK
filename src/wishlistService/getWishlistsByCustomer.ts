// This API gets all of a customer's wishlists, without items, plus the item count across all of them.
// Load the items for one wishlist with getWishlistItems.

import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Retrieves all wishlists for a customer, without their items. The response includes
 * `totalItemsAllWishlists` and each wishlist's details; use {@link getWishlistItems} to load
 * the items for the wishlist the customer opens.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.customerID - The TWC ID of the customer (one of customerID, customerRef or email must be defined).
 * @param obj.customerRef - The customer reference, i.e. the Shopify customer ID (one of customerID, customerRef or email must be defined).
 * @param obj.email - The customer's email (one of customerID, customerRef or email must be defined).
 * @param obj.pageSize - The number of wishlists to retrieve per page.
 * @param obj.lastItemId - The ID of the last wishlist retrieved.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle a successful response.
 * @param obj.onError - The callback function to handle an error response.
 */
export function getWishlistsByCustomer(obj: {
  customerID?: string;
  customerRef?: string;
  email?: string;
  pageSize?: number;
  lastItemId?: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  if (!obj.customerID && !obj.customerRef && !obj.email) {
    obj.onError(new Error("One of customerID, customerRef or email must be defined."));
    return;
  }

  const params = new URLSearchParams();
  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  obj.email && params.append("email", obj.email);
  if (obj.pageSize) params.append("pageSize", obj.pageSize.toString());
  if (obj.lastItemId) params.append("lastItemId", obj.lastItemId);

  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.get(
        `/wsservice/api/wishlists/byCustomer?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-TWC-Tenant": obj.tenant,
          },
        }
      );
    })
    .then((response) => {
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}

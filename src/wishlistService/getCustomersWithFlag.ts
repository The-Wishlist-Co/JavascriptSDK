//Returns the wishlist customers which are enabled notifyMe or preRelease.
// Retailer can filter the customers by providing the  productRef OR variantRef. Also possible without providing those indetifiers.
// Either 'notifyMe' or 'preRelease' must be passed in the request.
// If the customers does not exist, this method returns a empty list

import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Retrieves the wishlist customers which are enabled for notifyMe or preRelease.
 * If the customers do not exist, this method returns an empty list.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.productRef - The product reference to filter the customers by (either productRef or variantRef must be defined).
 * @param obj.variantRef - The variant reference to filter the customers by (either productRef or variantRef must be defined).
 * @param obj.notifyMe - A boolean indicating whether to retrieve customers with notifyMe enabled (either notifyMe or preRelease must be defined).
 * @param obj.preRelease - A boolean indicating whether to retrieve customers with preRelease enabled (either notifyMe or preRelease must be defined).
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful retrieval of customers.
 * @param obj.onError - The callback function to be called if an error occurs during retrieval.
 */
export function getCustomersWithFlag(obj: {
  productRef?: string;
  variantRef?: string;
  notifyMe?: boolean;
  preRelease?: boolean;
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  // Prepare query parameters
  const params: any = {};
  // Check if either productRef or variantRef is provided and add to params
  if (obj.productRef) {
    params.productRef = obj.productRef;
  } else if (obj.variantRef) {
    params.variantRef = obj.variantRef;
  }

  // Assuming notifyMe or preRelease must be specified, add them to params
  if (obj.notifyMe !== undefined) {
    // Check for undefined to allow boolean false
    params.notifyMe = obj.notifyMe.toString(); // Convert boolean to string if necessary
  } else if (obj.preRelease !== undefined) {
    params.preRelease = obj.preRelease.toString();
  }

  axiosInstance
    .get("/wsservice/api/wishlist/items/getCustomersWithFlag", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant,
      },
      params: params, // Pass query parameters
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

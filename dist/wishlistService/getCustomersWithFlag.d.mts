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
declare function getCustomersWithFlag(obj: {
    productRef?: string;
    variantRef?: string;
    notifyMe?: boolean;
    preRelease?: boolean;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { getCustomersWithFlag };

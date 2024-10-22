/**
 * Resets the wishlist item flag.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.productRef - The product reference (either productRef or variantRef must be defined).
 * @param obj.variantRef - The variant reference (either productRef or variantRef must be defined).
 * @param obj.notifyMe - Indicates whether to notify the user (either notifyMe or preRelease must be defined).
 * @param obj.preRelease - Indicates whether the item is a pre-release (either notifyMe or preRelease must be defined).
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on success.
 * @param obj.onError - The callback function to be called on error.
 */
declare function resetWishlistItemFlag(obj: {
    productRef?: string;
    variantRef?: string;
    notifyMe?: boolean;
    preRelease?: boolean;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { resetWishlistItemFlag };

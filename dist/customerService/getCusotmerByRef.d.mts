/**
 * Retrieves customer information by customer reference.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerRef - The customer reference.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
declare function getCustomerByRef(obj: {
    customerRef: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { getCustomerByRef };

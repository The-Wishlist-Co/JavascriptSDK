/**
 * Creates a new customer.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.createCustomerBody - The body of the request containing the customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#create-a-customer for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the request is successful.
 * @param obj.onError - The callback function to be called when an error occurs.
 */
declare function createCustomer(obj: {
    createCustomerBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { createCustomer };

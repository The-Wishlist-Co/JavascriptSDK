/**
 * Creates bulk customers.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.createBulkCustomerBody - The body of the request containing the customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#create-multiple-customers for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful response.
 * @param obj.onError - The callback function to be called on error.
 */
declare function createBulkCustomers(obj: {
    createBulkCustomerBody: {
        [key: string]: any;
    }[];
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { createBulkCustomers };

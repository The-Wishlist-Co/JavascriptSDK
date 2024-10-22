/**
 * Updates a customer using the provided data.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.updateCustomerBody - The data to be sent in the request body for updating the customer. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields.
 * @param obj.token - The authentication token for the request.
 * @param obj.tenant - The tenant identifier for the request.
 * @param obj.onSuccess - The callback function to be executed when the request is successful.
 * @param obj.onError - The callback function to be executed when an error occurs during the request.
 */
declare function updateCustomer(obj: {
    updateCustomerBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { updateCustomer };

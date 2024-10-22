/**
 * Deletes a customer.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer to delete (either customerID or customerRef must be defined).
 * @param obj.customerRef - The reference of the customer to delete (either customerID or customerRef must be defined).
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
declare function deleteCustomer(obj: {
    customerID?: string;
    customerRef?: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { deleteCustomer };

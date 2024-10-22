/**
 * Returns a list of customers with a matching email/mobile/phone/firstName/lastName.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.email - The email of the customer.
 * @param obj.firstName - The first name of the customer.
 * @param obj.lastName - The last name of the customer.
 * @param obj.mobile - The mobile number of the customer.
 * @param obj.phone - The phone number of the customer.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful lookup.
 * @param obj.onError - The callback function to be called on lookup error.
 */
declare function customerLookup(obj: {
    email?: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    phone?: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { customerLookup };

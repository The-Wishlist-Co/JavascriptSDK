import { axiosInstance } from "../axios/AxiosInstance";

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
export function customerLookup(obj: {
  email?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  phone?: string;
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  const params = new URLSearchParams();

  obj.email && params.append("email", obj.email);
  obj.firstName && params.append("firstName", obj.firstName);
  obj.lastName && params.append("lastName", obj.lastName);
  obj.mobile && params.append("mobile", obj.mobile);
  obj.phone && params.append("phone", obj.phone);

  axiosInstance
    .get(`/customerservice/api/v2/customers/search?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant,
      },
    })
    .then((response) => {
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}

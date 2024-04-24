import { axiosInstance } from "../axios/AxiosInstance";

export function customerLookup(obj) {
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

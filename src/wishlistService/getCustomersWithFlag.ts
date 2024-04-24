//Returns the wishlist customers which are enabled notifyMe or preRelease.
// Retailer can filter the customers by providing the  productRef OR variantRef. Also possible without providing those indetifiers.
// Either 'notifyMe' or 'preRelease' must be passed in the request.
// If the customers does not exist, this method returns a empty list

import { axiosInstance } from "../axios/AxiosInstance";

export function getCustomersWithFlag(obj) {
  // Prepare query parameters
  const params: any = {};
  // Check if either productRef or variantRef is provided and add to params
  if (obj.productRef) {
    params.productRef = obj.productRef;
  } else if (obj.variantRef) {
    params.variantRef = obj.variantRef;
  }

  // Assuming notifyMe or preRelease must be specified, add them to params
  if (obj.notifyMe !== undefined) {
    // Check for undefined to allow boolean false
    params.notifyMe = obj.notifyMe.toString(); // Convert boolean to string if necessary
  } else if (obj.preRelease !== undefined) {
    params.preRelease = obj.preRelease.toString();
  }

  axiosInstance
    .get("/wsservice/api/wishlist/items/getCustomersWithFlag", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant,
      },
      params: params, // Pass query parameters
    })
    .then((response) => {
      if (obj.onSuccess) {
        obj.onSuccess(response.data);
      }
    })
    .catch((error) => {
      if (obj.onError) {
        obj.onError(error?.response || error);
      }
    });
}

// let onSuccess = function (res) {
//   console.log("success:", res);
// };
// // Define error callback
// let onError = function (error) {
//   console.log("error:", error);
//   console.log(error.status, error.message, error.data);
// };
// const token =
//   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3TTdnUTlXeVlKSzVZSHJQNUh5dkN5dUJDaWd0NnB2SkNVcnVicXB2dGVVIn0.eyJleHAiOjE3MTM5MzM4NDIsImlhdCI6MTcxMzkxNTg0MiwianRpIjoiMjRmZDUyMTAtZTY0ZS00NDEyLWEzNWEtZThmNWMxOGEwZmQwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmF1LWF3cy50aGV3aXNobGlzdC5pby9hdXRoL3JlYWxtcy92aWt0b3JpYS13b29kcyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJhMzM0YmIyYy1lMzcxLTQ5NTEtODUxNy1kNDQ0M2FkZDg5NTYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ0d2NfYWRtaW4iLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vY29uc29sZS5hdS1hd3MudGhld2lzaGxpc3QuaW8iLCJodHRwczovL2FwaS5hdS1hd3MudGhld2lzaGxpc3QuaW8iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMTkyLjE2OC4xNjAuMTM2IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRJZCI6InR3Y19hZG1pbiIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC10d2NfYWRtaW4iLCJjbGllbnRBZGRyZXNzIjoiMTkyLjE2OC4xNjAuMTM2In0.LiWtEvkdUuaYtLNmUv_Kut4BbUp712eb-3sJr7A-VM4-AxD9nnjmro6j81a3QxTmBjxEgXqcoIeF3YaVAphcu8Q8_QCLkjxwtbJXGCXrLXHWu82ddtFz_gxgXdor4jYjIYiVSB2vLdco2MnoFMjVQSRezD42Hn43o2h8f1xET4jylZzpc_Y7aYWaxBG7VHOjhzv9LR_hD_SV5RAHaCZmhfS1Ir5qv5B1zeEA9HuBj3wz6iI82gxGxfFbo3rH-lQl9IPvEgNqWNkO3MhspW8QQ3ceVgtprFNEKmum7wLRFJ-sRxhSJYkMrEsQPKUBX5uI6r70NSYVe1dLK8AswIf4Jw";
// const tenant = "viktoria-woods";
// const customerRef = "6469699666054";
// getCustomersWithFlag({
//   onSuccess,
//   onError,
//   token,
//   tenant,
//   productRef: "6892451201158",
// });

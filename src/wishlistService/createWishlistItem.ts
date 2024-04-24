import { axiosInstance } from "../axios/AxiosInstance";

export function createWishlistItem(obj) {
  axiosInstance
    .post(`/wsservice/api/wishlist/items`, obj.createWishlistItembody, {
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

// let onSuccess = function (res) {
//   console.log("success:", res);
// };
// // Define error callback
// let onError = function (error) {
//   console.log("error:", error);
//   console.log(error.status, error.message, error.data);
// };
// const token =
//   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3TTdnUTlXeVlKSzVZSHJQNUh5dkN5dUJDaWd0NnB2SkNVcnVicXB2dGVVIn0.eyJleHAiOjE3MTM3Nzk0MzgsImlhdCI6MTcxMzc2MTQzOCwianRpIjoiYTljNjQ1NGQtNmI0ZS00MzQ1LTgyMDItNTEyZWVmZDA5MzMzIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmF1LWF3cy50aGV3aXNobGlzdC5pby9hdXRoL3JlYWxtcy92aWt0b3JpYS13b29kcyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJhMzM0YmIyYy1lMzcxLTQ5NTEtODUxNy1kNDQ0M2FkZDg5NTYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ0d2NfYWRtaW4iLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vY29uc29sZS5hdS1hd3MudGhld2lzaGxpc3QuaW8iLCJodHRwczovL2FwaS5hdS1hd3MudGhld2lzaGxpc3QuaW8iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMTkyLjE2OC4xMTcuMjMyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRJZCI6InR3Y19hZG1pbiIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC10d2NfYWRtaW4iLCJjbGllbnRBZGRyZXNzIjoiMTkyLjE2OC4xMTcuMjMyIn0.BHlukbt4eB56JgzEpKp1gJOSr3xFhBNdZ4kIMywmVcOdXoCui6WDwdgDkPwJHpjHH8zfFxJ37whiCmvwzCYFI_LcytmVyMrUdXA4r8wXvSwD2rlKm9FMiJxeW7xIOH2n2nnjg-dbm_GUmc-Rw7HTtE2UxsHvdbmshocW07eKurVsVIWWpdyTH4pSGOiV6nPk_JYQyrLRUrrOWIBuyc3mdOy05wHEfs85AMmj58-8XYBtmJDcZB6ErH00uM394JWn5nnomcOKhRAwzguFzNHuVsqSih15uqFZ5nlKGjru1qcvOwp1nCfE7_KHygswUv_Q245jfCDm-9QndUZDqTmMFA";
// const tenant = "viktoria-woods";
// const customerRef = "6469699666054";
// createNewWishlist({
//   onSuccess,
//   onError,
//   token,
//   tenant,
//   newWishlistBody: {
//     customerRef,
//     isPrivate: true,
//     name: "Test Wishlist",
//   },
// });

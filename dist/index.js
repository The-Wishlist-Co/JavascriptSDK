'use strict';

var axios = require('axios');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var axios__default = /*#__PURE__*/_interopDefault(axios);

// src/axios/AxiosInstance.ts
var axiosInstance = axios__default.default.create({
  baseURL: "https://api.au-aws.thewishlist.io/services"
});

// src/wishlistService/getWishlistByID.ts
function getWishlistByID(obj) {
  const params = {};
  if (obj.pageSize) {
    params.pageSize = obj.pageSize;
  }
  if (obj.lastItemId) {
    params.lastItemId = obj.lastItemId;
  }
  axiosInstance.get(`/wsservice/api/wishlists/${obj.wishlistID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    },
    params
    // Include pagination parameters in the request if any
  }).then((response) => {
    if (obj.onSuccess) {
      obj.onSuccess(response.data);
    }
  }).catch((error) => {
    if (obj.onError) {
      obj.onError((error == null ? void 0 : error.response) || error);
    }
  });
}

// src/wishlistService/getWishlistByCustomerID.ts
function getWishlistByCustomerID(obj) {
  const params = {
    pageSize: obj.pageSize || 10,
    // Default page size to 10 if not specified
    lastItemId: obj.lastItemId || ""
    // Default to an empty string if not provided
  };
  axiosInstance.get(`/wsservice/api/wishlists/customer/${obj.customerID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    },
    params
    // Pass pagination parameters as part of the query
  }).then((response) => {
    if (obj.onSuccess) {
      obj.onSuccess(response.data);
    }
  }).catch((error) => {
    if (obj.onError) {
      obj.onError((error == null ? void 0 : error.response) || error);
    }
  });
}

// src/wishlistService/getWishlistByCustomerRef.ts
function getWishlistByCustomerRef(obj) {
  const params = {
    pageSize: obj.pageSize || 10,
    // Default page size to 10 if not specified
    lastItemId: obj.lastItemId || ""
    // Default to an empty string if not provided
  };
  axiosInstance.get(`/wsservice/api/wishlists/customer/${obj.customerRef}/byref`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    },
    params
    // Pass pagination parameters as part of the query
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistByRef.ts
function getWishlistByRef(obj) {
  axiosInstance.get(`/wsservice/api/wishlists/${obj.wishlistRef}/byref`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlist.ts
function getWishlist(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize);
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  axiosInstance.get(`/wsservice/api/wishlists?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistItemByID.ts
function getWishlistItemByID(obj) {
  axiosInstance.get(`/wsservice/api/wishlist/items/${obj.wishlistItemID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistItemByRef.ts
function getWishlistItemByRef(obj) {
  axiosInstance.get(`/wsservice/api/wishlist/items/ref/${obj.wishlistItemRef}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistItems.ts
function getWishlistItems(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize);
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  axiosInstance.get(`/wsservice/api/wishlist/items?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlistItemByRef.ts
function updateWishlistItemByRef(obj) {
  axiosInstance.put(`/wsservice/api/wishlist/items/ref=${obj.wishlistItemRef}`, obj.updateWishlistItemBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistByCustomer.ts
function getWishlistByCustomer(obj) {
  const params = new URLSearchParams();
  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize);
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  axiosInstance.get(`/wsservice/api/wishlists/lookup?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/createWishlistItem.ts
function createWishlistItem(obj) {
  axiosInstance.post(`/wsservice/api/wishlist/items`, obj.createWishlistItembody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/createWishlist.ts
function createWishlist(obj) {
  axiosInstance.post(`/wsservice/api/wishlists`, obj.newWishlistBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlist.ts
function updateWishlist(obj) {
  axiosInstance.put(`/wsservice/api/wishlists`, obj.updateWishlistBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlistByID.ts
function updateWishlistByID(obj) {
  axiosInstance.put(`/wsservice/api/wishlists/id=${obj.wishlistID}`, obj.updateWishlistByIDBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlistByRef.ts
function updateWishlistByRef(obj) {
  axiosInstance.put(`/wsservice/api/wishlists/ref=${obj.wishlistRef}`, obj.updateWishlistByIDBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlistItem.ts
function updateWishlistItem(obj) {
  axiosInstance.put(`/wsservice/api/wishlist/items`, obj.updateWishlistItemBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlistItemByID.ts
function updateWishlistItemByID(obj) {
  axiosInstance.put(`/wsservice/api/wishlist/items/id=${obj.wishlistItemID}`, obj.updateWishlistItemBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlistItemByID.ts
function deleteWishlistItemByID(obj) {
  axiosInstance.delete(`/wsservice/api/wishlist/items/${obj.wishlistItemID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlistItemByRef.ts
function deleteWishlistItemByRef(obj) {
  axiosInstance.delete(`/wsservice/api/wishlist/items/${obj.wishlistItemRef}/ref`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlist.ts
function deleteWishlist(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  axiosInstance.delete(`/wsservice/api/wishlists?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteAllWishlist.ts
function deleteAllWishlist(obj) {
  const params = new URLSearchParams();
  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  axiosInstance.delete(`/wsservice/api/wishlists/customer?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlistByID.ts
function deleteWishlistByID(obj) {
  axiosInstance.delete(`/wsservice/api/wishlists/${obj.wishlistID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlistByRef.ts
function deleteWishlistByRef(obj) {
  axiosInstance.delete(`/wsservice/api/wishlists/${obj.wishlistRef}/byref`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getCustomersWithFlag.ts
function getCustomersWithFlag(obj) {
  const params = {};
  if (obj.productRef) {
    params.productRef = obj.productRef;
  } else if (obj.variantRef) {
    params.variantRef = obj.variantRef;
  }
  if (obj.notifyMe !== void 0) {
    params.notifyMe = obj.notifyMe.toString();
  } else if (obj.preRelease !== void 0) {
    params.preRelease = obj.preRelease.toString();
  }
  axiosInstance.get("/wsservice/api/wishlist/items/getCustomersWithFlag", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    },
    params
    // Pass query parameters
  }).then((response) => {
    if (obj.onSuccess) {
      obj.onSuccess(response.data);
    }
  }).catch((error) => {
    if (obj.onError) {
      obj.onError((error == null ? void 0 : error.response) || error);
    }
  });
}

// src/wishlistService/resetWishlistItemFlag.ts
function resetWishlistItemFlag(obj) {
  const params = {};
  if (obj.productRef) {
    params.productRef = obj.productRef;
  } else if (obj.variantRef) {
    params.variantRef = obj.variantRef;
  }
  if (obj.notifyMe) {
    params.notifyMe = obj.notifyMe.toString();
  } else if (obj.preRelease) {
    params.preRelease = obj.preRelease.toString();
  }
  axiosInstance.put(
    "/wsservice/api/wishlist/items/resetFlag",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant
      },
      params
    }
  ).then((response) => {
    if (obj.onSuccess) {
      obj.onSuccess(response.data);
    }
  }).catch((error) => {
    if (obj.onError) {
      obj.onError((error == null ? void 0 : error.response) || error);
    }
  });
}

// src/wishlistService/getItemsPopularity.ts
function getItemsPopularity(obj) {
  axiosInstance.post(`/wsservice/api/wishlist/itemPopularity`, obj.itemsPopularityBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/customerLookup.ts
function customerLookup(obj) {
  const params = new URLSearchParams();
  obj.email && params.append("email", obj.email);
  obj.firstName && params.append("firstName", obj.firstName);
  obj.lastName && params.append("lastName", obj.lastName);
  obj.mobile && params.append("mobile", obj.mobile);
  obj.phone && params.append("phone", obj.phone);
  axiosInstance.get(`/customerservice/api/v2/customers/search?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/getCustomerByID.ts
function getCustomerByID(obj) {
  axiosInstance.get(`/customerservice/api/v2/customers/${obj.customerID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/getCusotmerByRef.ts
function getCustomerByRef(obj) {
  axiosInstance.get(`/customerservice/api/v2/customers/${obj.customerRef}/ref`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/createCustomer.ts
function createCustomer(obj) {
  axiosInstance.post(`/customerservice/api/v2/customers/`, obj.createCustomerBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/updateCustomerByID.ts
function updateCustomerByID(obj) {
  axiosInstance.put(`/customerservice/api/v2/customers/id=${obj.customerID}`, obj.updateCustomerBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/updateCustomer.ts
function updateCustomer(obj) {
  axiosInstance.put(`/customerservice/api/v2/customers`, obj.updateCustomerBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/updateCustomerByRef.ts
function updateCustomerByRef(obj) {
  axiosInstance.put(
    `/customerservice/api/v2/customers/customerRef=${obj.customerRef}`,
    obj.updateCustomerBody,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant
      }
    }
  ).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/deleteCustomer.ts
function deleteCustomer(obj) {
  const params = new URLSearchParams();
  obj.customerID && params.append("id", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  axiosInstance.delete(`/customerservice/api/v2/customers?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/deleteCustomerByID.ts
function deleteCustomerByID(obj) {
  axiosInstance.delete(`/customerservice/api/v2/customers/${obj.customerID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/createBulkCustomers.ts
function createBulkCustomers(obj) {
  axiosInstance.post(`/customerservice/api/v2/upload-customers/`, obj.createBulkCustomerBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

exports.createBulkCustomers = createBulkCustomers;
exports.createCustomer = createCustomer;
exports.createWishlist = createWishlist;
exports.createWishlistItem = createWishlistItem;
exports.customerLookup = customerLookup;
exports.deleteAllWishlist = deleteAllWishlist;
exports.deleteCustomer = deleteCustomer;
exports.deleteCustomerByID = deleteCustomerByID;
exports.deleteWishlist = deleteWishlist;
exports.deleteWishlistByID = deleteWishlistByID;
exports.deleteWishlistByRef = deleteWishlistByRef;
exports.deleteWishlistItemByID = deleteWishlistItemByID;
exports.deleteWishlistItemByRef = deleteWishlistItemByRef;
exports.getCustomerByID = getCustomerByID;
exports.getCustomerByRef = getCustomerByRef;
exports.getCustomersWithFlag = getCustomersWithFlag;
exports.getItemsPopularity = getItemsPopularity;
exports.getWishlist = getWishlist;
exports.getWishlistByCustomer = getWishlistByCustomer;
exports.getWishlistByCustomerID = getWishlistByCustomerID;
exports.getWishlistByCustomerRef = getWishlistByCustomerRef;
exports.getWishlistByID = getWishlistByID;
exports.getWishlistByRef = getWishlistByRef;
exports.getWishlistItemByID = getWishlistItemByID;
exports.getWishlistItemByRef = getWishlistItemByRef;
exports.getWishlistItems = getWishlistItems;
exports.resetWishlistItemFlag = resetWishlistItemFlag;
exports.updateCustomer = updateCustomer;
exports.updateCustomerByID = updateCustomerByID;
exports.updateCustomerByRef = updateCustomerByRef;
exports.updateWishlist = updateWishlist;
exports.updateWishlistByID = updateWishlistByID;
exports.updateWishlistByRef = updateWishlistByRef;
exports.updateWishlistItem = updateWishlistItem;
exports.updateWishlistItemByID = updateWishlistItemByID;
exports.updateWishlistItemByRef = updateWishlistItemByRef;

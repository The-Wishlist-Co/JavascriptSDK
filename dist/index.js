'use strict';

var axios = require('axios');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var axios__default = /*#__PURE__*/_interopDefault(axios);

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function resolveToken(token) {
  return __async(this, null, function* () {
    if (token)
      return token;
    {
      throw new Error(
        "TWC SDK: no token provided. Pass an access token from your TWC server API client as `token`."
      );
    }
  });
}

// src/axios/AxiosInstance.ts
var axiosInstance = axios__default.default.create({
  baseURL: "https://api.au-aws.thewishlist.io/services"
});
axiosInstance.interceptors.response.use(void 0, (error) => __async(void 0, null, function* () {
  var _a;
  const config2 = error.config;
  if (((_a = error.response) == null ? void 0 : _a.status) !== 401 || !config2 || config2._twcRetried) {
    return Promise.reject(error);
  }
  {
    return Promise.reject(error);
  }
}));

// src/wishlistService/getWishlist.ts
function getWishlist(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize);
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(`/wsservice/api/wishlists?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-TWC-Tenant": obj.tenant
      }
    });
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistItemByID.ts
function getWishlistItemByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlist/items/${obj.wishlistItemID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistItemByRef.ts
function getWishlistItemByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlist/items/ref/${obj.wishlistItemRef}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
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
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlist/items?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistsByCustomer.ts
function getWishlistsByCustomer(obj) {
  if (!obj.customerID && !obj.customerRef && !obj.email) {
    obj.onError(new Error("One of customerID, customerRef or email must be defined."));
    return;
  }
  const params = new URLSearchParams();
  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  obj.email && params.append("email", obj.email);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize.toString());
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlists/byCustomer?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/createWishlistItem.ts
function createWishlistItem(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(
      `/wsservice/api/wishlist/items`,
      obj.createWishlistItembody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/createWishlist.ts
function createWishlist(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(`/wsservice/api/wishlists`, obj.newWishlistBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-TWC-Tenant": obj.tenant
      }
    });
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlist.ts
function updateWishlist(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/wsservice/api/wishlists`,
      obj.updateWishlistBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlistItem.ts
function updateWishlistItem(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/wsservice/api/wishlist/items`,
      obj.updateWishlistItemBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlistItemByID.ts
function deleteWishlistItemByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/wsservice/api/wishlist/items/${obj.wishlistItemID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlistItemByRef.ts
function deleteWishlistItemByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/wsservice/api/wishlist/items/${obj.wishlistItemRef}/ref`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
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
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/wsservice/api/wishlists?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getItemsPopularity.ts
function getItemsPopularity(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(
      `/wsservice/api/wishlists/itemPopularity`,
      obj.itemsPopularityBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/getCustomerByID.ts
function getCustomerByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/customerservice/api/v2/customers/${obj.customerID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/getCusotmerByRef.ts
function getCustomerByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/customerservice/api/v2/customers/${obj.customerRef}/ref`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/createCustomer.ts
function createCustomer(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(
      `/customerservice/api/v2/customers/`,
      obj.createCustomerBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/updateCustomerByID.ts
function updateCustomerByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/customerservice/api/v2/customers/id=${obj.customerID}`,
      obj.updateCustomerBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/updateCustomer.ts
function updateCustomer(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/customerservice/api/v2/customers`,
      obj.updateCustomerBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

exports.createCustomer = createCustomer;
exports.createWishlist = createWishlist;
exports.createWishlistItem = createWishlistItem;
exports.deleteWishlist = deleteWishlist;
exports.deleteWishlistItemByID = deleteWishlistItemByID;
exports.deleteWishlistItemByRef = deleteWishlistItemByRef;
exports.getCustomerByID = getCustomerByID;
exports.getCustomerByRef = getCustomerByRef;
exports.getItemsPopularity = getItemsPopularity;
exports.getWishlist = getWishlist;
exports.getWishlistItemByID = getWishlistItemByID;
exports.getWishlistItemByRef = getWishlistItemByRef;
exports.getWishlistItems = getWishlistItems;
exports.getWishlistsByCustomer = getWishlistsByCustomer;
exports.updateCustomer = updateCustomer;
exports.updateCustomerByID = updateCustomerByID;
exports.updateWishlist = updateWishlist;
exports.updateWishlistItem = updateWishlistItem;

import axios from 'axios';

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

// src/config.ts
var config = null;
function initTWC(cfg) {
  config = cfg;
}
function getConfig() {
  return config;
}
var cachedToken = null;
var cacheExpiry = 0;
var CACHE_TTL_MS = 4 * 60 * 1e3;
function resolveToken(token) {
  return __async(this, null, function* () {
    var _a, _b, _c, _d;
    if (token)
      return token;
    const config2 = getConfig();
    if (!config2) {
      throw new Error(
        "TWC SDK: No token provided and proxy auth is not configured. Either pass a token directly or call initTWC({ shopDomain }) first."
      );
    }
    if (cachedToken && Date.now() < cacheExpiry) {
      return cachedToken;
    }
    const proxyUrl = `https://${config2.shopDomain}/apps/twc-sdk/auth/token`;
    const response = yield axios.get(proxyUrl);
    if (!((_a = response.data) == null ? void 0 : _a.success) || !((_c = (_b = response.data) == null ? void 0 : _b.data) == null ? void 0 : _c.access_token)) {
      throw new Error(
        `TWC SDK: Proxy auth failed \u2014 ${((_d = response.data) == null ? void 0 : _d.message) || "unknown error"}`
      );
    }
    cachedToken = response.data.data.access_token;
    cacheExpiry = Date.now() + CACHE_TTL_MS;
    return cachedToken;
  });
}
var axiosInstance = axios.create({
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
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(`/wsservice/api/wishlists/${obj.wishlistID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-TWC-Tenant": obj.tenant
      },
      params
    });
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
    lastItemId: obj.lastItemId || ""
  };
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlists/customer/${obj.customerID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        },
        params
      }
    );
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
    lastItemId: obj.lastItemId || ""
  };
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlists/customer/${obj.customerRef}/byref`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        },
        params
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistByRef.ts
function getWishlistByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlists/${obj.wishlistRef}/byref`,
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

// src/wishlistService/updateWishlistItemByRef.ts
function updateWishlistItemByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/wsservice/api/wishlist/items/ref=${obj.wishlistItemRef}`,
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

// src/wishlistService/getWishlistByCustomer.ts
function getWishlistByCustomer(obj) {
  const params = new URLSearchParams();
  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize);
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlists/lookup?${params.toString()}`,
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

// src/wishlistService/updateWishlistByID.ts
function updateWishlistByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/wsservice/api/wishlists/id=${obj.wishlistID}`,
      obj.updateWishlistByIDBody,
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

// src/wishlistService/updateWishlistByRef.ts
function updateWishlistByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/wsservice/api/wishlists/ref=${obj.wishlistRef}`,
      obj.updateWishlistByIDBody,
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

// src/wishlistService/updateWishlistItemByID.ts
function updateWishlistItemByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/wsservice/api/wishlist/items/id=${obj.wishlistItemID}`,
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

// src/wishlistService/deleteAllWishlist.ts
function deleteAllWishlist(obj) {
  const params = new URLSearchParams();
  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/wsservice/api/wishlists/customer?${params.toString()}`,
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

// src/wishlistService/deleteWishlistByID.ts
function deleteWishlistByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/wsservice/api/wishlists/${obj.wishlistID}`,
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

// src/wishlistService/deleteWishlistByRef.ts
function deleteWishlistByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/wsservice/api/wishlists/${obj.wishlistRef}/byref`,
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
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      "/wsservice/api/wishlist/items/getCustomersWithFlag",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        },
        params
      }
    );
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
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      "/wsservice/api/wishlist/items/resetFlag",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        },
        params
      }
    );
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

// src/customerService/customerLookup.ts
function customerLookup(obj) {
  const params = new URLSearchParams();
  obj.email && params.append("email", obj.email);
  obj.firstName && params.append("firstName", obj.firstName);
  obj.lastName && params.append("lastName", obj.lastName);
  obj.mobile && params.append("mobile", obj.mobile);
  obj.phone && params.append("phone", obj.phone);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/customerservice/api/v2/customers/search?${params.toString()}`,
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

// src/customerService/updateCustomerByRef.ts
function updateCustomerByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/customerservice/api/v2/customers/customerRef=${obj.customerRef}`,
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

// src/customerService/deleteCustomer.ts
function deleteCustomer(obj) {
  const params = new URLSearchParams();
  obj.customerID && params.append("id", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/customerservice/api/v2/customers?${params.toString()}`,
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

// src/customerService/deleteCustomerByID.ts
function deleteCustomerByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
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

// src/customerService/createBulkCustomers.ts
function createBulkCustomers(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(
      `/customerservice/api/v2/upload-customers/`,
      obj.createBulkCustomerBody,
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

export { createBulkCustomers, createCustomer, createWishlist, createWishlistItem, customerLookup, deleteAllWishlist, deleteCustomer, deleteCustomerByID, deleteWishlist, deleteWishlistByID, deleteWishlistByRef, deleteWishlistItemByID, deleteWishlistItemByRef, getCustomerByID, getCustomerByRef, getCustomersWithFlag, getItemsPopularity, getWishlist, getWishlistByCustomer, getWishlistByCustomerID, getWishlistByCustomerRef, getWishlistByID, getWishlistByRef, getWishlistItemByID, getWishlistItemByRef, getWishlistItems, initTWC, resetWishlistItemFlag, resolveToken, updateCustomer, updateCustomerByID, updateCustomerByRef, updateWishlist, updateWishlistByID, updateWishlistByRef, updateWishlistItem, updateWishlistItemByID, updateWishlistItemByRef };

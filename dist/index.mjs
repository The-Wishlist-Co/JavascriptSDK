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
function isAnonymousWishlistEnabled() {
  return (config == null ? void 0 : config.anonymousWishlistEnabled) !== false;
}
var cachedToken = null;
var cacheExpiry = 0;
var inFlight = null;
var CACHE_TTL_MS = 4 * 60 * 1e3;
function resolveToken(token) {
  return __async(this, null, function* () {
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
    if (inFlight)
      return inFlight;
    const proxyUrl = `https://${config2.shopDomain}/apps/twc-sdk/auth/token`;
    const request = axios.get(proxyUrl).then(
      (response) => {
        var _a, _b, _c, _d;
        inFlight = null;
        if (!((_a = response.data) == null ? void 0 : _a.success) || !((_c = (_b = response.data) == null ? void 0 : _b.data) == null ? void 0 : _c.access_token)) {
          throw new Error(
            `TWC SDK: Proxy auth failed \u2014 ${((_d = response.data) == null ? void 0 : _d.message) || "unknown error"}`
          );
        }
        const accessToken = response.data.data.access_token;
        cachedToken = accessToken;
        cacheExpiry = Date.now() + CACHE_TTL_MS;
        return accessToken;
      },
      (error) => {
        inFlight = null;
        throw error;
      }
    );
    inFlight = request;
    return request;
  });
}
function invalidateToken() {
  cachedToken = null;
  cacheExpiry = 0;
}
function getCachedToken() {
  return cachedToken;
}
var axiosInstance = axios.create({
  baseURL: "https://api.au-aws.thewishlist.io/services"
});
function authorizationOf(config2) {
  var _a, _b, _c;
  const header = (_c = (_a = config2.headers) == null ? void 0 : _a.Authorization) != null ? _c : (_b = config2.headers) == null ? void 0 : _b.authorization;
  return typeof header === "string" ? header : void 0;
}
axiosInstance.interceptors.response.use(void 0, (error) => __async(void 0, null, function* () {
  var _a;
  const config2 = error.config;
  if (((_a = error.response) == null ? void 0 : _a.status) !== 401 || !config2 || config2._twcRetried) {
    return Promise.reject(error);
  }
  const cachedToken2 = getCachedToken();
  if (!cachedToken2 || authorizationOf(config2) !== `Bearer ${cachedToken2}`) {
    return Promise.reject(error);
  }
  config2._twcRetried = true;
  invalidateToken();
  let freshToken;
  try {
    freshToken = yield resolveToken();
  } catch (e) {
    return Promise.reject(error);
  }
  config2.headers.Authorization = `Bearer ${freshToken}`;
  return axiosInstance.request(config2);
}));

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

// src/anonymous/identifier.ts
var SHOPIFY_ANALYTICS_COOKIE = "_shopify_y";
var TWC_ANONYMOUS_COOKIE = "twc_awid";
var ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
function readCookie(name) {
  if (typeof document === "undefined")
    return null;
  let jar;
  try {
    jar = document.cookie || "";
  } catch (e) {
    return null;
  }
  const prefix = `${name}=`;
  for (const entry of jar.split(";")) {
    const candidate = entry.trim();
    if (!candidate.startsWith(prefix))
      continue;
    const raw = candidate.slice(prefix.length);
    if (!raw)
      return null;
    try {
      return decodeURIComponent(raw) || null;
    } catch (e) {
      return raw;
    }
  }
  return null;
}
function writeCookie(name, value) {
  if (typeof document === "undefined")
    return;
  const isSecureContext = typeof location !== "undefined" && location.protocol === "https:";
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax` + (isSecureContext ? `; Secure` : "");
  } catch (e) {
  }
}
function toHex(value, width) {
  let hex = value.toString(16);
  while (hex.length < width)
    hex = `0${hex}`;
  return hex;
}
function mintIdentifier() {
  const webCrypto = typeof globalThis !== "undefined" ? globalThis.crypto : void 0;
  if (typeof (webCrypto == null ? void 0 : webCrypto.randomUUID) === "function") {
    return webCrypto.randomUUID();
  }
  if (typeof (webCrypto == null ? void 0 : webCrypto.getRandomValues) === "function") {
    const bytes = new Uint8Array(16);
    webCrypto.getRandomValues(bytes);
    bytes[6] = bytes[6] & 15 | 64;
    bytes[8] = bytes[8] & 63 | 128;
    const hex = [];
    for (let i = 0; i < bytes.length; i++) {
      hex.push(toHex(bytes[i], 2));
    }
    return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
  }
  const chunk = (length) => {
    let out = "";
    while (out.length < length) {
      out += toHex(Math.floor(Math.random() * 65536), 4);
    }
    return out.slice(0, length);
  };
  return `${chunk(8)}-${chunk(4)}-4${chunk(3)}-${chunk(4)}-${chunk(12)}`;
}
function resolveAnonymousIdentifier() {
  const shopifyAnalyticsId = readCookie(SHOPIFY_ANALYTICS_COOKIE);
  if (shopifyAnalyticsId)
    return shopifyAnalyticsId;
  const existing = readCookie(TWC_ANONYMOUS_COOKIE);
  if (existing)
    return existing;
  const minted = mintIdentifier();
  writeCookie(TWC_ANONYMOUS_COOKIE, minted);
  return readCookie(TWC_ANONYMOUS_COOKIE) ? minted : null;
}

// src/anonymous/anonymousState.ts
var WISHLIST_ID_KEY = "twc_anonymous_wishlist_id";
var MERGED_KEY = "twc_anonymous_wishlist_merged";
var inMemoryWishlistId = null;
var inMemoryMerged = false;
function localStore() {
  try {
    return typeof localStorage !== "undefined" ? localStorage : null;
  } catch (e) {
    return null;
  }
}
function sessionStore() {
  try {
    return typeof sessionStorage !== "undefined" ? sessionStorage : null;
  } catch (e) {
    return null;
  }
}
function getAnonymousWishlistId() {
  var _a;
  try {
    const stored = (_a = localStore()) == null ? void 0 : _a.getItem(WISHLIST_ID_KEY);
    if (stored)
      return stored;
  } catch (e) {
  }
  return inMemoryWishlistId;
}
function setAnonymousWishlistId(id) {
  var _a;
  inMemoryWishlistId = id;
  try {
    (_a = localStore()) == null ? void 0 : _a.setItem(WISHLIST_ID_KEY, id);
  } catch (e) {
  }
}
function clearAnonymousWishlistId() {
  var _a;
  inMemoryWishlistId = null;
  try {
    (_a = localStore()) == null ? void 0 : _a.removeItem(WISHLIST_ID_KEY);
  } catch (e) {
  }
}
function hasMergedThisSession() {
  var _a;
  try {
    if (((_a = sessionStore()) == null ? void 0 : _a.getItem(MERGED_KEY)) === "true")
      return true;
  } catch (e) {
  }
  return inMemoryMerged;
}
function markMergedThisSession() {
  var _a;
  inMemoryMerged = true;
  try {
    (_a = sessionStore()) == null ? void 0 : _a.setItem(MERGED_KEY, "true");
  } catch (e) {
  }
}
function resetAnonymousWishlistState() {
  var _a;
  clearAnonymousWishlistId();
  inMemoryMerged = false;
  try {
    (_a = sessionStore()) == null ? void 0 : _a.removeItem(MERGED_KEY);
  } catch (e) {
  }
}

// src/wishlistService/getOrCreateAnonymous.ts
function getOrCreateAnonymous(obj) {
  if (!isAnonymousWishlistEnabled()) {
    if (obj.onSuccess)
      obj.onSuccess(null);
    return;
  }
  const onlineSessionID = resolveAnonymousIdentifier();
  if (!onlineSessionID) {
    if (obj.onSuccess)
      obj.onSuccess(null);
    return;
  }
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(`/wsservice/api/wishlists/anonymous`, void 0, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-TWC-Tenant": obj.tenant
      },
      params: { onlineSessionID }
    });
  }).then((response) => {
    var _a;
    if ((_a = response.data) == null ? void 0 : _a.id) {
      setAnonymousWishlistId(response.data.id);
    }
    if (obj.onSuccess) {
      obj.onSuccess(response.data);
    }
  }).catch((error) => {
    if (obj.onError) {
      obj.onError((error == null ? void 0 : error.response) || error);
    }
  });
}

// src/wishlistService/mergeOnLogin.ts
var mergeInFlight = false;
function mergeOnLogin(obj) {
  const noop = () => {
    if (obj.onSuccess)
      obj.onSuccess(null);
  };
  if (!isAnonymousWishlistEnabled() || hasMergedThisSession() || mergeInFlight) {
    noop();
    return;
  }
  const anonymousWishlistId = obj.anonymousWishlistId || getAnonymousWishlistId();
  if (!anonymousWishlistId || !obj.customerEmail) {
    noop();
    return;
  }
  const mergeWishlistBody = {
    anonymousWishlistId,
    customerEmail: obj.customerEmail
  };
  const onlineSessionID = resolveAnonymousIdentifier();
  if (onlineSessionID)
    mergeWishlistBody.onlineSessionID = onlineSessionID;
  if (obj.customerRef)
    mergeWishlistBody.customerRef = obj.customerRef;
  if (obj.wishlistRef)
    mergeWishlistBody.wishlistRef = obj.wishlistRef;
  if (obj.wishlistName)
    mergeWishlistBody.wishlistName = obj.wishlistName;
  mergeInFlight = true;
  const done = () => {
    mergeInFlight = false;
  };
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(
      `/wsservice/api/wishlists/merge`,
      mergeWishlistBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    done();
    markMergedThisSession();
    clearAnonymousWishlistId();
    if (obj.onSuccess) {
      obj.onSuccess(response.data || null);
    }
  }).catch((error) => {
    var _a;
    done();
    if (((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) === 404) {
      markMergedThisSession();
      noop();
      return;
    }
    if (obj.onError) {
      obj.onError((error == null ? void 0 : error.response) || error);
    }
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

export { createBulkCustomers, createCustomer, createWishlist, createWishlistItem, customerLookup, deleteAllWishlist, deleteCustomer, deleteCustomerByID, deleteWishlist, deleteWishlistByID, deleteWishlistByRef, deleteWishlistItemByID, deleteWishlistItemByRef, getAnonymousWishlistId, getCustomerByID, getCustomerByRef, getCustomersWithFlag, getItemsPopularity, getOrCreateAnonymous, getWishlist, getWishlistByCustomer, getWishlistByCustomerID, getWishlistByCustomerRef, getWishlistByID, getWishlistByRef, getWishlistItemByID, getWishlistItemByRef, getWishlistItems, initTWC, invalidateToken, mergeOnLogin, resetAnonymousWishlistState, resetWishlistItemFlag, resolveAnonymousIdentifier, resolveToken, updateCustomer, updateCustomerByID, updateCustomerByRef, updateWishlist, updateWishlistByID, updateWishlistByRef, updateWishlistItem, updateWishlistItemByID, updateWishlistItemByRef };

const baseURL = "https://api.au-sandbox.thewishlist.io/services";

async function getWishlistData(token, tenant, wishlistID) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        "X-TWC-Tenant": tenant
    };
    // const baseURL=process.env.baseURL;
    const resp = await fetch(`${baseURL}/wsservice/api/wishlist/items?id=${wishlistID}`, { method: 'GET', headers: headers });
    if (resp.ok)
        return resp.json();
    else
        throw resp
}
function getWishlistByID(obj) {
    const response = getWishlistData(obj.token, obj.tenant, obj.wishlistID)
    response.then(data => {
        obj.callbackFn(data)
    })
        .catch(error => {
            obj.errorFn(error)
        });
}


let onSuccess = function (lists) {
    // Successfully fetched all lists 
    console.log("Fetched all Lists", lists);
}
// Define error callback
let onError = function (error) {
    console.log("Error while fetching all Lists", error);
}
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyQVBqZzRCRlVNdHgtQ0F3SElQZklVYkF3TVdFcjg5STVYZ29JR25KQnQ0In0.eyJleHAiOjE2ODg2MzY3OTMsImlhdCI6MTY4ODYxODc5MywianRpIjoiZmZkNDI3NWUtMTZhMC00NTM1LThhZmItOTRmNjU3MWMwZjgwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmF1LXNhbmRib3gudGhld2lzaGxpc3QuaW8vYXV0aC9yZWFsbXMvc3VuaWxzX2VsZWN0cm9uaWNzIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjkyNjFlMDc4LWVhMzUtNDQxOC04ODc5LWVkNjI3NjgxYWRmZCIsInR5cCI6IkJlYXJlciIsImF6cCI6InR3Y19hZG1pbiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2NvbnNvbGUuc2FuZGJveC50aGV3aXNobGlzdC5pbyIsImh0dHA6Ly9hcGkuc2FuZGJveC50aGV3aXNobGlzdC5pbyJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImNsaWVudElkIjoidHdjX2FkbWluIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRIb3N0IjoiMTkyLjE2OC44MC4xNDIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtdHdjX2FkbWluIiwiY2xpZW50QWRkcmVzcyI6IjE5Mi4xNjguODAuMTQyIn0.dNdbK6zkkaWdEDw06ba-4-HxSRscQglz0qNE9mBtINMZcWcJgT4awaDChAmGXo7wMCQX0lBBEmDEmFHaPnHLdnOjJP6dXvgBFLaaed_EInhQUEhoNSofk4KKs7FUoKXocvWN7yDzPKVDc8mkv40yGRAIyQifRa7d7WwsdhWrP6dp_PHzoMuox22DK3i9LtI4g6LhljIHMXmx_Lc49QIdiNBazzlCxaJ9kl4XXpDjLMZJeggpf61G8WYLzkvUn9W5i0y3mebE-FjtqEo4tb9E1TWCB_1CXK1Z4ZtzutZgM48gjnw1-8uzUwt2b2bFsEm5AZIIyRyadAkBSkgZb4XHKw';
const tenant = "sunils_electronics";
const wishlistID = "ff95e17a-2c47-472d-bcfc-244f2e1b2b0d";
getWishlistByID({
    callbackFn: onSuccess,
    errorFn: onError,
    token,
    tenant,
    wishlistID
});


require('dotenv').config();
const getWishlistByID=require("./wishlistService/getWishlistByID")
const getWishlistByCustomerID=require("./wishlistService/getWishlistByCustomerID")
const getWishlistByCustomerRef=require('./wishlistService/getWishlistByCustomerRef');
const getWishlistByRef=require('./wishlistService/getWishlistByRef');
const getWishlist=require("./wishlistService/getWishlist")
const getWishlistItemByID=require("./wishlistService/getWishlistItemByID")
const getWishlistItemByRef=require("./wishlistService/getWishlistItemByRef")
const getWishlistItem=require("./wishlistService/getWishlistItem")
const updateWishlistItemByRef=require('./wishlistService/updateWishlistItemByRef');
const getWishlistByCustomer=require("./wishlistService/getWishlistByCustomer")
const createWishlistItem = require('./wishlistService/createWishlistItem');
const createWishlist=require('./wishlistService/createWishlist');
const updateWishlist=require('./wishlistService/updateWishlist');
const updateWishlistByID=require('./wishlistService/updateWishlistByID');
const updateWishlistByRef=require('./wishlistService/updateWishlistByRef');
const updateWishlistItem=require('./wishlistService/updateWishlistItem');
const updateWishlistItemByID=require('./wishlistService/updateWishlistItemByID');
const deleteWishlistItemByID=require('./wishlistService/deleteWishlistItemByID');
const deleteWishlistItemByRef=require('./wishlistService/deleteWishlistItemByRef')
const deleteWishlist=require('./wishlistService/deleteWishlist');
const deleteAllWishlist=require('./wishlistService/deleteAllWishlist');
const deleteWishlistByID=require("./wishlistService/deleteWishlistByID");
const deleteWishlistByRef=require('./wishlistService/deleteWishlistByRef');
const getCustomersWithFlag=require('./WishlistService/getCustomersWithFlag');
const resetWishlistItemFlag=require('./WishlistService/resetWishlistItemFlag');

const customerLookup=require('./customerService/customerLookup');
const getCustomerByID=require('./customerService/getCustomerByID');
const getCustomerByRef=require('./customerService/getCusotmerByRef');
const createCustomer=require('./customerService/createCustomer');
const updateCustomerByID=require('./customerService/updateCustomerByID');
const updateCustomer=require('./customerService/updateCustomer');
const updateCustomerByRef=require('./customerService/updateCustomerByRef');
const deleteCustomer=require('./customerService/deleteCustomer');
const deleteCustomerByID=require('./customerService/deleteCustomerByID');
const createBulkCustomers=require('./customerService/createBulkCustomers');

const data=require('./data/data')

const javascriptAPIs = {
    getWishlistByID,
    getWishlistByCustomerID,
    getWishlistByCustomerRef,
    getWishlist,
    getWishlistByRef,
    getWishlistByCustomer, 
    createWishlist,
    updateWishlist,
    updateWishlistByID,
    updateWishlistByRef,
    deleteWishlist,
    deleteAllWishlist,
    deleteWishlistByID,
    deleteWishlistByRef,
    getWishlistItemByID,
    getWishlistItemByRef,
    getWishlistItem,
    createWishlistItem,
    updateWishlistItem,
    updateWishlistItemByID,
    updateWishlistItemByRef,
    deleteWishlistItemByID,
    deleteWishlistItemByRef,
    getCustomersWithFlag,
    resetWishlistItemFlag,

    createCustomer,
    updateCustomer,
    updateCustomerByRef,
    updateCustomerByID,
    customerLookup,
    getCustomerByID,
    getCustomerByRef,
    deleteCustomer,
    validateCustomer,
    deleteCustomerByID,
    createBulkCustomers
};
  let onSuccess = function (lists) {
    // Successfully fetched all lists 
    console.log("Fetched all Lists success", lists);
}
// Define error callback
let onError = function (error) {
    console.log("Error while fetching all Lists", error);
}
const token = process.env.token;
const tenant = "sunils_electronics";
 
// const wishlistItemID='632be09d-4327-4c8d-b56f-fcfac3170288';
const wishlistItemID='70a43d88-cf3a-43ac-8235-38da77f345b1';
// const wishlistItemID= '298bb30e-3446-4c52-8274-4d65c705a262',
// const wishlistItemID ="bc900d93-0ed3-45d6-8519-331df3b50782";
// const wishlistItemRef = "Item 6";
const wishlistItemRef= 'ITEM791'
// const wishlistID = "0cb1529c-2bf8-45d2-a124-5a97fa692ab6";
// const wishlistID = "ff95e17a-2c47-472d-bcfc-244f2e1b2b0d";
// const wishlistID="af09405d-cca1-4eb2-9ff8-da953bf18d20"; //justin
// const wishlistID="015ff6b4-5e9c-442e-a1d6-eabc88512e78"; //justin 2
const wishlistID='149e621d-05f2-44a8-97d2-a51cf420bd0d';
// const  wishlistRef= 'WISH792';
const wishlistRef= 'WISH794';
// const customerID = "98d9a379-c1ab-40b0-a044-b2cd73e27551";  //ronald
// const customerID="0f94eef6-b832-429e-9ecd-dd35c2d6e7be"; //sunil
// const customerID="158e1e60-2996-424a-bb99-b918bcd367a1"; //Athul
// const customerID="f98e5013-6361-4540-8ffc-d73ba27d1e44"; //justin
const customerID= 'cfa7098d-ef5e-4404-87c7-4050e1bee890'; 
// const customerRef= 'Afzal791';
const customerRef= 'AfzalB791'
const addressID='ca9dde30-8d53-4ef2-a557-9cb8e784a2ea';


const emailRequest=true;
const requestID="string";

const firstName="sunil";
const lastName="kumar";
const email="sunilmssss2016@gmail.com";
const phone="623362386238";
const mobile="623362386238";
// const customerRef= 'sunil1031';
// const customerRef="Athul791";

const newWishlistBody=data.newWishlistBody;
const updateWishlistBody=data.newWishlistBody
const updateWishlistByIDBody=data.updateWishlistByIDBody;
const createWishlistItembody=data.createWishlistItembody
const updateWishlistItemBody=data.updateWishlistItemBody;
const createCustomerBody=data.createCustomerBody;
const updateCustomerBody=data.createCustomerBody;

javascriptAPIs.getCustomerByID({
    onSuccess,
    onError,
    token,
    tenant, 
    // orderID,
    customerID,
    newLocationBody
})

module.exports=javascriptAPIs;

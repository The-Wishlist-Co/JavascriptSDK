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
const searchWishlist=require("./wishlistService/searchWishlist")
const createWishlistItem = require('./wishlistService/createWishlistItem');
const createNewWishlist=require('./wishlistService/createNewWishlist');
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

const createNewStock=require('./inventoryService/createNewStock');
const getVariantStock=require('./inventoryService/getVariantStock');
const getStockLevel=require('./inventoryService/getStockLevel');
const updateStock=require('./inventoryService/updateStock');
const createNewLocation=require('./inventoryService/createNewLocation');
const getLocation=require('./inventoryService/getLocation');
const updateLocation=require('./inventoryService/updateLocation');
const updateLocationByID=require('./inventoryService/updateLocationByID');
const updateLocationByRef=require('./inventoryService/updateLocationByRef');
const deleteLocation=require('./inventoryService/deleteLocation');
const validateLocation=require('./inventoryService/validateLocation');
const createBulkLocations=require('./inventoryService/createBulkLocations');
const updateStockByID=require('./inventoryService/updateStockByID');
const updateStockByRef=require('./inventoryService/updateStockByRef');
const validateStock=require('./inventoryService/validateStock');
const getStockLevelByID=require('./inventoryService/getStockLevelByID');
const createBulkStock=require('./inventoryService/createBulkStock');

const createNewBatch=require('./impexService/createNewBatch');
const updateBatch=require('./impexService/updateBatch');
const getBatch=require('./impexService/getBatch');
const changeBatchState=require('./impexService/changeBatchState');
const batchLookup=require('./impexService/batchLookup');
const resourceLookup=require('./impexService/resourceLookup');
const createResource=require('./impexService/createResource');

const createPrice=require('./priceService/createPrice');
const getPrice=require('./priceService/getPrice');
const updatePrice=require('./priceService/updatePrice');
const updatePriceByID=require('./priceService/updatePriceByID');
const updatePriceByRef=require('./priceService/updatePriceByRef');
const validatePrice=require('./priceService/validatePrice');
const deletePrice=require('./priceService/deletePrice');
const getAllPrices=require('./priceService/getAllPrices');

const createNewOrder=require('./orderService/createNewOrder');
const getOrder=require('./orderService/getOrder');
const updateOrder=require('./orderService/updateOrder');
const updateOrderByID=require('./orderService/updateOrderByID');
const updateOrderByRef=require('./orderService/updateOrderByRef');
const searchOrder=require('./orderService/searchOrder');
const validateOrder=require('./orderService/validateOrder');
const getOrderItems=require('./orderService/getOrderItems');
const createOrderItems=require('./orderService/createOrderItems');
const updateOrderItems=require('./orderService/updateOrderItems');
const updateOrderItemsByID=require('./orderService/updateOrderItemsByID');
const updateOrderItemsByRef=require('./orderService/updateOrderItemsByRef');
const searchOrderItemsEntry=require('./orderService/searchOrderItemsEntry');
const deleteOrderItemsEntry=require('./orderService/deleteOrderItemsEntry');
const validateOrderItems=require('./orderService/validateOrderItems');

const data=require('./data/data')

const javascriptAPIs = {
    getWishlistByID,
    getWishlistByCustomerID,
    getWishlistByCustomerRef,
    getWishlist,
    getWishlistByRef,
    searchWishlist,
    createNewWishlist,
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

    getProductByID,
    getProductByRef,
    getProductByRef2,
    productSearch,
    validateProductID,
    validateProductRef,
    validateProductRequest,
    createNewProduct,
    updateProduct,
    updateProductByID,
    updateProductByRef,
    createBulkProduct,
    getEmailResultData,
    getMockChartData,
    deleteProductByID,
    deleteProductByRef,
    getVariantByID,
    getProductVariants,
    getVariantByVariantID,
    getVariantByRef,
    getVariantByRef2,
    createProductVariant,
    updateProductVariant,
    updateVariantByID,
    updateVariantByRef,
    updateVariantPrice,
    validateProductVariant,
    deleteVariantByID,
    deleteVariant,
    deleteVariantByRef,

    createNewCustomer,
    updateCustomer,
    updateCustomerByRef,
    updateCustomerByID,
    customerLookup,
    getCustomerByID,
    getCustomerByRef,
    addCustomerAddress,
    deleteCustomer,
    validateCustomer,
    deleteCustomerByID,
    deleteCustomerAddress,
    createBulkCustomers,
    syncEmarsysCustomer,
    
    getLocation,
    createNewLocation,
    updateLocation,
    updateLocationByID,
    updateLocationByRef,
    deleteLocation,
    validateLocation,
    createBulkLocations,
    createNewStock,
    getVariantStock,
    getStockLevel,
    getStockLevelByID,
    updateStock,
    updateStockByID,
    updateStockByRef,
    validateStock,
    createBulkStock,

    createNewBatch,
    updateBatch,
    getBatch,
    changeBatchState,
    batchLookup,
    resourceLookup,
    createResource,

    createPrice,
    getPrice,
    updatePrice,
    updatePriceByID,
    updatePriceByRef,
    validatePrice,
    deletePrice,
    getAllPrices,

    createNewOrder,
    getOrder,
    updateOrder,
    updateOrderByID,
    updateOrderByRef,
    searchOrder,
    validateOrder,
    getOrderItems,
    createOrderItems,
    updateOrderItems,
    updateOrderItemsByID,
    updateOrderItemsByRef,
    searchOrderItemsEntry,
    deleteOrderItemsEntry,
    validateOrderItems,
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

// const productID="78478311-0d6f-4b5f-8102-8d04b5c3ebd4";
// const productID="402bbcc3-68d6-4507-8800-aa37846f64ac";
// const productID='7bc473fc-6f3f-469b-8c0b-bf0445e083eb'
const productID="7a8dcd86-706b-4c91-bdf7-73099d07b1e2";
// const productID='78478311-0d6f-4b5f-8102-8d04b5c3ebd4';
// const stockID="c66f285e-c5a0-4293-813b-3d5743df3bff";
// const stockID="6f1b2385-b8a7-4a91-97f5-8f75650e2d7d"
const stockID="c138ed4b-26a8-4921-b523-56e291daa65c";
// const stockRef="STOCK1232"
// const stockID='ffa0ec06-6852-40fb-bcee-0dc65dfafbe9';
const stockRef='STOCK795'
// const variantID="0b312f0d-2610-4bb0-8ff1-7e48805ad7a3"
// const variantID="edf30086-c9d8-4f5d-9a51-42c5f3cdb78b";
// const variantID='e33d5325-fca8-4799-b58e-cc9779017127';
// const variantID='53684834-b363-4b2d-9306-078ede55b1d2';
const variantID="6b77f7b1-c8d0-4d8b-8c7a-0c6e4a7f7b8b";
// const priceID= "36788fe9-dd57-45c7-a468-6d202f6fa632";
const priceID= 'eed8064c-ec8b-4b64-83c2-b4c5fb10087d';
const priceRef= 'PRICE243';
const orderID='4edf1cee-e9b8-42d1-ab27-6f2c63ca480f';
// const orderID="e8206821-cf2b-4504-8c4f-6ee1aaad9bab";
const orderRef='ORDER7914';
// const entryID='cdb33193-0e14-4ebe-9999-23ea454dafa8';
const entryID= '9ee3dce9-77cd-4c2c-9c00-86fe94ae0fbb';
const entryRef= 'ENTRY791';
// const variantRef="TEST1234";
const variantRef= 'VARIANT1234';
const gtin = "1000000000000";
// const productRef="PRD6237996";
// const productRef="10000008888jjj"
// const productRef="PRD6237986";
// const productRef='PRD6237980';
// const productRef= "PRD6237955"
const productRef='PRD6237996'
//const productRef="PRD6237978"
// const wishlistItemID = "2950c3b3-9381-40b0-b596-469047012a2e";


// const locationRef='ref1';
// const locationID='422d526d-fc64-4b78-a56a-e40544425f18';
// const locationRef= 'LOC43821'
// const locationRef="LOC791"
const locationRef="LOC4382";
// const locationRef="LOC43821";
const locationID="3a19b4d6-56b4-4b5d-80e7-de595f9d571a";
// const locationID='98c8aa91-8a13-4053-89e7-eaadc70a6ef5';
const batchID="6d15b1e5-7e08-4014-b8b9-0fe813bcc26c";
// const batchID='a55b626c-d458-47ed-9fca-7ec431498d73';
// const batchRef= 'BATCH791';
const batchRef= 'BATCH792';
const state="READY";
// const state="CREATED"
// const state="PROCESSING"
// const state ="ABORTED";
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
const newAddress=data.newAddress;
const newProductBody=data.newProductBody;
const updateProductBody=data.newProductBody;
const productVariantBody=data.productVariantBody;
const updateProductVariantBody=data.productVariantBody;
const variantPrice=data.variantPrice;
const newStockBody=data.newStockBody;
const updateStockBody=data.newStockBody;
const newLocationBody=data.newLocationBody;
const updateLocationBody=data.newLocationBody;
const newBatchBody=data.newBatchBody;
const updateBatchBody=data.newBatchBody;
const bulkProductBody=data.bulkProductBody;
const createBulkCustomerBody=data.createBulkCustomerBody;
const emarsysCustomerBody=data.emarsysCustomerBody;
const bulkLocationBody=data.bulkLocationBody;
const bulkStockBody=data.bulkStockBody;
const newResourceBody=data.newResourceBody;
const priceBody=data.priceBody;
const updatePriceBody=data.updatePriceBody;
const createOrderBody=data.createOrderBody;
const orderItemsBody=data.orderItemsBody;

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

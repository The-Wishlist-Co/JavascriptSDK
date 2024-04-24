const createWishlistItembody={
    "wishlistId": '149e621d-05f2-44a8-97d2-a51cf420bd0d',
    "wishlistItemRef":"ITEM791",
    "product": {
        "productRef": '149e621d-05f2-44a8-97d2-a51cf420bd0dprod',
        "selectedVariantRef": '149e621d-05f2-44a8-97d2-a51cf420bd0dref'
    },
    "attributeGroups": {
        "POS_attributes": {
            "attributes": {
                "POS_ref": "POS001",
                "store_id": "STORE001"
            },
            "description": "POS related attidional information"
        }
    }
}
const updateWishlistItemBody={
    // "id":'632be09d-4327-4c8d-b56f-fcfac3170288',
    "wishlistId": '149e621d-05f2-44a8-97d2-a51cf420bd0d',
    "product": {
        "productRef": "af09405d-cca1-4eb2-9ff8-da953bf18d20prod",
        "selectedVariantRef": "af09405d-cca1-4eb2-9ff8-da953bf18d20ref"
    },
    "attributeGroups": {
        "POS_attributes": {
            "attributes": {
                "POS_ref": "POS001",
                "store_id": "STORE001"
            },
            "description": "POS1 related attidional information"
        }
    }
}
const createCustomerBody={
    "customerRef": "Afzal791",
    "firstName": "Afzal",
    "lastName": "M",
    "email": "afzal791@gmail.com",
    "phone": "25452548748",
    "mobile": "97458587480",
    "dob": "22-11-1995",
    "addresses": [
        {
            "id": "ac08c1e1-396d-4959-83e3-a89d22cb1486",
            "firstName": "Cust",
            "lastName": "Test",
            "address1": "Hennigweg 3",
            "city": "Munich",
            "province": "Bayern",
            "country": "Germany",
            "postcode": "85737",
            "phone": "0151 7445 6927",
            "email": "cust55dd7@email.com",
            "provinceCode": "BY",
            "countryCode": "DE",
            "defaultAddress": true
        }
    ],
    "defaultAddress": {
        "id": "ac08c1e1-396d-4959-83e3-a89d22cb1486",
        "firstName": "Cust",
        "lastName": "Test",
        "address1": "Hennigweg 3",
        "city": "Munich",
        "province": "Bayern",
        "country": "Germany",
        "postcode": "85737",
        "phone": "0151 7445 6927",
        "email": "cust55dd7@email.com",
        "provinceCode": "BY",
        "countryCode": "DE",
        "defaultAddress": true
    },
    "active": true,
    "accepts_marketing": false,
    "marketing_preferences_updated_at": "2023-02-08T15:49:09.295Z",
    "customer_state": "enabled",
    "attributeGroups": {},
    "taxExempt": false,
    "taxExemptions": [],
    "verified_email": false,
    "createdDate": "2023-02-08T15:49:09.295Z",
    "lastModifiedDate": "2023-02-08T15:49:09.295Z",
    "privacy": false,
    "vipStatus": false
}

const createBulkCustomerBody=[
    {
        "customerRef": "AfzalA791",
        "firstName": "Afzal",
        "lastName": "MA",
        "email": "afzala791@gmail.com",
        "phone": "25452548748",
        "mobile": "97458587480",
        "dob": "22-11-1995",
        "addresses": [
            {
                "id": "ac08c1e1-396d-4959-83e3-a89d22cb1486",
                "firstName": "Cust",
                "lastName": "Test",
                "address1": "Hennigweg 3",
                "city": "Munich",
                "province": "Bayern",
                "country": "Germany",
                "postcode": "85737",
                "phone": "0151 7445 6927",
                "email": "cust55dd7@email.com",
                "provinceCode": "BY",
                "countryCode": "DE",
                "defaultAddress": true
            }
        ],
        "defaultAddress": {
            "id": "ac08c1e1-396d-4959-83e3-a89d22cb1486",
            "firstName": "Cust",
            "lastName": "Test",
            "address1": "Hennigweg 3",
            "city": "Munich",
            "province": "Bayern",
            "country": "Germany",
            "postcode": "85737",
            "phone": "0151 7445 6927",
            "email": "cust55dd7@email.com",
            "provinceCode": "BY",
            "countryCode": "DE",
            "defaultAddress": true
        },
        "active": true,
        "accepts_marketing": false,
        "marketing_preferences_updated_at": "2023-02-08T15:49:09.295Z",
        "customer_state": "enabled",
        "attributeGroups": {},
        "taxExempt": false,
        "taxExemptions": [],
        "verified_email": false,
        "createdDate": "2023-02-08T15:49:09.295Z",
        "lastModifiedDate": "2023-02-08T15:49:09.295Z",
        "privacy": false,
        "vipStatus": false
    },
    {
        "customerRef": "AfzalB791",
        "firstName": "Afzal",
        "lastName": "MB",
        "email": "afzalb791@gmail.com",
        "phone": "25452548748",
        "mobile": "97458587480",
        "dob": "22-11-1995",
        "addresses": [
            {
                "id": "ac08c1e1-396d-4959-83e3-a89d22cb1486",
                "firstName": "Cust",
                "lastName": "Test",
                "address1": "Hennigweg 3",
                "city": "Munich",
                "province": "Bayern",
                "country": "Germany",
                "postcode": "85737",
                "phone": "0151 7445 6927",
                "email": "cust55dd7@email.com",
                "provinceCode": "BY",
                "countryCode": "DE",
                "defaultAddress": true
            }
        ],
        "defaultAddress": {
            "id": "ac08c1e1-396d-4959-83e3-a89d22cb1486",
            "firstName": "Cust",
            "lastName": "Test",
            "address1": "Hennigweg 3",
            "city": "Munich",
            "province": "Bayern",
            "country": "Germany",
            "postcode": "85737",
            "phone": "0151 7445 6927",
            "email": "cust55dd7@email.com",
            "provinceCode": "BY",
            "countryCode": "DE",
            "defaultAddress": true
        },
        "active": true,
        "accepts_marketing": false,
        "marketing_preferences_updated_at": "2023-02-08T15:49:09.295Z",
        "customer_state": "enabled",
        "attributeGroups": {},
        "taxExempt": false,
        "taxExemptions": [],
        "verified_email": false,
        "createdDate": "2023-02-08T15:49:09.295Z",
        "lastModifiedDate": "2023-02-08T15:49:09.295Z",
        "privacy": false,
        "vipStatus": false
    }
]
const newAddress= {   
    "firstName": "Athul",
    "lastName": "Bala",
    "address1": "Nila Technopark 3",
    "city": "Trivandrum",
    "province": "Kerala",
    "country": "India",
    "postcode": "689757",
    "phone": "974587878",
    "email": "athul987@email.com",
    "provinceCode": "KL",
    "countryCode": "IND",
    "defaultAddress": true
}

const newProductBody={
    "title": "Adult Test Summer Cloth",
    "description": "This is a product test for justin electronics env",
    "gtin": "1000000000000",
    "gtinType": "GTIN13",
    "status": "APPROVED",
    "disabled": false,
    "expirationDate": "2025-11-13T21:56:06.341+0000",
    "link": "https://www.bigw.com.au/product/brilliant-basics-boys-skeleton-pyjama-set-black/p/1193835-black/",
    "mobileLink": "https://www.bigw.com.au/product/brilliant-basics-boys-skeleton-pyjama-set-black/p/1193835-black/",
    "availability": "available",
    "color": "red",
    "deleted": false,
    "digitalProduct": false,
    "inventoryTracking": "none",
    "variantsAvailable": true,
    "variance": [],
    "variantOptions": [],
    "attributeGroups": {
        "additionalProp1": {
            "attribute_group": "string",
            "is_obsolete": true,
            "attributes": {
                "additionalProp1": {
                    "attribute_value": "string",
                    "value_type": "INTEGER"
                }
            }
        }
    },
    "backOrderable": false,
    "productRef": "PRD6237980"
}

const bulkProductBody=[
    {
        "title": "Women Test Summer Cloth",
        "description": "This is a product test for justin electronics env",
        "gtin": "1000000000000",
        "gtinType": "GTIN13",
        "status": "APPROVED",
        "disabled": false,
        "expirationDate": "2025-11-13T21:56:06.341+0000",
        "link": "https://www.bigw.com.au/product/brilliant-basics-boys-skeleton-pyjama-set-black/p/1193835-black/",
        "mobileLink": "https://www.bigw.com.au/product/brilliant-basics-boys-skeleton-pyjama-set-black/p/1193835-black/",
        "availability": "available",
        "color": "red",
        "deleted": false,
        "digitalProduct": false,
        "inventoryTracking": "none",
        "variantsAvailable": true,
        "variance": [],
        "variantOptions": [],
        "attributeGroups": {
            "additionalProp1": {
                "attribute_group": "string",
                "is_obsolete": true,
                "attributes": {
                    "additionalProp1": {
                        "attribute_value": "string",
                        "value_type": "INTEGER"
                    }
                }
            }
        },
        "backOrderable": false,
        "productRef": "PRD6237983"
    },
    {
        "title": "Infant Test Summer Cloth",
        "description": "This is a product test for justin electronics env",
        "gtin": "1000000000000",
        "gtinType": "GTIN13",
        "status": "APPROVED",
        "disabled": false,
        "expirationDate": "2025-11-13T21:56:06.341+0000",
        "link": "https://www.bigw.com.au/product/brilliant-basics-boys-skeleton-pyjama-set-black/p/1193835-black/",
        "mobileLink": "https://www.bigw.com.au/product/brilliant-basics-boys-skeleton-pyjama-set-black/p/1193835-black/",
        "availability": "available",
        "color": "red",
        "deleted": false,
        "digitalProduct": false,
        "inventoryTracking": "none",
        "variantsAvailable": true,
        "variance": [],
        "variantOptions": [],
        "attributeGroups": {
            "additionalProp1": {
                "attribute_group": "string",
                "is_obsolete": true,
                "attributes": {
                    "additionalProp1": {
                        "attribute_value": "string",
                        "value_type": "INTEGER"
                    }
                }
            }
        },
        "backOrderable": false,
        "productRef": "PRD6237955"
    }
]
const productVariantBody=
    {
        // "id": "d9befb62-cb3c-4e0c-ac63-da00a96e38cf",
        "title": "Infant Skeleton Pyjama Set - Blue",
        "description": "this is an awesome product",
        "gtin": "TestVAr007",
        "status": "APPROVED",
        "disabled": false,
        "expirationDate": "2021-11-13T21:56:06.341Z",
        "link": "https://www.bigw.com.au/product/brilliant-basics-boys-skeleton-pyjama-set-black/p/1193835-black/",
        "additionalImageLink": "string",
        "mobileLink": "https://www.bigw.com.au/product/brilliant-basics-boys-skeleton-pyjama-set-black/p/1193835-black/",
        "availability": "available",
        "color": "red",
        "deleted": false,
        "digitalProduct": false,
        "variance": {
            "color": "blue",
            "size": "xl"
        },
        "baseProductId": "78478311-0d6f-4b5f-8102-8d04b5c3ebd4",
        "variantOptions": [],
        "attributeGroups": {},
        "createdDate": "2023-07-10T05:37:52.171Z",
        "lastModifiedDate": "2023-07-10T05:37:52.171Z",
        "productRef":"VARIANT1234"
    }
    const variantPrice={
        "currencyCode": "INR",
        "price": 20,
        "salePrice": 22
      }

      const newStockBody= { 
        "createdTime": "2023-07-10T08:59:10.742Z",
        "deleted": true,
        "excludedQuantity": 0,
        "futureStock": true,
        "locationId": "string",
        "locationRef": "string",
        "modifiedTime": "2023-07-10T08:59:10.742Z",
        "productId": "78478311-0d6f-4b5f-8102-8d04b5c3ebd4",
        "productRef": "PRD6237996",
        "productVariantId": "6b77f7b1-c8d0-4d8b-8c7a-0c6e4a7f7b8",
        "productVariantRef": "NEWTEST1234",
        "reserved": 20,
        "status": "IN_STOCK",
        "stockDate": "2023-07-10T08:59:10.742Z",
        "stockOnHand": 60,
        "stockRef": "STOCK795"
      }
      const bulkStockBody=[{ 
        "createdTime": "2023-07-10T08:59:10.742Z",
        "deleted": true,
        "excludedQuantity": 0,
        "futureStock": true,
        "locationId": "string",
        "locationRef": "string",
        "modifiedTime": "2023-07-10T08:59:10.742Z",
        "productId": "78478311-0d6f-4b5f-8102-8d04b5c3ebd4",
        "productRef": "PRD6237996",
        "productVariantId": "6b77f7b1-c8d0-4d8b-8c7a-0c6e4a7f7b8",
        "productVariantRef": "NEWTEST1234",
        "reserved": 20,
        "status": "IN_STOCK",
        "stockDate": "2023-07-10T08:59:10.742Z",
        "stockOnHand": 60,
        "stockRef": "STOCK7952"
      },{ 
        "createdTime": "2023-07-10T08:59:10.742Z",
        "deleted": true,
        "excludedQuantity": 0,
        "futureStock": true,
        "locationId": "string",
        "locationRef": "string",
        "modifiedTime": "2023-07-10T08:59:10.742Z",
        "productId": "78478311-0d6f-4b5f-8102-8d04b5c3ebd4",
        "productRef": "PRD6237996",
        "productVariantId": "6b77f7b1-c8d0-4d8b-8c7a-0c6e4a7f7b8",
        "productVariantRef": "NEWTEST1234",
        "reserved": 20,
        "status": "IN_STOCK",
        "stockDate": "2023-07-10T08:59:10.742Z",
        "stockOnHand": 60,
        "stockRef": "STOCK7951"
      }]
      const newLocationBody={
        "createdTime": "2023-07-10T11:29:52.269Z",
        "deleted": true,
        "email": "locat@gmail.com",
        "latitude": 0,
        "locationRef": "LOC43821",
        "locationType": "STORE",
        "longitude": 0,
        "modifiedTime": "2023-07-10T11:29:52.269Z",
        "name": "DummyLocation2",
        "url": "test123"
      }
      const bulkLocationBody=[{
        "createdTime": "2023-07-10T11:29:52.269Z",
        "deleted": true,
        "email": "locat@gmail.com",
        "latitude": 0,
        "locationRef": "LOC791",
        "locationType": "STORE",
        "longitude": 0,
        "modifiedTime": "2023-07-10T11:29:52.269Z",
        "name": "DummyLocation2",
        "url": "test123"
      },
      {
        "createdTime": "2023-07-10T11:29:52.269Z",
        "deleted": true,
        "email": "locat@gmail.com",
        "latitude": 0,
        "locationRef": "LOC792",
        "locationType": "STORE",
        "longitude": 0,
        "modifiedTime": "2023-07-10T11:29:52.269Z",
        "name": "DummyLocation3",
        "url": "test123"
      }
    ]
      const newBatchBody={
        "batchRef": "BATCH792",
        "batchState": "CREATED"
      }
      const newResourceBody={
        "batchId": 'a94deb8a-eedb-4f0f-aae5-2a3ba97b3dbe',
        "batchRef": 'yo-10664204',
        "body": {},
        "createdAt": "2023-07-14T08:14:59.600Z",
        "entityType": "customer",
        "identifier": {},
        "importState": "attempted",
        "modifiedAt": "2023-07-14T08:14:59.600Z",
        "operation": "create",
        "validationState": "not_validated"
      }

      const newWishlistBody={
        "customerId": "f98e5013-6361-4540-8ffc-d73ba27d1e44",
        "customerRef": "justin791",
        "deleted": false,
        "description": "Justin's Test23 Wishlist",
        "isPrivate": true,
        "name": "Wishlist323",
        "wishlistItems": [ ],
        "wishlistRef": "WISH794"
      }
      const updateWishlistByIDBody={
        "customerId": "f98e5013-6361-4540-8ffc-d73ba27d1e44",
        "customerRef": "justin791",
        "deleted": false,
        "description": "Justin's Test23 Wishlist",
        "isPrivate": true,
        "name": "Wishlist32",
        "wishlistItems": [ ]
        
      }
      const emarsysCustomerBody={
        "address1": "Nila",
        "city": "Tvm",
        "companyAddress": "Ndz",
        "country": "IND",
        "dob": "22/11/1987",
        "email": "test@gmail.com",
        "firstName": "test",
        "lastName": "test",
        "mobile": "9748747585",
        "mobileOptin": "656869",
        "officeCity": "tvm",
        "officeCountry": "IND",
        "officePhone": "7858425878",
        "officePostcode": "689654",
        "officeProvince": "Kerala",
        "optIn": "123456",
        "phone": "9748521878",
        "postcode": "696584",
        "province": "Kerala"
      }
      const priceBody={
        "active": true,
        "createdDate": "2023-07-24T04:34:08.380Z",
        "currencyCode": "INR",
        "deleted": false,
        "lastModifiedDate": "2023-07-24T04:34:08.380Z",
        "offlineDate": "2023-07-24T04:34:08.380Z",
        "onlineDate": "2023-07-24T04:34:08.380Z",
        "price": 12,
        "priceRef": "PRICE244",
        "productVariantId": '53684834-b363-4b2d-9306-078ede55b1d2',
        "sale": true,
        "salePrice": 0
      }
      const updatePriceBody={
        "id":"36788fe9-dd57-45c7-a468-6d202f6fa632",
        "active": true,
        "createdDate": "2023-07-24T04:34:08.380Z",
        "currencyCode": "INR",
        "deleted": false,
        "lastModifiedDate": "2023-07-24T04:34:08.380Z",
        "offlineDate": "2023-07-24T04:34:08.380Z",
        "onlineDate": "2023-07-24T04:34:08.380Z",
        "price": 12,
        "priceRef": "PRICE243",
        "productVariantId": "6b77f7b1-c8d0-4d8b-8c7a-0c6e4a7f7b8b",
        "sale": true,
        "salePrice": 0
      }
      const createOrderBody={
        "orderRef": "ORDER7914",
        "customerRef": "AfzalB791",
        "totalAmount": 150.2200,
        "totalAmountExTax": 143.4700,
        "totalAmountIncTax": 150.2200,
        "appliedDiscounts": [],
        "appliedTaxes": [],
        "orderStatus": "COMPLETE",
        "currencyCode": "AUD",
        "channel": "POS",
        "paymentMethod": "EGIFTCARD",
        "totalItems": 1,
        "taxIncluded": true,
        "confirmed": true,
        "quoteId": "asas",
        "attributeGroups": {},
        "orderLines": [
            {
                "productId": "78478311-0d6f-4b5f-8102-8d04b5c3ebd4",
                "gtin": "9345793122135",
                "basePrice": 150.00,
                "totalAmount": 150.2200,
                "totalAmountExTax": 143.4727,
                "totalAmountIncTax": 150.2200,
                "quantity": 1,
                "appliedDiscounts": []
            }
        ],
        "shipments": []
    }
    const orderItemsBody=    {
        "orderId": '4edf1cee-e9b8-42d1-ab27-6f2c63ca480f',
        "orderRef": "ORDER7914",
        "entryRef":"ENTRY791",
        "productId": '7a8dcd86-706b-4c91-bdf7-73099d07b1e2',
        "productRef": "PRD6237978",
        "gtin": "9345793122135",
        "basePrice": 150,
        "totalAmount": 150.22,
        "totalAmountExTax": 143.4727,
        "totalAmountIncTax": 150.22,
        "quantity": 1,
        "appliedDiscounts": [],
        "orderItemLevel": "P",
        "baseProductid": '7a8dcd86-706b-4c91-bdf7-73099d07b1e2',
        "created_at": "2023-07-24T05:59:53.628045Z",
        "updated_at": "2023-07-24T05:59:53.628045Z"
    }
module.exports={
    createWishlistItembody,
    createCustomerBody,
    newAddress,
    newProductBody,
    productVariantBody,
    variantPrice,
    newStockBody,
    newLocationBody,
    newBatchBody,
    newWishlistBody,
    updateWishlistByIDBody,
    updateWishlistItemBody,
    bulkProductBody,
    createBulkCustomerBody,
    emarsysCustomerBody,
    bulkLocationBody,
    bulkStockBody,
    newResourceBody,
    priceBody,
    updatePriceBody,
    createOrderBody,
    orderItemsBody
}
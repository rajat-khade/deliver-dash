# Deliver Dash
Welcome to Deliver Dash, an E commerce web application to make your grocery shopping hassle-free and provide quick deliveries at your doorstep. Built using React.js, 
Node.js, Express.js and MongoDB, this single page application has been built keeping in mind the essential aspects from the point of view of not only the customer but 
the entire spectrum of users ranging from retailers to delivery-executives.

## Overview
### 1. Signup and Login
* Sign Up as one of the 4 User Types - Customer, Retailer, Wholesaler or a Delivery person. 
* Login as Customer, Retailer, Wholesaler or Delivery Person accordingly by choosing the corresponding tab from the panel on the right.

![Landing Page](/res/signup.png)


### 2. Dashboard
* Dashboard displays a list of products for all of the 6 available categories - Fruits, Veggies, Staples, Beverages, Meat and Snacks. Dashboard is available only to the Customers and Retailers. 
* Selecting any product opens a window containing details of the product, including the details of the different retailers selling the same product and their corresponding locations on the map relative to the current user location. 
* Add or Subtract quantities to and from the cart according to your needs.

![Dashboard GIF](/res/Dashboard.gif) 


### 3. Cart 
* Cart displays a list of all the products that have been added to the cart and are ready to be ordered. Cart is available to the Customers and Retailers. 
* The quantities of the products can furthermore be modified, and products can be deleted from the cart. 
* Delivery Date can be selected from the Calendar provided. 
* Order All button serves the purpose of placing the order and naturally, empties the cart. 
* Offline Order button, on the other hand, serves the purpose of placing offline self-pick-up orders.

![Cart](/res/cart.png)


### 4. Stock
* Stock displays a list of products in stock and is available only to the Retailers and Wholesalers. 
* Edit the quantities and prices of products available in your stock. 
* Add an existing product with different details or add a new product with the necessary details.

![Cart](/res/stock.png)

### 5. Orders 
* Orders section displays all orders divided into 3 categories by status - Pending, In Transit and Delivered. Orders section is available only to the Retailers and the Wholesalers. 
* For each order in the Pending Section, the Retailer/Wholesaler has the option to Dispatch the Order. 
* The code assigns every order to a specific delivery associate according to the algorithm.

![Cart](/res/orders.png)

### 6. Delivery
* Deliveries Interface is available only to the Delivery Executive. 
* Deliveries section displays all orders that have been assigned to the specific delivery associate and are yet to be delivered within End of Day.
*  For every dispatched order, the Delivery person has the option to Accept the Order and Finish the Delivery on reaching their destination and completing the transaction.

![Cart](/res/delivery.png)





## Features and Functionalities

### 1. Map Services
![Cart](/res/map.png)

### 2. Notification System
A robust Notification System has been set-up to inform all users involved in the Delivery Cycle to receive a notification suitable to the status of the Order.
* Orders go through 4 stages in the entire Delivery Cycle - 
  1. Placed, 
  2. Dispatched, 
  3. In Transit
  4. Delivered. 
These stages can be tracked using the Notification System. 
* By clicking on any of the notification, the user gets to view the order details and the order status simultaneously in a separate window.
![Cart](/res/notification.png)

### 3. Courier Allotment System
```javascript
for (let retailerId of retailerIds) 
{       
    let retailer = await axios({ url: `/api/getuser/${retailerId}`, baseURL: 'http://localhost:5000' })

    let minDist = 1e12, minDeliveryId = ''

    for(let i = 0; i < deliveryPersons.data.length; i++) {
      let deliveryPerson = deliveryPersons.data[i]
      let lat1,long1,lat2,long2

      const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(deliveryPerson.location) + '.json?access_token=<YOUR_TOKEN>&limit=1'
      const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(retailer.data.location) + '.json?access_token=<YOUR_TOKEN>&limit=1'

      const {data: data1} = await axios({url: url1})
      lat1 = data1.features[0].center[1]
      long1 = data1.features[0].center[0]

      const {data: data2} = await axios({url: url2})
      lat2 = data2.features[0].center[1]
      long2 = data2.features[0].center[0]


      let dist = await genDist(lat1,long1,lat2,long2)
      console.log("distance",dist)
      if(dist < minDist){
        minDist = dist
        minDeliveryId = deliveryPerson._id
      }
    }

    //Assigning the delivery person for the current retailer
    deliveryGuy[retailerId] = minDeliveryId
  }

```

### 4. Search bar
![Cart](/res/search.png)

### 5. OTP and Google Auth
<img src="/res/otp.png" alt="OTP" width="500"/>

### 6. Offline Ordering System
![Cart](/res/offline.png)

### 7. Chat Bot
<img src="/res/chatbot.png" alt="Chat Bot" width="500"/>



## Order-Delivery Cycle
  ![Cart](/res/ODC.gif)



## Team Members:
1. Sayantan Biswas
2. Abhishek Kumar (https://github.com/AbhishekKumar102K)
3. Rajat Khade (https://github.com/rajat-khade)

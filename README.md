## API Documentation

### Base URL

`http://localhost:3000/api`

---

### **General Routes**

#### `GET /api`

- **Description**: Verifies if the API is working.
- **Response**:
  ```json
  {
    "message": "If you see this message, the API route is working!"
  }
  ```
- **Status Code**: `200`

---

### **Users**

#### `PUT /api/users`

- **Description**: Updates user information.
- **Request Body**: JSON object with user data.
- **Response**: Depends on implementation.

#### `GET /api/users`

- **Description**: Retrieves user information.
- **Response**: Depends on implementation.

#### `GET /api/users/all`

- **Description**: Retrieves all users.
- **Response**: Depends on implementation.

---

### **Products**

#### `POST /api/products`

- **Description**: Creates a new product.
- **Request Body**: JSON object with product details.
- **Response**: Depends on implementation.

#### `GET /api/products`

- **Description**: Retrieves all products.
- **Response**: Depends on implementation.

#### `DELETE /api/products`

- **Description**: Deletes a product.
- **Request Body**: JSON object with product ID.
- **Response**: Depends on implementation.

#### `PUT /api/products`

- **Description**: Updates a product.
- **Request Body**: JSON object with updated product details.
- **Response**: Depends on implementation.

#### `GET /api/products/[id]`

- **Description**: Retrieves a product by ID.
- **Response**: Depends on implementation.

#### `GET /api/products/all`

- **Description**: Retrieves all products.
- **Response**: JSON array of products.

---

### **Orders**

#### `GET /api/orders`

- **Description**: Retrieves all orders.
- **Response**: Depends on implementation.

#### `POST /api/orders`

- **Description**: Creates a new order.
- **Request Body**: JSON object with order details.
- **Response**: Depends on implementation.

#### `POST /api/orders/[id]`

- **Description**: Updates an order by ID.
- **Request Body**: JSON object with updated order details.
- **Response**: Depends on implementation.

#### `PATCH /api/orders/[id]`

- **Description**: Partially updates an order by ID.
- **Request Body**: JSON object with fields to update.
- **Response**: Depends on implementation.

#### `GET /api/orders/user`

- **Description**: Retrieves orders for a specific user.
- **Response**: Depends on implementation.

---

### **Group Buys**

#### `GET /api/group-buys`

- **Description**: Retrieves all group buys.
- **Response**: Depends on implementation.

#### `POST /api/group-buys`

- **Description**: Creates a new group buy.
- **Request Body**: JSON object with group buy details.
- **Response**: Depends on implementation.

#### `GET /api/group-buys/[id]`

- **Description**: Retrieves a group buy by ID.
- **Response**: Depends on implementation.

#### `PATCH /api/group-buys/[id]`

- **Description**: Updates a group buy by ID.
- **Request Body**: JSON object with updated group buy details.
- **Response**: Depends on implementation.

#### `DELETE /api/group-buys/[id]`

- **Description**: Deletes a group buy by ID.
- **Response**: Depends on implementation.

#### `PATCH /api/group-buys/[id]/status`

- **Description**: Updates the status of a group buy.
- **Request Body**: JSON object with status details.
- **Response**:
  ```json
  {
    "message": "Group buy status updated & notifikasi dikirim"
  }
  ```

#### `POST /api/group-buys/[id]/join`

- **Description**: Joins a group buy.
- **Request Body**: JSON object with user details.
- **Response**: Depends on implementation.

#### `POST /api/group-buys/[id]/full-payment`

- **Description**: Completes full payment for a group buy.
- **Request Body**: JSON object with payment details.
- **Response**: Depends on implementation.

---

### **Cart**

#### `POST /api/cart`

- **Description**: Adds an item to the cart.
- **Request Body**: JSON object with item details.
- **Response**: Depends on implementation.

#### `PATCH /api/cart`

- **Description**: Updates the cart.
- **Request Body**: JSON object with updated cart details.
- **Response**: Depends on implementation.

#### `GET /api/cart`

- **Description**: Retrieves the cart.
- **Response**: Depends on implementation.

---

### **Notifications**

#### `GET /api/notifications`

- **Description**: Retrieves notifications for a user.
- **Request Params**:
  - `userId`: ID of the user.
- **Response**: Depends on implementation.

#### `DELETE /api/notifications`

- **Description**: Deletes a notification.
- **Request Body**: JSON object with notification ID.
- **Response**: Depends on implementation.

---

### **Login**

#### `POST /api/login`

- **Description**: Authenticates a user.
- **Request Body**: JSON object with login credentials.
- **Response**: Depends on implementation.

---

### **Checkout**

#### `POST /api/checkout`

- **Description**: Initiates a checkout process.
- **Request Body**: JSON object with checkout details.
- **Response**: Depends on implementation.

#### `PATCH /api/checkout`

- **Description**: Updates the checkout process.
- **Request Body**: JSON object with updated checkout details.
- **Response**: Depends on implementation.

---

## Notes

- Replace `[id]` with the actual ID of the resource.
- Ensure proper authentication and authorization for protected routes.

---

# Cart API - My Project Part

This folder contains the Cart and CartItems feature for the existing NestJS E-Commerce Management System. It uses the existing `Products` entity and PostgreSQL connection. The Users module is not part of this branch yet, so `userId` is stored as an integer until the group authentication module is integrated.

## What the Cart module does

- One cart per user (`userId` is unique).
- One cart can contain many cart items.
- Each cart item references an existing product.
- Adding a product already in the cart increases its quantity instead of making a duplicate row.
- Quantity must be a positive integer.
- The requested quantity cannot exceed the product's available stock.
- The cart response includes unit price, line total, and subtotal.
- Adding and updating items use a database transaction.
- Deleting a cart also deletes its cart items; deleting a cart item does not delete the product.
- Cart lists and cart-item lists support pagination.

## Run the existing project

1. Open the `e-commerce-management-system` folder (the folder containing `package.json`).
2. Create a PostgreSQL database, for example `ecommerce_db`.
3. Create a `.env` file in the same folder as `package.json`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_DATABASE=ecommerce_db
PORT=3000
```

4. Install dependencies: `npm install` (on PowerShell, `npm.cmd install` also works).
5. Start the API: `npm run start:dev` (or `npm.cmd run start:dev`).
6. Open Swagger at `http://localhost:3000/api-docs`.

The project currently uses `synchronize: true` in its existing TypeORM configuration. For local development, TypeORM should create the Cart tables when the app connects. Do not run `database/cart-schema.sql` if the tables already exist. If you use the SQL script manually, make sure the existing `products` table exists first.

## Cart endpoints

| Method | URL | Purpose |
|---|---|---|
| POST | `/carts` | Create a cart for a user |
| GET | `/carts?page=1&limit=10` | List carts with pagination |
| GET | `/carts/:cartId` | Get cart, items, and subtotal |
| POST | `/carts/:cartId/items` | Add a product or increase its quantity |
| GET | `/carts/:cartId/items?page=1&limit=10` | List cart items with pagination |
| PATCH | `/carts/:cartId/items/:itemId` | Change item quantity |
| DELETE | `/carts/:cartId/items/:itemId` | Remove one item |
| DELETE | `/carts/:cartId/items` | Empty the cart but keep the cart |
| DELETE | `/carts/:cartId` | Delete the cart |

## Postman test order

Use `http://localhost:3000` as the base URL.

### 1. Create a cart

`POST /carts`

```json
{
  "userId": 1
}
```

Expected status: `201 Created`.

### 2. Add a product

First make sure a product exists in the existing `products` table. Use its real `productId`.

`POST /carts/1/items`

```json
{
  "productId": 1,
  "quantity": 2
}
```

Expected status: `201 Created`.

### 3. Add the same product again

Send the same request with quantity `1`. It should update the existing row to quantity `3`, not create a duplicate row.

### 4. Read the cart

`GET /carts/1`

The response includes cart items and subtotal.

### 5. Read paginated items

`GET /carts/1/items?page=1&limit=10`

### 6. Update quantity

`PATCH /carts/1/items/1`

```json
{
  "quantity": 3
}
```

Use the actual `cartItemId` returned by the add request.

### 7. Remove one item

`DELETE /carts/1/items/1`

### 8. Empty the cart

`DELETE /carts/1/items`

### 9. Delete the cart

`DELETE /carts/1`

## Validation and error checks

- Send `quantity: 0` to the add/update endpoint: expect `400 Bad Request` with a field-specific validation message.
- Use a product ID that does not exist: expect `404 Not Found`.
- Create a second cart for the same user: expect `409 Conflict`.
- Request a cart ID that does not exist: expect `404 Not Found`.
- Request more units than `stockQuantity`: expect `400 Bad Request`.

Errors use this response format:

```json
{
  "statusCode": 404,
  "timestamp": "2026-11-16T12:00:00.000Z",
  "path": "/carts/999",
  "message": "Cart with ID 999 was not found"
}
```

The timestamp above is an example format, not a captured test result.

## Integration note for the group project

At this stage, `userId` is accepted in the create-cart request because the current Anima project does not contain the Users/JWT module. Once the team authentication module is integrated, replace client-supplied `userId` with the authenticated user's ID from the JWT request. Do not treat this standalone version as authorization-secure for a public deployment.

## Database relationships

- `carts` has a unique `userId` column.
- `cart_items.cartId` references `carts.cartId` with `ON DELETE CASCADE`.
- `cart_items.productId` references `products.productId` with `ON DELETE RESTRICT`.
- A unique constraint on (`cartId`, `productId`) prevents duplicate product rows in one cart.

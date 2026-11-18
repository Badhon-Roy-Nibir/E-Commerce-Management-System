# E-Commerce Management System — Cart and CartItem

This folder is a small NestJS project containing only the Cart and CartItem part. It intentionally does **not** include Users, Products, Orders, or Auth modules, and it does not use JWT.

## Requirements
- Node.js (LTS)
- PostgreSQL

## Run locally
1. Open this folder in VS Code.
2. Create a PostgreSQL database (default name in `.env.example`: `ecommerce_cart_db`).
3. Update `.env` with your PostgreSQL username and password.
4. In the terminal, run:

   ```powershell
   npm.cmd install
   npm.cmd run start:dev
   ```

5. The API listens at `http://localhost:3000` (or the `PORT` in `.env`).

` synchronize: true ` is enabled for local development. Do not use it for production databases.

## API endpoints (no JWT)

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/carts` | Create a cart using `userId` |
| GET | `/carts` | List carts |
| GET | `/carts/user/:userId` | Get a user's cart |
| GET | `/carts/:cartId` | Get cart by ID |
| DELETE | `/carts/user/:userId` | Delete a user's cart |
| POST | `/cart-items` | Add item using `userId`, `productId`, `quantity` |
| GET | `/cart-items/user/:userId` | List a user's cart items |
| PATCH | `/cart-items/:cartItemId` | Update item quantity |
| DELETE | `/cart-items/:cartItemId` | Remove item |
| DELETE | `/cart-items/user/:userId/clear` | Clear cart items |

### Example request bodies
Create cart:

```json
{ "userId": 1 }
```

Add cart item:

```json
{ "userId": 1, "productId": 3, "quantity": 2 }
```

Update quantity:

```json
{ "quantity": 4 }
```

## Database design
- One cart per `userId` (unique constraint).
- One cart can contain many CartItems.
- Each CartItem stores `productId` and `quantity`.
- User and Product IDs are stored as scalar references in this isolated package. When merging into the full group project, your team can add TypeORM relations to the existing Users and Products entities.

## Important security note
There is no JWT or authorization in this version. Anyone who can reach the API can submit any `userId`. This is intended for coursework integration/testing, not public deployment.

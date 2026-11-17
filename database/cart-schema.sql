-- Run this only if TypeORM has not already created these tables.
-- The products table must exist before running this script.

CREATE TABLE IF NOT EXISTS carts (
  "cartId" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL UNIQUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
  "cartItemId" SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  "cartId" INTEGER NOT NULL,
  "productId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FK_cart_items_cart"
    FOREIGN KEY ("cartId") REFERENCES carts("cartId") ON DELETE CASCADE,
  CONSTRAINT "FK_cart_items_product"
    FOREIGN KEY ("productId") REFERENCES products("productId") ON DELETE RESTRICT,
  CONSTRAINT "UQ_cart_item_cart_product" UNIQUE ("cartId", "productId")
);

CREATE INDEX IF NOT EXISTS "IDX_cart_items_cartId" ON cart_items("cartId");
CREATE INDEX IF NOT EXISTS "IDX_cart_items_productId" ON cart_items("productId");

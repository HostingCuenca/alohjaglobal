-- ============================================
-- CLEAN ALL PRODUCTS FROM DATABASE
-- ============================================
-- Execute this script while connected to alohjadb database
-- psql -U postgres -d alohjadb -f clean-products.sql

-- First, delete all product_batches relationships
DELETE FROM product_batches;

-- Then delete all products
DELETE FROM products;

-- Verify deletion
SELECT COUNT(*) as remaining_products FROM products;
SELECT COUNT(*) as remaining_product_batches FROM product_batches;

-- Show confirmation
SELECT 'Products table cleaned successfully' AS status;

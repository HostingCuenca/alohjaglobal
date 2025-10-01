
@ -1,455 +1 @@
-- ============================================
-- ALOHJA COFFEE TRACEABILITY & CMS SCHEMA
-- PostgreSQL Database Schema for alohjadb
-- ============================================
-- Execute this script while connected to alohjadb database
-- psql -U username -d alohjadb -f schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE ENTITIES
-- ============================================

-- Provinces/Regions
CREATE TABLE provinces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE, -- LOJA, ELORO, PICHINCHA, etc.
    map_image_url TEXT,
    altitude_range VARCHAR(50), -- "1,200 - 1,400 msnm"
    climate_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coffee Varieties
CREATE TABLE coffee_varieties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- Typica Mejorada, Gesha, Bourbon Rosado
    description TEXT,
    characteristics JSONB, -- {"flavor_notes": ["chocolate", "citrus"], "body": "medium"}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FARMERS & PROFILES
-- ============================================

-- Farmers Table
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_code VARCHAR(50) NOT NULL UNIQUE, -- AR (Armando Ramirez), PQ (Pablo Quezada)
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(200) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    email VARCHAR(255),
    phone VARCHAR(20),
    province_id INTEGER REFERENCES provinces(id),
    municipality VARCHAR(100),
    address TEXT,
    profile_image_url TEXT,
    cover_image_url TEXT,
    biography TEXT,
    years_experience INTEGER,
    farming_philosophy TEXT,
    certifications JSONB, -- ["organic", "fair_trade", "rainforest_alliance"]
    social_media JSONB, -- {"facebook": "url", "instagram": "url"}
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Farmer Media (Videos, Photos, Documents)
CREATE TABLE farmer_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
    media_type VARCHAR(20) NOT NULL, -- 'video', 'image', 'document'
    media_category VARCHAR(50) NOT NULL, -- 'interview', 'farm_tour', 'harvest', 'process', 'profile'
    title VARCHAR(200) NOT NULL,
    description TEXT,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT, -- For videos
    duration INTEGER, -- For videos (in seconds)
    file_size BIGINT, -- In bytes
    metadata JSONB, -- Resolution, format, etc.
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Farms
CREATE TABLE farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    total_area_hectares DECIMAL(10,2),
    coffee_area_hectares DECIMAL(10,2),
    altitude_min INTEGER, -- meters above sea level
    altitude_max INTEGER,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    soil_type VARCHAR(100),
    shade_percentage INTEGER, -- 0-100
    irrigation_system VARCHAR(100),
    processing_method VARCHAR(100), -- "washed", "natural", "honey"
    farm_images JSONB, -- Array of image URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BATCH TRACEABILITY
-- ============================================

-- Coffee Batches (Core traceability data)
CREATE TABLE coffee_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id VARCHAR(50) NOT NULL UNIQUE, -- AR000147, PQ000258, etc.
    farmer_id UUID NOT NULL REFERENCES farmers(id),
    farm_id UUID NOT NULL REFERENCES farms(id),
    variety_id INTEGER NOT NULL REFERENCES coffee_varieties(id),
    
    -- Harvest Information
    harvest_date DATE NOT NULL,
    harvest_season VARCHAR(20), -- "main", "mitaca"
    harvest_method VARCHAR(50), -- "selective", "strip"
    harvest_notes TEXT,
    
    -- Processing Information
    processing_method VARCHAR(50) NOT NULL, -- "washed", "natural", "honey"
    drying_method VARCHAR(50) NOT NULL, -- "sun", "mechanical", "african_beds"
    fermentation_time INTEGER, -- hours
    drying_time INTEGER, -- days
    
    -- Quality Metrics
    moisture_content DECIMAL(4,2), -- percentage
    screen_size VARCHAR(20),
    defect_count INTEGER,
    cupping_score DECIMAL(4,2), -- 0-100
    cupping_notes TEXT,
    
    -- Logistics
    transport_mode VARCHAR(50) NOT NULL, -- "via_terrestre", "via_aerea"
    warehouse_location VARCHAR(100),
    
    -- Processing Dates
    roast_date DATE,
    pack_date DATE,
    distribution_date DATE,
    retail_date DATE,
    expiry_date DATE,
    
    -- Quantities
    green_weight_kg DECIMAL(10,2),
    processed_weight_kg DECIMAL(10,2),
    final_weight_kg DECIMAL(10,2),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'sold', 'expired'
    
    -- Metadata
    metadata JSONB, -- Additional flexible data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Batch Processing Steps (Detailed timeline)
CREATE TABLE batch_processing_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID NOT NULL REFERENCES coffee_batches(id) ON DELETE CASCADE,
    step_type VARCHAR(50) NOT NULL, -- "harvest", "fermentation", "drying", "milling", "roasting", "packaging"
    step_name VARCHAR(100) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(100),
    responsible_person VARCHAR(100),
    notes TEXT,
    images JSONB, -- Array of image URLs
    step_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PRODUCTS
-- ============================================

-- Product Categories
CREATE TABLE product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    description TEXT,
    description_en TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    name_en VARCHAR(200) NOT NULL,
    description TEXT,
    description_en TEXT,
    category_id INTEGER REFERENCES product_categories(id),
    variety_id INTEGER REFERENCES coffee_varieties(id),
    
    -- Product Specifications
    weight_grams INTEGER NOT NULL,
    roast_level VARCHAR(50), -- "light", "medium", "dark"
    grind_type VARCHAR(50), -- "whole_bean", "ground", "espresso"
    packaging_type VARCHAR(50), -- "bag", "can", "box"
    
    -- Pricing
    price_usd DECIMAL(10,2),
    price_local DECIMAL(10,2),
    currency_local VARCHAR(3) DEFAULT 'USD',
    
    -- Media
    primary_image_url TEXT,
    gallery_images JSONB, -- Array of image URLs
    
    -- SEO & Marketing
    tags JSONB, -- Array of tags
    flavor_notes JSONB, -- ["chocolate", "caramel", "citrus"]
    brewing_recommendations TEXT,
    
    -- Availability
    is_active BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Batch Mapping (Which batches are used in which products)
CREATE TABLE product_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    batch_id UUID NOT NULL REFERENCES coffee_batches(id) ON DELETE CASCADE,
    percentage DECIMAL(5,2) NOT NULL DEFAULT 100.00, -- For blends
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(product_id, batch_id)
);

-- ============================================
-- CMS CONFIGURATION
-- ============================================

-- CMS Pages
CREATE TABLE cms_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    title_en VARCHAR(200),
    content TEXT,
    content_en TEXT,
    meta_description TEXT,
    meta_description_en TEXT,
    featured_image_url TEXT,
    page_type VARCHAR(50) DEFAULT 'standard', -- 'home', 'about', 'standard'
    is_published BOOLEAN DEFAULT FALSE,
    publish_date TIMESTAMP WITH TIME ZONE,
    template VARCHAR(50) DEFAULT 'default',
    seo_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Settings (Global configuration)
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'text', -- 'text', 'json', 'boolean', 'number'
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- Can be exposed to frontend
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Management (For CMS access)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'editor', -- 'admin', 'editor', 'viewer'
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- AUDIT & LOGS
-- ============================================

-- Audit Trail
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    record_id VARCHAR(100) NOT NULL,
    action VARCHAR(20) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    old_values JSONB,
    new_values JSONB,
    user_id UUID REFERENCES users(id),
    user_ip INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Farmers indexes
CREATE INDEX idx_farmers_province ON farmers(province_id);
CREATE INDEX idx_farmers_active ON farmers(is_active);
CREATE INDEX idx_farmers_code ON farmers(farmer_code);

-- Farmer media indexes
CREATE INDEX idx_farmer_media_farmer ON farmer_media(farmer_id);
CREATE INDEX idx_farmer_media_type ON farmer_media(media_type);
CREATE INDEX idx_farmer_media_category ON farmer_media(media_category);
CREATE INDEX idx_farmer_media_featured ON farmer_media(is_featured);

-- Batch indexes
CREATE INDEX idx_batches_farmer ON coffee_batches(farmer_id);
CREATE INDEX idx_batches_farm ON coffee_batches(farm_id);
CREATE INDEX idx_batches_variety ON coffee_batches(variety_id);
CREATE INDEX idx_batches_harvest_date ON coffee_batches(harvest_date);
CREATE INDEX idx_batches_status ON coffee_batches(status);
CREATE INDEX idx_batches_batch_id ON coffee_batches(batch_id);

-- Product indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_variety ON products(variety_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_sku ON products(sku);

-- Audit indexes
CREATE INDEX idx_audit_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at);

-- ============================================
-- SAMPLE DATA INSERTS
-- ============================================

-- Insert provinces
INSERT INTO provinces (name, code, map_image_url, altitude_range) VALUES
('Loja', 'LOJA', '/assets/mapaspng/mapaecuadorLOJA.png', '1,200 - 1,400 msnm'),
('El Oro', 'ELORO', '/assets/mapaspng/mapaecuadorELORO.png', '1,500 - 1,800 msnm'),
('Pichincha', 'PICHINCHA', '/assets/mapaspng/mapaecuadorPICHINCHA.png', '2,000 - 2,200 msnm');

-- Insert coffee varieties
INSERT INTO coffee_varieties (name, description) VALUES
('Typica Mejorada', 'Variedad tradicional mejorada con excelente calidad de taza'),
('Gesha', 'Variedad premium con notas florales y cítricas distintivas'),
('Bourbon Rosado', 'Variedad con frutos rosados y perfil dulce');

-- Insert sample farmers
INSERT INTO farmers (farmer_code, first_name, last_name, province_id, biography, years_experience) VALUES
('AR', 'Armando', 'Ramirez', 1, 'Agricultor de tercera generación especializado en café de altura', 25),
('PQ', 'Pablo', 'Quezada', 2, 'Pionero en el cultivo de Gesha en Ecuador', 18),
('MG', 'María', 'González', 3, 'Líder en prácticas sostenibles y café orgánico', 22);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_farmers_updated_at BEFORE UPDATE ON farmers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_farms_updated_at BEFORE UPDATE ON farms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_batches_updated_at BEFORE UPDATE ON coffee_batches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON cms_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- Complete batch information view
CREATE VIEW v_batch_details AS
SELECT 
    cb.batch_id,
    cb.harvest_date,
    cb.processing_method,
    cb.drying_method,
    cb.transport_mode,
    cb.roast_date,
    cb.pack_date,
    cb.distribution_date,
    cb.retail_date,
    cb.status,
    f.full_name as farmer_name,
    f.farmer_code,
    farm.name as farm_name,
    cv.name as variety_name,
    p.name as province_name,
    p.code as province_code,
    p.map_image_url as province_map
FROM coffee_batches cb
JOIN farmers f ON cb.farmer_id = f.id
JOIN farms farm ON cb.farm_id = farm.id
JOIN coffee_varieties cv ON cb.variety_id = cv.id
JOIN provinces p ON f.province_id = p.id
WHERE cb.status = 'active';

-- Farmer profiles with media count
CREATE VIEW v_farmer_profiles AS
SELECT 
    f.*,
    p.name as province_name,
    p.code as province_code,
    COUNT(fm.id) as media_count,
    COUNT(CASE WHEN fm.media_type = 'video' THEN 1 END) as video_count,
    COUNT(CASE WHEN fm.media_type = 'image' THEN 1 END) as image_count
FROM farmers f
LEFT JOIN provinces p ON f.province_id = p.id
LEFT JOIN farmer_media fm ON f.id = fm.farmer_id AND fm.is_public = true
WHERE f.is_active = true
GROUP BY f.id, p.name, p.code;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE farmers IS 'Coffee farmers/producers profiles';
COMMENT ON TABLE farmer_media IS 'Videos, images and documents for farmer profiles';
COMMENT ON TABLE coffee_batches IS 'Core traceability data for coffee batches';
COMMENT ON TABLE batch_processing_steps IS 'Detailed timeline of batch processing steps';
COMMENT ON TABLE products IS 'Final products available for sale';
COMMENT ON TABLE product_batches IS 'Mapping between products and the batches they contain';

-- ============================================
-- GRANT PERMISSIONS (Adjust as needed)
-- ============================================

-- Create roles
-- CREATE ROLE alohja_api_user;
-- CREATE ROLE alohja_cms_user;

-- Grant permissions
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO alohja_api_user;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO alohja_cms_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO alohja_api_user, alohja_cms_user;

-- ============================================
-- SCHEMA MIGRATIONS FOR PRODUCT FAMILIES & SLUGS
-- ============================================
-- Execute these ALTER statements if database already exists
-- For new databases, incorporate these changes into the main CREATE TABLE statements above

-- 1. Add slug field to products for SEO-friendly URLs
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR(200) UNIQUE;
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- 2. Create product_families table to group product variants (different weights/prices of same product)
CREATE TABLE IF NOT EXISTS product_families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    name_en VARCHAR(200) NOT NULL,
    base_slug VARCHAR(200) NOT NULL UNIQUE, -- "cafe-alta-montana"
    description TEXT,
    description_en TEXT,
    category_id INTEGER REFERENCES product_categories(id),
    variety_id INTEGER REFERENCES coffee_varieties(id),

    -- Shared characteristics across variants
    roast_level VARCHAR(50),
    grind_type VARCHAR(50),
    packaging_type VARCHAR(50),

    -- Shared media
    primary_image_url TEXT,
    gallery_images JSONB,

    -- SEO & Marketing (shared)
    tags JSONB,
    flavor_notes JSONB,
    brewing_recommendations TEXT,
    meta_title TEXT,
    meta_title_en TEXT,
    meta_description TEXT,
    meta_description_en TEXT,

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Add family_id to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS family_id UUID REFERENCES product_families(id);

-- 4. Add display_order to products for ordering variants within a family
ALTER TABLE products ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- 5. Add is_default_variant to mark the default variant shown in family view
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_default_variant BOOLEAN DEFAULT FALSE;

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_family ON products(family_id);
CREATE INDEX IF NOT EXISTS idx_product_families_slug ON product_families(base_slug);
CREATE INDEX IF NOT EXISTS idx_product_families_category ON product_families(category_id);
CREATE INDEX IF NOT EXISTS idx_product_families_active ON product_families(is_active);

-- 7. Add trigger for product_families updated_at
CREATE TRIGGER IF NOT EXISTS update_product_families_updated_at
    BEFORE UPDATE ON product_families
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8. Create view for product families with their variants
CREATE OR REPLACE VIEW v_product_families AS
SELECT
    pf.id as family_id,
    pf.base_slug,
    pf.name,
    pf.name_en,
    pf.description,
    pf.description_en,
    pf.roast_level,
    pf.grind_type,
    pf.primary_image_url as family_image,
    pf.gallery_images as family_gallery,
    pf.flavor_notes,
    pf.brewing_recommendations,
    pf.is_active as family_active,

    -- Category info
    pc.name as category_name,
    pc.name_en as category_name_en,

    -- Variety info
    cv.name as variety_name,

    -- Aggregate variants
    json_agg(
        json_build_object(
            'id', p.id,
            'sku', p.sku,
            'slug', p.slug,
            'weight_grams', p.weight_grams,
            'price_usd', p.price_usd,
            'price_local', p.price_local,
            'currency_local', p.currency_local,
            'primary_image_url', p.primary_image_url,
            'stock_quantity', p.stock_quantity,
            'is_active', p.is_active,
            'is_default', p.is_default_variant,
            'display_order', p.display_order
        ) ORDER BY p.display_order, p.weight_grams
    ) as variants,

    -- Pricing range
    MIN(p.price_usd) as price_from,
    MAX(p.price_usd) as price_to,

    -- Weight range
    MIN(p.weight_grams) as min_weight,
    MAX(p.weight_grams) as max_weight,

    -- Stock status
    SUM(p.stock_quantity) as total_stock,

    COUNT(p.id) as variant_count

FROM product_families pf
LEFT JOIN products p ON pf.id = p.family_id AND p.is_active = true
LEFT JOIN product_categories pc ON pf.category_id = pc.id
LEFT JOIN coffee_varieties cv ON pf.variety_id = cv.id
WHERE pf.is_active = true
GROUP BY
    pf.id, pf.base_slug, pf.name, pf.name_en, pf.description, pf.description_en,
    pf.roast_level, pf.grind_type, pf.primary_image_url, pf.gallery_images,
    pf.flavor_notes, pf.brewing_recommendations, pf.is_active,
    pc.name, pc.name_en, cv.name;

-- ============================================
-- COMMENTS FOR NEW TABLES/FIELDS
-- ============================================

COMMENT ON TABLE product_families IS 'Groups related product variants (e.g., same coffee in different weights/prices)';
COMMENT ON COLUMN products.slug IS 'SEO-friendly URL identifier (e.g., cafe-alta-montana-250g)';
COMMENT ON COLUMN products.family_id IS 'Reference to parent product family for grouping variants';
COMMENT ON COLUMN products.is_default_variant IS 'Default variant shown when viewing the family';
COMMENT ON COLUMN product_families.base_slug IS 'Base slug for family (e.g., cafe-alta-montana)';

-- ============================================
-- MIGRATION HELPER FUNCTIONS
-- ============================================

-- Function to generate slug from product name
CREATE OR REPLACE FUNCTION generate_product_slug(product_name TEXT, weight_grams INTEGER, sku TEXT)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
BEGIN
    -- Remove accents and convert to lowercase
    base_slug := lower(unaccent(product_name));

    -- Replace spaces and special characters with hyphens
    base_slug := regexp_replace(base_slug, '[^a-z0-9]+', '-', 'g');

    -- Remove leading/trailing hyphens
    base_slug := trim(both '-' from base_slug);

    -- Add weight and SKU for uniqueness
    final_slug := base_slug || '-' || weight_grams || 'g-' || lower(sku);

    RETURN final_slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to generate base family slug (without weight/sku)
CREATE OR REPLACE FUNCTION generate_family_slug(product_name TEXT)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
BEGIN
    -- Remove accents and convert to lowercase
    base_slug := lower(unaccent(product_name));

    -- Replace spaces and special characters with hyphens
    base_slug := regexp_replace(base_slug, '[^a-z0-9]+', '-', 'g');

    -- Remove leading/trailing hyphens
    base_slug := trim(both '-' from base_slug);

    -- Remove weight mentions (e.g., "250-gr", "1-kg")
    base_slug := regexp_replace(base_slug, '-\d+(-?gr?|-?kg?)?', '', 'g');

    RETURN base_slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
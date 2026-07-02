-- Seed: importar productos iniciales desde products.js
-- Ejecutar después de crear las tablas

INSERT INTO admin_products (name, description, price, category, features, stock) VALUES
('Salsa de Soja Clásica', 'Salsa de soja fermentada naturalmente, ideal para salteados, marinados y sushi. 500ml.', 25000, 'oriental', '["Fermentación natural", "Libre de conservantes", "500ml"]', -1),
('Vinagre de Arroz', 'Vinagre suave de arroz, esencial para sushi y aderezos orientales. 300ml.', 30000, 'oriental', '["Sabor suave", "300ml", "Ideal para sushi"]', -1),
('Aceite de Sésamo', 'Aceite de sésamo puro tostado, perfecto para dar el toque final a tus platos asiáticos. 200ml.', 45000, 'oriental', '["100% sésamo tostado", "200ml", "Aroma intenso"]', -1),
('Fideos Udon', 'Fideos gruesos de trigo, típicos de la cocina japonesa. 400g.', 18000, 'oriental', '["Trigo premium", "400g", "Cocción rápida"]', -1),
('Alga Nori para Sushi', 'Algas nori tostadas de primera calidad. 10 láminas.', 35000, 'oriental', '["10 láminas", "Grado sushi", "Tostado perfecto"]', -1),
('Wasabi en Pasta', 'Pasta de wasabi tradicional. 43g.', 38000, 'oriental', '["43g", "Picor intenso", "Listo para usar"]', -1),
('Tahini (Pasta de Sésamo)', 'Pasta de sésamo pura, ingrediente estrella del hummus y baba ganoush. 350g.', 40000, 'arabe', '["350g", "100% sésamo", "Sin aditivos"]', -1),
('Cuscús Tradicional', 'Sémola de trigo precocida, tradicional del Magreb. 500g.', 15000, 'arabe', '["500g", "Precocido", "5 minutos"]', -1),
('Harissa', 'Pasta de ajíes picantes típica del norte de África. 150g.', 32000, 'arabe', '["150g", "Picante tradicional"]', -1),
('Zaatar', 'Mezcla tradicional libanesa de tomillo, sésamo, sumac y sal. 100g.', 28000, 'arabe', '["100g", "Mezcla tradicional"]', -1),
('Garam Masala', 'Mezcla de especias tostadas para curries. 100g.', 30000, 'india', '["100g", "Mezcla premium", "Tostado en seco"]', -1),
('Leche de Coco', 'Leche de coco cremosa, base para curries. 400ml.', 25000, 'india', '["400ml", "Cremosa", "Sin azúcar"]', -1),
('Curry Rojo en Pasta', 'Pasta de curry rojo tailandesa. 200g.', 35000, 'india', '["200g", "Picante medio"]', -1),
('Cúrcuma en Polvo', 'Cúrcuma molida de alta calidad. 100g.', 18000, 'especias', '["100g", "Color intenso", "Origen India"]', -1),
('Comino en Grano', 'Semillas de comino enteras. 100g.', 15000, 'especias', '["100g", "Entero", "Aroma intenso"]', -1),
('Canela en Rama (Ceylán)', 'Canela de Ceylán auténtica. 50g.', 35000, 'especias', '["50g", "Ceylán", "100% natural"]', -1),
('Pimienta de Sichuan', 'Granos de pimienta de Sichuan. 50g.', 40000, 'especias', '["50g", "Sichuan", "Efecto entumecedor"]', -1),
('Azafrán en Hebras', 'Hebras de azafrán puro, el oro rojo de la cocina. 1g.', 65000, 'especias', '["1g", "Hebras", "Origen Irán"]', -1),
('Salsa Teriyaki', 'Salsa agridulce japonesa. 300ml.', 32000, 'salsas', '["300ml", "Dulce y salada", "Lista para usar"]', -1),
('Sriracha', 'Salsa picante tailandesa. 200ml.', 35000, 'salsas', '["200ml", "Picante equilibrado"]', -1),
('Arroz Japonés Koshihikari', 'Arroz de grano corto para sushi. 1kg.', 35000, 'arroz', '["1kg", "Grano corto", "Premium"]', -1),
('Arroz Jazmín', 'Arroz de grano largo aromático. 1kg.', 22000, 'arroz', '["1kg", "Aromático", "Grano largo"]', -1),
('Té Matcha Ceremonial', 'Matcha en polvo grado ceremonial. 50g.', 85000, 'tes', '["50g", "Grado ceremonial", "Japonés"]', -1),
('Té Chai Masala', 'Mezcla de té negro con especias. 100g.', 28000, 'tes', '["100g", "Especiado"]', -1),
('Kimchi Tradicional', 'Kimchi fermentado artesanalmente. 500g.', 45000, 'conservas', '["500g", "Fermentado", "Picante"]', -1),
('Jengibre Encurtido (Gari)', 'Jengibre joven encurtido, para sushi. 200g.', 25000, 'conservas', '["200g", "Dulce", "Acompañante sushi"]', -1);

-- Hacer al primer usuario admin (cambiar email)
-- UPDATE profiles SET role = 'admin' WHERE email = 'tu@email.com';

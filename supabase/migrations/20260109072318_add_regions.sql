insert into public.regions (id, name, slug, type, parent_id) values
-- ZONAS
(gen_random_uuid(), 'Global', 'global', 'zone', null),
(gen_random_uuid(), 'Latinoamérica', 'latinoamerica', 'zone', null),
(gen_random_uuid(), 'Norteamérica', 'norteamerica', 'zone', null),
(gen_random_uuid(), 'Asia', 'asia', 'zone', null),
(gen_random_uuid(), 'Europa', 'europa', 'zone', null),
(gen_random_uuid(), 'Otras regiones', 'otras-regiones', 'zone', null),

-- PAÍSES LATAM
(gen_random_uuid(), 'Colombia', 'colombia', 'country', null),
(gen_random_uuid(), 'México', 'mexico', 'country', null),
(gen_random_uuid(), 'Argentina', 'argentina', 'country', null),

-- PAÍSES GLOBALES
(gen_random_uuid(), 'Estados Unidos', 'estados-unidos', 'country', null),
(gen_random_uuid(), 'Japón', 'japon', 'country', null),

-- CIUDADES COLOMBIA
(gen_random_uuid(), 'Bogotá', 'bogota', 'city', null),
(gen_random_uuid(), 'Medellín', 'medellin', 'city', null),
(gen_random_uuid(), 'Cali', 'cali', 'city', null),
(gen_random_uuid(), 'Barranquilla', 'barranquilla', 'city', null),
(gen_random_uuid(), 'Cartagena', 'cartagena', 'city', null),
(gen_random_uuid(), 'Bucaramanga', 'bucaramanga', 'city', null),
(gen_random_uuid(), 'Pereira', 'pereira', 'city', null),
(gen_random_uuid(), 'Manizales', 'manizales', 'city', null),
(gen_random_uuid(), 'Armenia', 'armenia', 'city', null),
(gen_random_uuid(), 'Ibagué', 'ibague', 'city', null),
(gen_random_uuid(), 'Neiva', 'neiva', 'city', null),
(gen_random_uuid(), 'Santa Marta', 'santa-marta', 'city', null),
(gen_random_uuid(), 'Villavicencio', 'villavicencio', 'city', null),

-- CIUDADES MÉXICO
(gen_random_uuid(), 'Ciudad de México', 'ciudad-de-mexico', 'city', null),
(gen_random_uuid(), 'Guadalajara', 'guadalajara', 'city', null),
(gen_random_uuid(), 'Monterrey', 'monterrey', 'city', null),

-- CIUDADES ARGENTINA
(gen_random_uuid(), 'Buenos Aires', 'buenos-aires', 'city', null),
(gen_random_uuid(), 'Córdoba', 'cordoba', 'city', null),
(gen_random_uuid(), 'Rosario', 'rosario', 'city', null),

-- CIUDADES USA
(gen_random_uuid(), 'New York', 'new-york', 'city', null),
(gen_random_uuid(), 'Los Angeles', 'los-angeles', 'city', null),
(gen_random_uuid(), 'San Francisco', 'san-francisco', 'city', null),
(gen_random_uuid(), 'Miami', 'miami', 'city', null),

-- CIUDADES JAPÓN
(gen_random_uuid(), 'Tokio', 'tokio', 'city', null),
(gen_random_uuid(), 'Osaka', 'osaka', 'city', null),
(gen_random_uuid(), 'Kioto', 'kioto', 'city', null),

-- GENÉRICA
(gen_random_uuid(), 'Resto del mundo', 'resto-del-mundo', 'other', null);

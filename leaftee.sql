drop database if exists leaftee;
create database leaftee;
use leaftee;

-- SIZES
drop table if exists sizes;
create table if not exists sizes (
	id int auto_increment,
    name varchar(50) collate utf8_unicode_ci default null,
    created_at timestamp null default null,
    updated_at timestamp null default null,
    primary key(id)
);

DROP TRIGGER  IF EXISTS before_insert_sizes;
delimiter ;; 
	create trigger before_insert_sizes before insert on sizes 
	for each row 
	begin
    set new.created_at = current_timestamp; 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

DROP TRIGGER  IF EXISTS before_update_sizes;
delimiter ;; 
	create trigger before_update_sizes before update on sizes 
	for each row 
	begin 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

-- COLORS
drop table if exists colors;
create table if not exists colors (
	id int auto_increment,
    name varchar(50) collate utf8_unicode_ci default null,
    created_at timestamp null default null,
    updated_at timestamp null default null,
    primary key(id)
);

DROP TRIGGER  IF EXISTS before_insert_colors;
delimiter ;; 
	create trigger before_insert_colors before insert on colors 
	for each row 
	begin
    set new.created_at = current_timestamp; 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

DROP TRIGGER  IF EXISTS before_update_colors;
delimiter ;; 
	create trigger before_update_colors before update on colors 
	for each row 
	begin 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

-- TYPES
drop table if exists types;
create table if not exists types (
	id int auto_increment,
    name varchar(50) collate utf8_unicode_ci default null,
    created_at timestamp null default null,
    updated_at timestamp null default null,
    primary key(id)
);

DROP TRIGGER  IF EXISTS before_insert_types;
delimiter ;; 
	create trigger before_insert_types before insert on types 
	for each row 
	begin
    set new.created_at = current_timestamp; 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

DROP TRIGGER  IF EXISTS before_update_types;
delimiter ;; 
	create trigger before_update_types before update on types 
	for each row 
	begin 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

-- PRODUCTS
drop table if exists products;
create table if not exists products (
	id int auto_increment,
    name varchar(255) collate utf8_unicode_ci default null,
    gender tinyint default 9,
	status tinyint default 0,
    created_at timestamp null default null,
    updated_at timestamp null default null,
    primary key(id)
);

DROP TRIGGER  IF EXISTS before_insert_products;
delimiter ;; 
	create trigger before_insert_products before insert on products 
	for each row 
	begin
    set new.created_at = current_timestamp; 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

DROP TRIGGER  IF EXISTS before_update_products;
delimiter ;; 
	create trigger before_update_products before update on products 
	for each row 
	begin 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 


-- PRODUCT_PROPERTIES
drop table if exists product_properties;
create table if not exists product_properties (
	sku_id int auto_increment,
    product_id int not null,
    type_id tinyint not null;
    size_id tinyint not null;
    color_id tinyint not null;
    stock tinyint default 0;
    price int default 0;
    created_at timestamp null default null,
    updated_at timestamp null default null,
    primary key(id),
	foreign key (product_id) REFERENCES products(id) on update cascade on delete restrict,
	foreign key (type_id) REFERENCES types(id) on update cascade on delete restrict,
	foreign key (size_id) REFERENCES sizes(id) on update cascade on delete restrict,
	foreign key (color_id) REFERENCES colors(id) on update cascade on delete restrict
);

DROP TRIGGER  IF EXISTS before_insert_product_properties;
delimiter ;; 
	create trigger before_insert_product_properties before insert on product_properties 
	for each row 
	begin
    set new.created_at = current_timestamp; 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

DROP TRIGGER  IF EXISTS before_update_product_properties;
delimiter ;; 
	create trigger before_update_product_properties before update on product_properties 
	for each row 
	begin 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

-- PRODUCT_IMAGES
drop table if exists product_images;
create table if not exists product_images (
	id int auto_increment,
    product_sku_id int not null,
	url text collate utf8_unicode_ci default null;
    created_at timestamp null default null,
    updated_at timestamp null default null,
    primary key(id),
	foreign key (product_sku_id) REFERENCES product_properties(sku_id) on update cascade on delete restrict
);

DROP TRIGGER  IF EXISTS before_insert_product_images;
delimiter ;; 
	create trigger before_insert_product_images before insert on product_images 
	for each row 
	begin
    set new.created_at = current_timestamp; 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 

DROP TRIGGER  IF EXISTS before_update_product_images;
delimiter ;; 
	create trigger before_update_product_images before update on product_images 
	for each row 
	begin 
	set new.updated_at = current_timestamp; 
	end;; 
delimiter ; 
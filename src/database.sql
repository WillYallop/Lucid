CREATE DATABASE lucid_cms;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION fuzzystrmatch;

CREATE TABLE pages (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    template VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(4) NOT NULL,
    post_name VARCHAR(255),
    has_parent boolean,
    parent_id uuid REFERENCES pages (_id),
    date_created timestamp NOT NULL,
    last_edited timestamp NOT NULL,
    author VARCHAR(255) NOT NULL, 
    is_homepage boolean NOT NULL DEFAULT false,
    post_type_id uuid
);

CREATE TABLE page_seo (
    page_id uuid UNIQUE REFERENCES pages (_id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NUll,
    og_title VARCHAR NOT NULL,
    og_description VARCHAR NOT NULL,
    og_image VARCHAR NOT NULL
);

-- Menues
CREATE TABLE menus (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE menu_links (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    menu_id uuid REFERENCES menus (_id) ON DELETE CASCADE,
    page_id uuid REFERENCES pages (_id) ON DELETE CASCADE,
    blank boolean DEFAULT false,
    text VARCHAR(255) NOT NULL
);

-- Acts as lookup table for its content type data
-- A page can have many of these
-- And these can have many component_content_type_ tables
CREATE TABLE page_components (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    page_id uuid REFERENCES pages (_id) ON DELETE CASCADE,
    component_id uuid NOT NUll, -- referes to themes config component ID
    position INT NOT NULL
);


-- Content Type Repeater
-- Acts as a bride to more component_content_type_ tables...

-- Content Type Text
CREATE TABLE component_content_type_text (
    page_component_id uuid REFERENCES page_components (_id) ON DELETE CASCADE,
    config_id uuid NOT NUll,
    value VARCHAR NOT NULL
);

-- Content Type Number
CREATE TABLE component_content_type_number (
    page_component_id uuid REFERENCES page_components (_id) ON DELETE CASCADE,
    config_id uuid NOT NUll,
    value INT NOT NULL
);

-- MORE TO COME
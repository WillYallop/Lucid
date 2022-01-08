CREATE DATABASE lucid_cms;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE page_seo (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    title VARCHAR NOT NULL,
    description VARCHAR NOT NUll,
    og_title VARCHAR NOT NULL,
    og_description VARCHAR NOT NULL,
    og_image VARCHAR NOT NULL
);

CREATE TABLE pages (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    templates VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    seo uuid REFERENCES page_seo (_id),
    type VARCHAR(4) NOT NULL,
    post_name VARCHAR(255),
    has_parent boolean,
    parent_id uuid REFERENCES pages (_id),
    date_created TIMESTAMP NOT NULL,
    last_edited TIMESTAMP NOT NULL,
    author VARCHAR(255) NOT NULL, 
    is_homepage boolean NOT NULL DEFAULT false
);

CREATE TABLE component_data (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    config_id uuid NOT NULL,
    data JSON NOT NULL
);

CREATE TABLE page_components (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    page_id uuid REFERENCES pages (_id),
    component_id uuid NOT NUll,
    component_data uuid REFERENCES component_data (_id)
);
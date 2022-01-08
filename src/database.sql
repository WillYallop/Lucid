CREATE DATABASE lucid_cms;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE pages (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    template VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(4) NOT NULL,
    post_name VARCHAR(255),
    has_parent boolean,
    parent_id uuid REFERENCES pages (_id),
    date_created timestamp NOT NULL,
    last_edited timestamp NOT NULL,
    author VARCHAR(255) NOT NULL, 
    is_homepage boolean NOT NULL DEFAULT false
);

CREATE TABLE page_seo (
    page_id uuid UNIQUE REFERENCES pages (_id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NUll,
    og_title VARCHAR NOT NULL,
    og_description VARCHAR NOT NULL,
    og_image VARCHAR NOT NULL
);

CREATE TABLE page_components (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    page_id uuid REFERENCES pages (_id) ON DELETE CASCADE,
    component_id uuid NOT NUll,
    component_data JSON NOT NULL
);
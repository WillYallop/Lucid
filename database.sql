CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION fuzzystrmatch;

CREATE TABLE users (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
    defualt_details boolean NOT NULL DEFAULT true,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    email VARCHAR,
    privilege INT NOT NULL
);

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
    is_homepage boolean NOT NULL DEFAULT false,
    post_type_id uuid
);

CREATE TABLE page_seo (
    page_id uuid UNIQUE REFERENCES pages (_id) ON DELETE CASCADE,

    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    canonical VARCHAR NOT NULL,
    robots VARCHAR NOT NULL,

    og_type VARCHAR NOT NULL,
    og_title VARCHAR NOT NULL,
    og_description VARCHAR NOT NULL,
    og_image VARCHAR NOT NULL,

    twitter_card VARCHAR NOT NULL,
    twitter_title VARCHAR NOT NULL,
    twitter_description VARCHAR NOT NULL,
    twitter_image VARCHAR NOT NULL,
    twitter_creator VARCHAR NOT NULL,
    twitter_site VARCHAR NOT NULL,
    twitter_player VARCHAR NOT NULL
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
    _id uuid PRIMARY KEY,
    page_id uuid REFERENCES pages (_id) ON DELETE CASCADE,
    component_id uuid NOT NUll, -- referes to themes config component ID
    position INT NOT NULL
);


-- content type group
CREATE TABLE content_type_field_group (
    _id uuid PRIMARY KEY,
    page_component_id uuid REFERENCES page_components (_id) ON DELETE CASCADE,
    parent_group uuid REFERENCES content_type_field_group (_id) ON DELETE CASCADE,
    parent_config_id uuid,
    position INT NOT NULL
);

-- Content Type Text
CREATE TABLE component_content_type_text (
    page_component_id uuid REFERENCES page_components (_id) ON DELETE CASCADE,
    group_id uuid REFERENCES content_type_field_group (_id) ON DELETE CASCADE,
    config_id uuid NOT NUll,
    value VARCHAR NOT NULL,
    root BOOLEAN NOT NULL
);

-- Content Type Number
CREATE TABLE component_content_type_number (
    page_component_id uuid REFERENCES page_components (_id) ON DELETE CASCADE,
    group_id uuid REFERENCES content_type_field_group (_id) ON DELETE CASCADE,
    config_id uuid NOT NUll,
    value INT NOT NULL,
    root BOOLEAN NOT NULL
);

-- Content Type Repeater
CREATE TABLE component_content_type_repeater (
    page_component_id uuid REFERENCES page_components (_id) ON DELETE CASCADE,
    group_id uuid REFERENCES content_type_field_group (_id) ON DELETE CASCADE,
    config_id uuid NOT NUll,
    root BOOLEAN NOT NULL
);
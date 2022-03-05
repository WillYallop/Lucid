import db from '../../db';

export const getpageFullSlug = async (_id: mod_pageModel["_id"], slug: mod_pageModel["slug"]) => {
    try {
        // Query for parent slug
        let res = await db.one('SELECT slug, has_parent, parent_id FROM pages WHERE _id=$1', _id);
        slug = '/'+res.slug + slug;
        if(res.has_parent) slug = await getpageFullSlug(res.parent_id, slug);
        return slug;
    }
    catch(err) {
        throw err;
    }
}
// Key: cont_seo_

interface cont_seo_updateSingleInp {
    title: mod_pageModel["seo"]["title"]
    description: mod_pageModel["seo"]["description"]
    og_title: mod_pageModel["seo"]["og_title"]
    og_description: mod_pageModel["seo"]["og_description"]
    og_image: mod_pageModel["seo"]["og_image"]
}
interface cont_seo_updateSingleUpdateObj {
    title?: mod_pageModel["seo"]["title"]
    description?: mod_pageModel["seo"]["description"]
    og_title?: mod_pageModel["seo"]["og_title"]
    og_description?: mod_pageModel["seo"]["og_description"]
    og_image?: mod_pageModel["seo"]["og_image"]
}

// saveSingleSEO
interface const_seo_saveSingleInp {
    page_id: mod_pageModel["_id"]
    title: mod_pageModel["seo"]["title"]
    description: mod_pageModel["seo"]["description"]
    og_title: mod_pageModel["seo"]["og_title"]
    og_description: mod_pageModel["seo"]["og_description"]
    og_image: mod_pageModel["seo"]["og_image"]
}
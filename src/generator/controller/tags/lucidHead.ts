import { Liquid, Context, Emitter } from 'liquidjs';

const __generateSEOMarkup = async (seo: gen_templateCompilerProps["seo"]): Promise<string> => {
    let seoMarkup = '';

    if(seo.title) seoMarkup += `<title>${seo.title}</title>`;
    if(seo.description) seoMarkup += `<meta name="description" content="${seo.description}"/>`;
    if(seo.canonical) seoMarkup += `<link rel="canonical" href="${seo.canonical}"/>`;
    if(seo.robots) seoMarkup += `<meta name="robots" content="${seo.robots}" />`;

    if(seo.og_type) seoMarkup += `<meta property="og:type" content="${seo.og_type}"/>`;
    if(seo.og_title) seoMarkup += `<meta property="og:title" content="${seo.og_title}"/>`;
    if(seo.og_description) seoMarkup += `<meta property="og:description" content="${seo.og_description}"/>`;
    if(seo.og_image) seoMarkup += `<meta property="og:image" content="${seo.og_image}"/>`;
    
    if(seo.twitter_card) seoMarkup += `<meta name="twitter:card" content="${seo.twitter_card.replaceAll(' ', '_')}"/>`;
    if(seo.twitter_title) seoMarkup += `<meta name="twitter:title" content="${seo.twitter_title}" />`;
    if(seo.twitter_description) seoMarkup += `<meta name="twitter:description" content="${seo.twitter_description}" />`;
    if(seo.twitter_image) seoMarkup += `<meta name="twitter:image" content="${seo.twitter_image}" />`;
    if(seo.twitter_creator) seoMarkup += `<meta name="twitter:creator" content="${seo.twitter_creator}" />`;
    if(seo.twitter_site) seoMarkup += `<meta name="twitter:site" content="${seo.twitter_site}" />`;
    if(seo.twitter_player) seoMarkup += `<meta name="twitter:player" content="${seo.twitter_player}" />`;

    return seoMarkup;
}


export const lucidHeadTagRegister = (engine: Liquid, data: gen_templateCompilerProps["head"], seo: gen_templateCompilerProps["seo"]) => {
    return engine.registerTag('lucidHead', {
        render: async function (context: Context, emitter: Emitter) {
            let markup = '';

            markup += await __generateSEOMarkup(seo);

            emitter.write(markup);
        }
    });
}
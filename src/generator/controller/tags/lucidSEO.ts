import { Liquid, Context, Emitter } from 'liquidjs';

export const lucidSEOTagRegister = (engine: Liquid, data: gen_templateCompilerProps["seo"]) => {
    return engine.registerTag('lucidSeo', {
        render: async function (context: Context, emitter: Emitter) {
            emitter.write(`<title>${data.title}</title>
            <meta name="description" content="${data.description}">`);
        }
    });
}
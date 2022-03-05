import { Liquid, TagToken, Context, Emitter, TopLevelToken } from 'liquidjs';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const domain = config.domain;
const hasHttps = config.https;


export const lucidAssetTagRegister = (engine: Liquid) => {
    return engine.registerTag('lucidAsset', {
        parse: function(tagToken: TagToken, remainTokens: TopLevelToken[]) {
            let assetPath = tagToken.args.replaceAll('"', '');
            this.assetSrc = `"${hasHttps?'https://':'http://'}assets.${domain}${assetPath}"`;
        },
        render: async function(ctx: Context, emitter: Emitter) {
            emitter.write(this.assetSrc);
        }
    });
}

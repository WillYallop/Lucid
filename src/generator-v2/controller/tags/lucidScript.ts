import { Liquid, TagToken, Context, Emitter, TopLevelToken } from 'liquidjs';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const domain = config.domain;
const hasHttps = config.https;

// lucidScript custom tag
export const lucidScriptTagRegister = (engine: Liquid) => {
    return engine.registerTag('lucidScript', {
        parse: function(tagToken: TagToken, remainTokens: TopLevelToken[]) {
            let assetConfig: {
                src: string
                load: 'onload' | 'visible'
                visibleID?: string
                async: boolean
                defer: boolean
            } = JSON.parse(tagToken.args);
            this.assetSrc = `${hasHttps?'https://':'http://'}assets.${domain}${assetConfig.src}`;
            this.load = assetConfig.load;
            this.visibleID = assetConfig.visibleID;
            this.async = assetConfig.async;
            this.defer = assetConfig.defer;
        },
        render: async function(ctx: Context, emitter: Emitter) {
            // If the user wants the script to be on load
            if(this.load === 'onload') {
                emitter.write(`<script src="${this.assetSrc}" ${this.async === true?'async':''} ${this.defer === true?'defer':''}></script>`);
            }
            else if(this.load === 'visible') {
                emitter.write(`<lucidTempIslandObj>
                    {
                        "src": "${this.assetSrc}",
                        "id": "${this.visibleID}"
                    }
                </lucidTempIslandObj>`);
            }
        }
    });
}
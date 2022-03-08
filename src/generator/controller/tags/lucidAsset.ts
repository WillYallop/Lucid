import { Liquid, TagToken, Context, Emitter, TopLevelToken } from 'liquidjs';
import buildAssetRelativePath from './helpers/relative_path';

export const lucidAssetTagRegister = (engine: Liquid, mode: gen_componentCompilerProps["mode"], relative_path: string) => {
    return engine.registerTag('lucidAsset', {
        parse: function(tagToken: TagToken, remainTokens: TopLevelToken[]) {
            const assetPath = tagToken.args.replaceAll('"', '');
            this.assetSrc = `"${buildAssetRelativePath(mode, relative_path, assetPath)}"`;
        },
        render: async function(ctx: Context, emitter: Emitter) {
            emitter.write(this.assetSrc);
        }
    });
}
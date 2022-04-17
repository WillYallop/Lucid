const path = require('path');

// assets are routed to the same domain as the app so paths should be relative.
// this saves us from having to deal with what the apps domain and protocol is 
// based on the page path of this asset, build out the correct path to the root/assets directory

// check the file isnt index.html, as this could mess with our page routing, if the user has create an assets page

// if the mode is preview, we set the paths absolute to the cms with the cms url passed to it
// if the mode is site, we set the paths relative to the page.

// __buildAssetRelativePath
export default (mode: gen_componentCompilerProps["mode"], relative_path: string, asset_path: string) => {
    if(mode === 'preview') {
        const pathString = `${relative_path}/app-assets/${asset_path}`;
        return pathString.replace(/\\/g, "/");
    }
    else {
        const relativePathToPage = path.relative(relative_path, `/`);
        const pathString = `${relativePathToPage}/assets/${asset_path}`;
        return pathString.replace(/\\/g, "/");
    }
}
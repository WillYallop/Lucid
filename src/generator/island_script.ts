interface islandScriptConfig {
    id: string
    src: string
}

const buildObserverScript = (scriptConfig: Array<islandScriptConfig>) => {
    let componentsArr = '[';
    let keyArr = '{';
    for(let i = 0; i < scriptConfig.length; i++) {
        // Build out component array
        componentsArr += `document.getElementById('${scriptConfig[i].id}'),`;
        // Build out key obj
        keyArr += `'${scriptConfig[i].id}':{
            loaded: false,
            path: '${scriptConfig[i].src}'
        },`
    }
    componentsArr += ']';
    keyArr += '}';
    let script = `<script>
        "use strict";
        var components = ${componentsArr};
        var key = ${keyArr};
        var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var head = document.getElementsByTagName('head')[0];
        
            if (entry.intersectionRatio > 0) {
            // In view
            if (!key[entry.target.id].loaded) {
                var script = document.createElement('script');
                script.setAttribute('src', key[entry.target.id].path);
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('charset', 'utf-8');
                head.insertBefore(script, head.firstChild);
            }
            }
        });
        });
        components.forEach(function (comp) {
        observer.observe(comp);
        });
    </script>`;
    return script;
}

// build island script handler
export default async (markup: string): Promise<string> => {
    try {
        // Run markup through a function that finds all instances of <lucidTempIslandObj></lucidTempIslandObj>;
        // With these, remove them from the markup, and compile a script that will load those scripts when the element of that ID comes visible
        // Insert this script
        const elementStrings = ["<lucidTempIslandObj>", "</lucidTempIslandObj>"] 
        const scriptConfig: Array<islandScriptConfig> = [];

        // While we have instances of the <lucidTempIslandObj> in out page markup, grab the data and remove it from the markup.
        while (markup.includes(elementStrings[0]))
        {
            // Get find start and end index
            let startInd = markup.indexOf(elementStrings[0]);
            let endInd = markup.indexOf(elementStrings[1]);
            // Get full element
            let fullString = markup.substring(startInd, endInd + elementStrings[1].length);

            // Remove string from markup
            markup = markup.replace(fullString, '');

            // Get data
            let contentString = fullString.substring(elementStrings[0].length, fullString.length - elementStrings[1].length);
            let contentJson = JSON.parse(contentString);
            // Add data.
            scriptConfig.push({
                id: contentJson.id,
                src: contentJson.src
            });
        }

        if(scriptConfig.length) {
            let script = buildObserverScript(scriptConfig);
            // Insert script var above the closing body tag of the page! If it doenst have one - just place it at the end of the page
            let endBodyInd = markup.indexOf('</body>');
            markup = markup.slice(0, endBodyInd - 1) + script + markup.slice(endBodyInd);
        }

        return markup;
    }
    catch(err) {
        throw err;
    }
}
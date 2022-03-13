# LucidCMS
> Under heavy construction

LucidCMS is a fully functioning CMS built in NodeJS and Typescript. It was inspired by a handful of projects such wordpress, strapi, ACF and Shopify.

This read me is not complete!


## Liquid Custom tags:

On top of the default liquid tags, we have a few of our own registered. Click the links bellow to read more about them and what they do!

- [lucidScript](#lucidscript)
- [lucidHead](#lucidHead)
- [lucidApp](#lucidApp)
- [lucidFooter](#lucidFooter)

### lucidScript
> Make sure paramater is strict JSON with quotes around keys!

This custom tag handles importing javascript into your component or page. It has a few paramaters that enables you to configure how the script is added. Perhaps the coolest one of these is the ```load``` paramater. Which can take either ```visible``` or ```onload``` and tells lucid if you want to load the script on page load, or when the component is visible, similar to how frameworks like Asto handle their components with [Island Architecture](https://jasonformat.com/islands-architecture/).

- The ```src``` paramater is relative to the theme/assets directory!
- the ```visibleID``` should be the coresponding element ID you want to load the script with when it enters the browser viewbox. This is only used if the ```load``` paramater is set to ```visible```!
- ```async``` and ```defer``` are only applied if the ```load``` paramater is set to ```onload```!

Example tag:
```
{% lucidScript { 
    "src": "/js/index.js",
    "load": "visible",
    "visibleID": "id123",
    "async": true,
    "defer": true
} %}
```

Interface:
```
{ 
    src: string
    load: 'visible' | 'onload'
    visibleID?: string
    async?: boolean
    defer?: boolean
}
```

### lucidAsset

This tag can be used to add the src to your template. Paths are relative to the theme/assets directory! This tag returns your asset src as string in quotations already!

Example tag:
```
<img src={% lucidAsset "/images/tree.jpg" %} width="200px" height="200px"/>
```

### lucidHead

### lucidApp

### lucidFooter
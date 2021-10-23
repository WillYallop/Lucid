# WillPress

## Local Setup

Once you have configured you .env file with the DOMAIN field. Youll want to get the running locally on your machine. Run ```npm run dev``` for this (notice the IP will be logged).

> Only change the PORT in the .env file if necessary.

Now it is running, you will want to point the IP that was logged, to the domain you specified in the .env. To do this run ```sudo nano /etc/hosts``` on mac to edit your hosts file. This may differ on windows. Now you are in your hosts file paste the following:

```
192.168.1.103 willpress.local
192.168.1.103 admin.willpress.local
192.168.1.103 assets.willpress.local
192.168.1.103 api.willpress.local
```
> Obviosuly swap out the IP and DOMAIN specific to your environment.


## Theme Breakdown

### Layouts

A layout is a top level component. These should contain the basic building blocks of a web page, such as the head, standard meta data and your body tag. On top of this there are some WillPress specific tags such as ```{% LAYOUT_CONTENT %}``` and ```{% SEO_CONTENT %}``` which are used to inject the CMS data. For example:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Layout Example</title>
        {% SEO_CONTENT %}
    </head>
    <body>
        <!-- Header -->
        <header></header>
        <!-- Main -->
        <main>
            {% LAYOUT_CONTENT %}
        </main>
        <!-- Footer -->
        <footer></footer>
    </body>
</html>
```

### Templates

Each time you create a page or post, you must pick a template. This is used to give you a bit more control over what the page should look like beyond the basic elements that the layout controls. This file can include a couple of WillPress specific tags, for instance the ```{% TEMPLATE_CONTENT %}``` and a custom include tag which can be configured in the "config/includes.json" file. (these includes have their own section on the CMS where you can configure data to be injected into them, all instances of this type of componenet will contain that same data - this is where they differ from standard componenet).

An example template might look like this:

```html
<div class="templateContainer">
    <div class="mainContent">
        {% TEMPLATE_CONTENT %}
    </div>
    {% INCLUDE_SIDEBAR %}  <!-- this can be configured in config/includes.json" -->
</div>
```

### Posts

Posts are a sub category of pages that can only use one template. Each post type you add, a new menu item will appear in the CMS where you can manage all of the pages for that post type. These can be edited at ``` themes/config/posts.json ```
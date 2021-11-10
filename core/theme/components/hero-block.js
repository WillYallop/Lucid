// We will use a mixute of valid javascript and a template tag (similar to vue to build our components)

// STEPS ON GENERATE:
// - Grab the component file.
// - Grab content of the template element bellow and place create a hold in memory
// - Grab custom fields from CMS and hold in memory
// - Create a temp hero-block file that has the template element stripped from it.
// - When ready, we call the component class, and construct it with the template and field data that we are holding in memory
// - The component class can then manipulate the string, then it will return the final markdown which will be used to build the pages.

// All javascript intended for the front end will be handled in a seperate file.

<template>
    <section class="sectionCon">
        <h1>I am the Hero Block</h1>
    </section>
</template>

export default class HeroBlock extends Component {
    constructor(template, data) {
        // Data will contain all custom field data that is set up in the components file 
        // Set our markup
        this.data = data;
        this.template = template; 

        // Construct parent "Component" class
        super();

    }
    template() {
        // Manipulate the template

    }
}
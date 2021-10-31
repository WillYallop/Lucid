<template>
    <LayoutMainSection class="_02-01"
    :title="mainSection.title"
    :body="mainSection.body">
        <!-- Action Button -->
        <template v-slot:actionButton>
            <button class="iconMain large _02-01">
                <img class="iconImg" src="@/assets/icons/plus.svg" alt="Pages">
            </button>
        </template>
        <!-- Main -->
        <template v-slot:main>


        </template>
    </LayoutMainSection>
</template>

<script>
export default {
    async asyncData({ params, redirect, store }) {
        const pageID = params.pageID;
        if(pageID != undefined) {
            try {
                await store.dispatch('cmpa_loadSinglePage', pageID);
                return {
                    create: false
                }
            }
            catch(err) {
                console.error(err);
                redirect('/edit/page');
            }
        }
        else {
            return {
                create: true
            }
        }
    },
    data() {
        return {
            mainSection: {
                title: 'Edit page',
                body: 'Update the layout and content for this page.'
            }
        }
    },
    mounted() {

    },
    methods: {
  
    }
}
</script>

<style lang="scss" scoped>

</style>
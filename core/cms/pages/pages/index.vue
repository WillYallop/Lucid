<template>
    <LayoutMainSection class="_02-01"
    :title="'Pages'"
    :body="'Create and manage all of your page'">
        <!-- Action Button -->
        <template v-slot:actionButton>
            <nuxt-link class="iconMain large _02-01" to="/edit/page">
                <img class="iconImg" src="@/assets/icons/plus.svg" alt="Pages">
            </nuxt-link>
        </template>
        <!-- Main -->
        <template v-slot:main>

            {{pages}}

            <div class="pagesListCon">
                <LoopsPage v-for="page in pages" :key="page._id"
                :page="page"
                :postName="'page'"/>
            </div>

        </template>
    </LayoutMainSection>
</template>

<script>
export default {
    async asyncData({ params, redirect, store }) {
        try {
            // Load post data
            let pagesRes = await store.dispatch('cmpa_loadMultiplePages', {
                post_name: 'page',
                limit: 20,
                skip: 0
            });
            return { 
                pages: pagesRes.data
            }
        }
        catch(err) {
            throw new Error(err);
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>

</style>
<template>
    <LayoutMainSection class="_02-01"
    :title="`Post - ${this.postName}`"
    :body="'Create and manage all of your pages for this post type!'">
        <!-- Action Button -->
        <template v-slot:actionButton>
            <nuxt-link class="iconMain large _02-01" :to="{ name: 'edit-post_name-page_title', params: { post_name: postName.toLowerCase() }}">
                <img class="iconImg" src="@/assets/icons/plus.svg" alt="Pages">
            </nuxt-link>
        </template>
        <!-- Main -->
        <template v-slot:main>

            <p class="greyedOut">Total Pages: {{ totalOfSamePost }}</p>

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
    async validate({ params, store }) {
        const postName = params.post_name;
        try {
            var verifPostNameRes = await store.dispatch('cmth_verifyPostName', postName);
            if(verifPostNameRes.data.type === 'post') return true
            else return false
        }
        catch(err) {
            console.error(err);
            return false
        }
    },
    async asyncData({ params, store }) {
        const postName = params.post_name
        try {
            // Load post data
            let pagesRes = await store.dispatch('cmpa_loadMultiplePages', {
                post_name: postName,
                limit: 20,
                skip: 0
            });
            return { 
                postName,
                totalOfSamePost: pagesRes.meta.total_of_same_post,
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
.pagesListCon {
    margin-top: 5px;
}
</style>
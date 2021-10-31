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

            {{pageData.data}}


        </template>
    </LayoutMainSection>
</template>

<script>
export default {
    async asyncData({ params, $axios, redirect }) {
        const pageID = params.pageID;
        try {
            if(pageID) {
                let pageData = await $axios.get(`${process.env.API_URL}/cms/page/${pageID}`)

                return { pageData }
            }
            else {
                let pageData = 'create new page';
                return { pageData }
            }
        }
        catch(err) {
            console.error({
                status: err.response.status,
                title: 'Request Error',
                source: `/edit/page/${pageID}`,
                response: err.response
            });
            redirect('/edit/page');
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
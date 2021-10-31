<template>
    <LayoutMainSection class="_02-01"
    :title="mainSection.title"
    :body="mainSection.body">
        <!-- Action Button -->
        <template v-slot:actionButton>
            <button class="iconMain large _02-01">
                <img class="iconImg" src="@/assets/icons/save.svg" alt="Pages">
            </button>
        </template>
        <!-- Main -->
        <template v-slot:main>

            <!-- Top Full Width Row -->
            <div class="topRowWrapper">
                <FormInput 
                :value="pageName"
                :placeholder="'Page name'"
                @updateProp="pageName = $event"/>
            </div>

            <!-- Main Content -->
            <div class="editorWrapper">
                <!-- Page Editor -->
                <div class="pageEditorCon">
                    Edit
                </div>
                <!-- Page Config Sidebar -->
                <div class="pageConfigSidebar">
                    Sidebar
                </div>
            </div>

        </template>
    </LayoutMainSection>
</template>

<script>
export default {
    async asyncData({ params, redirect, store }) {
        const slug = params.slug;
        if(slug != undefined) {
            try {
                await store.dispatch('cmpa_loadSinglePage', slug);
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
    computed: {
        pageName: {
            set(val) {
                this.$store.commit("cmpa_stateMultiMutate", {
                    action: 'set',
                    state: 'page',
                    item: 'page_name',
                    data: val
                });
            },
            get() {
                return this.$store.state.cmsPages.page.page_name
            }
        },
    },
    methods: {
        async savePage() {
            if(this.create) {

                let createPageRes = await this.$store.dispatch('', );
                
            }
            else {

            }
        }
    }
}
</script>

<style lang="scss" scoped>
.topRowWrapper {
    input {
        height: 50px;
    }
}
.editorWrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .pageEditorCon {
        width: calc(100% - 320px);
        min-height: calc(100vh - 270px);
        border: $border;
        border-radius: $borderRadius;
    } 
    .pageConfigSidebar {
        min-width: 300px;
        position: sticky;
        top: 80px;
        border: $border;
        border-radius: $borderRadius;
        height: 400px;
    }
} 
</style>
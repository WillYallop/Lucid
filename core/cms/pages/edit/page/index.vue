<template>
    <LayoutMainSection class="_02-01"
    :title="`Edit page`"
    :body="'Edit page'">
        <!-- Action Button -->
        <template v-slot:actionButton>
            <button class="iconMain large _02-01">
                <img class="iconImg" src="@/assets/icons/plus.svg" alt="Pages">
            </button>
        </template>
        <!-- Main -->
        <template v-slot:main>



            <button @click="toggleLoading">Toggle Loading</button>
            


        </template>
    </LayoutMainSection>
</template>

<script>
export default {
    methods: {
        toggleLoading() {
            this.$store.dispatch('colo_toggleLoadingState', {
                toggle: true
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
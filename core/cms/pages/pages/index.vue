<template>
    <LayoutMainSection class="_02-01"
    :title="'Pages'"
    :body="'Create and manage all of your page'">
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

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

    methods: {
        toggleLoading() {
            this.$store.dispatch('colo_toggleLoadingState', {
                toggle: true
            })
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
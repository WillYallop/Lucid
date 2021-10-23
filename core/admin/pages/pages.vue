<template>
    <div>

        <GeneralMainSection class="_02-01"
        :title="'Pages'"
        :body="'Create and manage all of your page'">
            <!-- Main -->
            <template v-slot:headerButton>
                <button class="iconMain large _02-01">
                    <img class="iconImg" src="@/assets/icons/plus.svg" alt="Pages">
                </button>
            </template>
            <!-- Main -->
            <template v-slot:main>
                
            </template>
        </GeneralMainSection>


        <button @click="toggleLoading">Toggle Loading</button>
    </div>
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
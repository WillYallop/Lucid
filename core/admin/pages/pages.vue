<template>
    <div>
        <h1>PAGE</h1>
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
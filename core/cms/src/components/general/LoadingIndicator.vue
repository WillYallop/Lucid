<template>
    <img v-if="loadingState" class="loadingIndicator" src="@/assets/images/logoIcon.svg" alt="Logo Icon Spinning">
</template>

<script lang="ts">
export default {
    computed: {
        loadingState(): boolean {
            return this.$store.state.coreLoading.loadingState
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

<template>
    <img v-if="loadingState" class="loadingIndicator" src="@/assets/images/logoIcon.svg" alt="Logo Icon Spinning">
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        loadingState(): boolean {
            return this.$store.state.coreLoading.loadingState
        }
    }
})
</script>

<style lang="scss" scoped>
.loadingIndicator {
    position: fixed;
    bottom: 20px;
    right: 20px;
    pointer-events: none;
    z-index: 11;
    height: 40px;
    width: 40px;
    animation: rotate infinite 2s linear;
    @keyframes rotate {
        0%   {transform: rotate(0);}
        100% {transform: rotate(360deg);}
    }
}
</style>
<template>
    <div class="modalOuter" v-if="state">
        <div class="modalCon">
            <div class="modalWrapper">
                <div class="modalContent">

                    <slot></slot>

                </div>
            </div>
        </div>
        <div class="modalBackground" @click="$emit('toggle')"></div>
    </div>
</template>

<script>
export default {
    props: {
        state: Boolean
    },
    watch: {
        state(val) {
            if(val) document.body.style.overflow = 'hidden';
            else document.body.style.overflow = null;
        }
    }
}
</script>

<style lang="scss" scoped>
.modalOuter {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 11;
    overflow-y: auto;
    .modalBackground {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba($color: #000000, $alpha: 0.8);
        backdrop-filter: blur(3px);
        z-index: 1;
        cursor: pointer;
    }
    .modalCon {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        position: relative;
        pointer-events: none;
        .modalWrapper {
            padding: 20px;
            margin: auto;
            width: 100%;
            max-width: 850px;
            .modalContent {
                pointer-events: all;
                width: 100%;
                background-color: map-get($map: $colours, $key: _05-01);
                border: $border;
                border-radius: $borderRadius;
            }
        }
    }
}
</style>


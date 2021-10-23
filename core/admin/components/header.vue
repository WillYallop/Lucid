<template>
    <header class="headerCon">
        
        <nuxt-link to="/" class="siteLogo">
            <img class="siteLogo" src="@/assets/images/logo.svg" alt="Site Logo">
        </nuxt-link>

    </header>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.headerCon {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $header-height;
    background-color: map-get($map: $colours, $key: _05-01);
    z-index: 10;
    border-bottom: $border;
    padding: 0 $padding;
    display: flex;
    align-items: center;
    .siteLogo {
        height: 30px;
    }
}
</style>
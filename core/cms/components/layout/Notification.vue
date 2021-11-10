<template>
    <div class="notificationBar" :class="[{ 'error' : error,  }, classname]">
        <!-- Title -->
        <p class="mediumP" v-if="title">{{ title }}</p>
        <template v-else>
            <p class="mediumP" v-if="error">Error</p>
            <p class="mediumP" v-else>Notification</p>
        </template>
        <!-- Body -->
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        classname: String,
        error: Boolean
    }
}
</script>

<style lang="scss" scoped>
.notificationBar {
    width: 100%;
    padding: 10px;
    border: $border;
    border-left: 5px solid map-get($map: $colours, $key: _01-01);
    margin-bottom: 5px;
    border-radius: 0 10px 10px 0;
    &._01-01 {
        border-left: 5px solid map-get($map: $colours, $key: _01-01);
    }
    &._02-01 {
        border-left: 5px solid map-get($map: $colours, $key: _02-01);
    }
    &._03-01 {
        border-left: 5px solid map-get($map: $colours, $key: _03-01);
    }
    &._04-01 {
        border-left: 5px solid map-get($map: $colours, $key: _04-01);
    }
    &.error {
        border-left: 5px solid map-get($map: $colours, $key: _06-01);
    }
    .mediumP {
        margin-bottom: 5px;
    }
}
</style>
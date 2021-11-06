<template>
    <div class="pageRow">
        <p><b>{{ page.page_name }}</b> - <span>{{ page.slug }}</span></p>
        <nuxt-link :to="{ name: 'edit-post_name-page_name', params: { post_name: postName, page_name: page.page_name }}">edit</nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        postName: String,
        page: Object
    }
}
</script>

<style lang="scss" scoped>
.pageRow {
    border: $border;
    width: 100%;
    border-radius: $borderRadius;
    background-color: map-get($map: $colours, $key: _05-01);
}
</style>
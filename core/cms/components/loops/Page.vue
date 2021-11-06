<template>
    <div class="pageRow">
        <p class="mediumP">{{ page.page_name }} - <span class="greyedOut">{{ page.slug }}</span></p>
        <div class="optionsRow">
            <nuxt-link class="optionsLink" :to="{ name: 'edit-post_name-page_title', params: { post_name: postName, page_title: page.page_title }}">edit</nuxt-link>
            <nuxt-link class="optionsLink" to="/">home</nuxt-link>
        </div>
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
    padding: 10px;
    // Title
    .pageNameP {
        font-weight: 500;
        font-size: 16px;
    }
    // Options
    .optionsRow {
        margin-top: 5px;
        .optionsLink {
            position: relative;
            margin-right: 20px;
            &:last-child {
                margin-right: 0;
                &::after {
                    content: none;
                }
            }
            &::after {
                content: '';
                position: absolute;
                right: -12px;
                top: 2px;
                bottom: 2px;
                width: 1px;
                background-color:  $borderColour;
            }
        }
    }
}
</style>
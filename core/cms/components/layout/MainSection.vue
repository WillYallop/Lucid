<template>
    <section class="mainSectionCon">

        <header class="sectionHeader">
            <div class="sectionHeaderTextarea">
                <h1>{{ this.title }}</h1>
                <p v-if="body" class="bodyText">{{ this.body }}</p>
            </div>
            <div class="actionButtonCon">
                 <slot name="actionButton"></slot>
            </div>
        </header>

        <!-- Main content -->
        <div class="sectionMain">
            <slot name="main"></slot>
        </div>

    </section>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    props: {
        title: String,
        body: String
    }
})
</script>

<style lang="scss" scoped>
.mainSectionCon {
    &._01-01 {
        .sectionHeader {
            border-color: map-get($map: $colours, $key: _01-01);
        }
    }
    &._02-01 {
        .sectionHeader {
            border-color: map-get($map: $colours, $key: _02-01);
        }
    }
    &._03-01 {
        .sectionHeader {
            border-color: map-get($map: $colours, $key: _03-01);
        }
    }
    &._04-01 {
        .sectionHeader {
            border-color: map-get($map: $colours, $key: _04-01);
        }
    }
    .sectionHeader {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid;
        padding-bottom: $padding;
        margin-bottom: $padding;
        .sectionHeaderTextarea {
            h1 {
                margin-bottom: 5px;
            }
        }
        .actionButtonCon {
            width: auto;
        }
    }
    .sectionMain {
        width: 100%;
    }
}

</style>
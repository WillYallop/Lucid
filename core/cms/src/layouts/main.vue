<template>
    <div class="layoutCon">

        <Header/>
        <div class="siteContent">
          <Navigation/>
          <main class="mainContent">
            <Nuxt/>
          </main>
        </div>

    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class MainLayout extends Vue {

}
</script>

<style lang="scss" scoped>

</style>

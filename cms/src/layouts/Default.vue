<template>
    <div>
        <Header/>
        <div class="siteContent">
          <Navigation/>
          <main class="mainContent">
            <slot></slot>
          </main>
        </div>
      <LoadingIndicator/>
    </div>
</template>

<script lang="ts">
import Header from '@/components/layout/Header.vue';
import Navigation from '@/components/layout/Navigation.vue';
import LoadingIndicator from '@/components/general/LoadingIndicator.vue';

export default {
    components: {
        Header,
        Navigation,
        LoadingIndicator
    }
}
</script>

<style lang="scss">
.siteContent {
  display: flex;
  .mainContent {
    width: calc(100% - 250px);
    margin: $header-height 0 0 250px;
    padding: 30px;
  }
}
</style>
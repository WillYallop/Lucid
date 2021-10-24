<template>
  <LayoutMainSection class="_03-01"
  :title="'Media'"
  :body="'Mange all of your media!'">
      <!-- Action Button -->
      <template v-slot:actionButton>
          <button class="iconMain large _03-01">
              <img class="iconImg" src="@/assets/icons/plus.svg" alt="Add Media">
          </button>
      </template>
      <!-- Main -->
      <template v-slot:main>



      </template>
  </LayoutMainSection>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({

})
</script>

<style lang="scss" scoped>

</style>
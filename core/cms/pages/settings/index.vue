<template>
  <LayoutMainSection class="_04-01"
  :title="'Settings'"
  :body="'Mange your sites settings!'">
      <!-- Action Button -->
      <template v-slot:actionButton>
          <button class="iconMain large _04-01">
              <img class="iconImg" src="@/assets/icons/plus.svg" alt="Add Component">
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
<template>
  
  <div class="con">
    <div class="pages">

      <button class="publishPageBtn" @click="publishPages">PUBLISH CHANGES</button>

    </div>
    <div class="pageCon">

      <div class="createPage">

        <!-- Template Name -->
        <label for="templateName">
          Template Name
          <select id="templateName" v-model="templateName">
            <template v-for="option in templateOptions" >
              <option :key="option" :value="option">{{option}}</option>
            </template>
          </select>
        </label>
        <br>
        <label for="pageName">
            Page Name
            <input id="pageName" v-model="pageName">
        </label>
        <br>
        <label for="pageSlug">
            Page Slug
            <input id="pageSlug" v-model="pageSlug">
        </label>
        <br>
        <button @click="addPage">Add Page</button>

      </div>

    </div>
  </div>


</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
        templateOptions: [],

        templateName: '',
        pageName: '',
        pageSlug: ''
    }
  },
  mounted() {
      this.$axios.get('http://api.willpress.local/theme/templates')
      .then((response) => {
        console.log(response.data);
        this.templateOptions = response.data;
      })
      .catch((err) => {
        console.log(err);
      })
  },
  methods: {
    // 
    publishPages() {
        this.$axios.post('http://api.willpress.local/generate', {

        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    // Add new page
    addPage() {
        this.$axios.post('http://api.willpress.local/cms/page', {
          template_name: this.templateName,
          page_name: this.pageName,
          page_slug: this.pageSlug
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.con {
  width: 100%;
  display: flex;
  .pages {
    width: 400px;
    height: 100vh;
    background-color: rgb(236, 236, 236);
    border-right: 1px solid black;
    padding: 20px;
    .publishPageBtn {
      background-color: red;
      border-radius: 20px;
      width: 100%;
      padding: 10px 40px;
      margin-top: 20px;
      color: white;
      font-weight: bold;
    }
  }
  .pageCon {
    width: calc(100% - 200px);
    padding: 50px;
    .createPage {
      border: 1px solid black;
      padding: 20px;
      label {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>

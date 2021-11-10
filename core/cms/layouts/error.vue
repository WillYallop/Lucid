<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <ul style="list-style-type: disc; padding-left: 20px; margin-top:20px;">
        <li><NuxtLink to="/">Home page</NuxtLink></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>
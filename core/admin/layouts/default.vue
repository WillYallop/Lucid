<template>
    <div>
        <Header/>
        <div class="siteContent">
          <Navigation/>
          <main class="mainContent">
            <Nuxt/>
          </main>
        </div>
    </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

.siteContent {
  display: flex;
  .mainContent {
    width: calc(100% - 300px);
    margin: 0 0 0 300px;
    padding: 30px;
  }
}
</style>
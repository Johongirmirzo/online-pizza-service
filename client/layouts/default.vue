<template>
  <Navbar />
  <main class="main">
    <slot></slot>
  </main>
  <Footer />
</template>
<style scoped>
.main {
  max-width: 1260px;
  width: 90%;
  margin: 0 auto;
}
</style>
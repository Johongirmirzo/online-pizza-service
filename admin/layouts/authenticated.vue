<template>
  <div>
    <Navbar />
    <main class="main">
      <Sidebar />
      <!-- <NuxtPage/> -->
      <div class="main__box">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
<style scoped>
.main {
  display: flex;
}
.main__box {
  flex: 1;
  margin: 25px;
}
</style>
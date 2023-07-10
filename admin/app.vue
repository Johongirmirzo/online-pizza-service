<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { data } = useAuth();
const layout = ref("authenticated");

if (data?.value?.user?.name) {
  layout.value = "authenticated";
} else {
  layout.value = "unauthenticated";
}

// Sidebar Toggle
const isSidebarToggled = ref(false);
const toggleSidebar = () => {
  isSidebarToggled.value = !isSidebarToggled.value;
};
provide("sidebar-toggle", { isSidebarToggled, toggleSidebar });

// Mobile Version update
const isMobileVersion = ref(false);
const handleScroll = () => {
  const bodyWidth = document.documentElement.clientWidth;
  isMobileVersion.value = bodyWidth >= 760 ? false : true;
};
const handlePageLoad = () => {
  const bodyWidth = document.documentElement.clientWidth;
  isMobileVersion.value = bodyWidth >= 760 ? false : true;
};

onMounted(() => {
  window.addEventListener("resize", handleScroll);
  handlePageLoad();
});
onUnmounted(() => {
  window.removeEventListener("resize", handleScroll);
});

provide("mobile-version", { isMobileVersion });
</script>

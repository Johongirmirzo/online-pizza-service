<template>
  <div
    class="sidebar__wrapper"
    :class="{ active: mobileMenuStore.isMenuToggled && isMobileVersion }"
  >
    <button @click="handleToggleMenuClick" class="sidebar__close-btn">
      <Icon name="maki:cross" class="sidebar__close-icon" />
    </button>
    <aside
      class="sidebar"
      :class="{
        'sidebar--toggled': isSidebarToggled || isMobileVersion,
        'sidebar--mobile': isMobileVersion,
        'sidebar--mobile-open': mobileMenuStore.isMenuToggled,
      }"
    >
      <ul class="sidebar__list">
        <li
          v-for="sidebarRow in sidebar"
          :key="sidebarRow.id"
          class="sidebar__item"
        >
          <RouterLink
            v-if="sidebarRow.navigateTo"
            :to="sidebarRow.navigateTo"
            @click="handleMenuClick(sidebarRow.id)"
            class="sidebar__link"
            :class="{
              'sidebar__link--active': activeSidebarRowId === sidebarRow.id,
            }"
          >
            <div class="sidebar__icon-wrapper">
              <span class="sidebar__icon-box">
                <Icon class="sidebar__icon" :name="sidebarRow.icon" />
              </span>
              <span class="sidebar__text">
                {{ sidebarRow.name }}
              </span>
            </div>
            <button v-if="sidebarRow?.categories" class="sidebar__toggle-btn">
              <Icon name="teenyicons:right-solid" />
            </button>
          </RouterLink>
          <div v-else class="sidebar__link-box">
            <div
              @click="getSidebarRowId(sidebarRow.id)"
              class="sidebar__link"
              :class="{
                'sidebar__link--active': activeSidebarRowId === sidebarRow.id,
              }"
            >
              <div class="sidebar__icon-wrapper">
                <span class="sidebar__icon-box">
                  <Icon class="sidebar__icon" :name="sidebarRow.icon" />
                </span>
                <span class="sidebar__text">
                  {{ sidebarRow.name }}
                </span>
              </div>
              <button v-if="sidebarRow?.categories" class="sidebar__toggle-btn">
                <Icon name="teenyicons:right-solid" />
              </button>
            </div>
            <ul
              v-if="activeSidebarRowId === sidebarRow.id"
              class="sidebar__menu-list"
            >
              <li
                class="sidebar__menu-item"
                v-for="category in sidebarRow.categories"
                :key="category.id"
              >
                <NuxtLink
                  :to="category.navigateTo"
                  @click.stop="getSubMenuId(category.id)"
                  class="sidebar__menu-link"
                  :class="{
                    'sidebar__menu-link--active': subMenuId === category.id,
                  }"
                >
                  {{ category.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </aside>
  </div>
</template>
<script setup lang="ts">
import { useMobileMenuStore } from "~/stores/mobileMenu";
import {
  sub_admin_not_allowed_routes,
  driver_not_allowed_routes,
} from "~/config/prohibitedRoutes";
import { sidebar as sidebarList } from "~/config/sidebarRows";

const { data } = useAuth();

const sidebar = ref([...sidebarList]);
const activeSidebarRowId = ref("");
const subMenuId = ref("");

const { isSidebarToggled, toggleSidebar } = inject("sidebar-toggle");
const { isMobileVersion } = inject("mobile-version");
const mobileMenuStore = useMobileMenuStore();

onBeforeMount(() => {
  sidebar.value = sidebar.value.filter((sr) => {
    if (data?.value?.role === "SUB_ADMIN") {
      return !sub_admin_not_allowed_routes.includes(sr.name);
    } else if (data?.value?.role === "DRIVER") {
      return !driver_not_allowed_routes.includes(sr.name);
    } else {
      return true;
    }
  });
});

const handleToggleMenuClick = () => {
  mobileMenuStore.toggleMenu();
  toggleSidebar();
};
const getSidebarRowId = (id: string) => {
  if (activeSidebarRowId.value === id) {
    activeSidebarRowId.value = "";
  } else {
    activeSidebarRowId.value = id;
  }
};

const handleMenuClick = (sidebarRowId: string) => {
  console.log("Direct Menu", mobileMenuStore.isMenuToggled);
  if (mobileMenuStore.isMenuToggled) {
    mobileMenuStore.toggleMenu();
    toggleSidebar();
  }
  getSidebarRowId(sidebarRowId);
};

const getSubMenuId = (id: string) => {
  subMenuId.value = id;
  console.log("Sub Menu", mobileMenuStore.isMenuToggled);
  if (mobileMenuStore.isMenuToggled) {
    mobileMenuStore.toggleMenu();
    toggleSidebar();
  }
};
</script>
<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  padding: 20px;
  min-width: 280px;
  height: 100vh;
  border-right: 2px solid #999;
  transition: all 0.3s ease-out;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 5px;
  background: #f7f7f7;
}
.sidebar::-webkit-scrollbar-track {
  background: #f5f5f5;
}
.sidebar::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: #c2c2c2;
}
.sidebar--toggled:not(.sidebar--mobile) {
  min-width: 90px;
  overflow-y: scroll;
}
.sidebar--toggled:not(.sidebar--mobile):hover {
  min-width: 280px;
}

.sidebar--toggled:not(.sidebar--mobile):hover .sidebar__text,
.sidebar--toggled:not(.sidebar--mobile):hover .sidebar__toggle-btn,
.sidebar--toggled:not(.sidebar--mobile):hover .sidebar__menu-item {
  display: block;
}

.sidebar--toggled .sidebar__icon {
  font-size: 25px;
}
.sidebar--toggled:not(.sidebar--mobile) .sidebar__text,
.sidebar--toggled:not(.sidebar--mobile) .sidebar__toggle-btn,
.sidebar--toggled:not(.sidebar--mobile) .sidebar__menu-item {
  display: none;
}
.sidebar__wrapper.active {
  position: fixed;
  z-index: 9;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.sidebar__close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  font-size: 35px;
  transition: transform 0.3s ease-out;
}
.sidebar__close-btn:hover {
  transform: scale(1.05);
}
.sidebar--mobile {
  position: fixed;
  left: -300px;
  z-index: 9;
  background: #fff;
}
.sidebar--mobile-open {
  left: 0;
}
.sidebar--mobile .sidebar__text,
.sidebar--mobile .sidebar__toggle-btn,
.sidebar--mobile .sidebar__menu-item {
  display: block;
}

.sidebar__item {
  transition: all 0.3s ease-out;
}
.sidebar__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  transition: all 0.3s ease-out;
  cursor: pointer;
}
.sidebar__link:hover {
  background: #fc8019;
  color: #fff;
}
.sidebar__link:hover .sidebar__toggle-btn {
  color: #fff;
}
.sidebar__link:not(:last-child) {
  margin-bottom: 15px;
}
.sidebar__icon-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}
.sidebar__icon {
  font-size: 20px;
  color: #fc8019;
}
.sidebar__link:hover .sidebar__icon {
  color: #fff;
}
.sidebar__link-box {
  position: relative;
}
.sidebar__link--active {
  background: #fc8019;
  color: #fff;
}

.sidebar__link--active .sidebar__toggle-btn {
  transform: rotate(90deg);
  color: #fff;
}
.sidebar__link--active .sidebar__icon {
  color: #fff;
}
.sidebar__menu-list {
  margin-left: 25px;
}
.sidebar__menu-link {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 10px;
  transition: all 0.3s ease-out;
}
.sidebar__menu-link:focus {
  outline-offset: 5px;
  border-radius: 2px;
}
.sidebar__menu-link:hover {
  transform: translateX(5px);
  color: #fc8019;
}
.sidebar__menu-link.router-link-active {
  color: #fc8019;
}
</style> 
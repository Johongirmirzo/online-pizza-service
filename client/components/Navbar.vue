<template>
  <header class="header">
    <Login
      :isModalOpen="isLoginModalOpen"
      :closeModal="closeLoginModal"
      :openRegisterModal="openRegisterModal"
    />
    <Register
      :isModalOpen="isRegisterModalOpen"
      :closeModal="closeRegisterModal"
      :openLoginModal="openLoginModal"
    />
    <nav v-if="!isMobileVersion" class="header__top">
      <ul class="header__top-list">
        <li class="header__top-item">
          <NuxtLink class="header__link header__top-link" to="/about">
            About
          </NuxtLink>
        </li>
        <li class="header__top-item">
          <NuxtLink class="header__link header__top-link" to="/careers">
            Careers
          </NuxtLink>
        </li>
        <li class="header__top-item">
          <NuxtLink class="header__link header__top-link" to="/contact">
            Contact
          </NuxtLink>
        </li>
        <li class="header__top-item">
          <NuxtLink class="header__link header__top-link" to="/feedback">
            Give Feedback
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="header__middle">
      <NuxtLink class="header__website-logo-box" to="/">
        <img
          class="header__website-logo"
          clas
          src="@/assets/images/R.png"
          alt="website logo"
        />
        <h1>Pizzeria</h1>
      </NuxtLink>
      <ul class="header__middle-list">
        <li class="header__middle-item">
          <NuxtLink to="/track-order" class="header__middle-item-box">
            <Icon name="gg:track" class="header__icon header__middle-icon" />
            <p class="header__link">Tracker</p>
          </NuxtLink>
        </li>
        <li
          v-if="!customerStore.customer.id"
          @click="openLoginModal"
          class="header__middle-item"
        >
          <NuxtLink to="#" class="header__middle-item-box">
            <Icon
              name="codicon:account"
              class="header__icon header__middle-icon"
            />
            <p class="header__link">Login</p>
          </NuxtLink>
        </li>
        <li
          v-if="customerStore.customer.id"
          class="header__middle-item header__profile-box"
        >
          <NuxtLink to="/track-order" class="header__middle-item-box">
            <Icon
              name="codicon:account"
              class="header__icon header__middle-icon"
            />
            <p class="header__link">{{ customerStore.customer.name }}</p>
          </NuxtLink>
          <ul class="profile-dropdown-list">
            <li class="profile-dropdown-list__item">
              <NuxtLink class="profile-dropdown-list__link" to="/profile">
                <Icon
                  name="codicon:account"
                  class="profile-dropdown-list__icon"
                />
                Profile
              </NuxtLink>
            </li>
            <li class="profile-dropdown-list__item">
              <NuxtLink class="profile-dropdown-list__link" to="/orders">
                <Icon
                  name="material-symbols:order-approve"
                  class="profile-dropdown-list__icon"
                />
                All Orders
              </NuxtLink>
            </li>

            <li class="profile-dropdown-list__item">
              <button
                @click="handleSignOutClick"
                class="profile-dropdown-list__link"
              >
                <Icon
                  class="profile-dropdown-list__icon"
                  name="fluent:arrow-exit-20-filled"
                />
                Logout
              </button>
            </li>
          </ul>
        </li>
        <li
          v-if="!isNavFixed"
          class="header__middle-item header__middle-item--cart-box"
          @mouseenter="handleMouseMove"
          @mouseleave="handleMouseMove"
          @mousemove="handleMouseMove"
          @mouseover="handleMouseMove"
        >
          <NuxtLink
            to="/cart"
            class="header__middle-item-box header__cart-link"
          >
            <span v-if="itemsAmount" class="header__link--cart-item-amount">{{
              itemsAmount
            }}</span>
            <Icon
              name="grommet-icons:cart"
              class="header__icon header__middle-icon"
            />
            <p class="header__link">Cart</p>
          </NuxtLink>
          <CartDropdown :isCartOnHover="isCartOnHover" />
        </li>
      </ul>
    </div>

    <nav
      class="header__bottom"
      :class="{ active: isNavFixed, 'is-mobile': isMobileVersion }"
    >
      <ul class="header__bottom-list">
        <li
          v-for="category of categories"
          :key="category.id"
          class="header__bottom-item header__bottom-item--cart"
        >
          <NuxtLink
            class="header__link header__category-link"
            :to="`/#${category.name.toLowerCase()}`"
          >
            <img
              :src="category.photo"
              :alt="category.name"
              class="header__category-photo"
            />
            <span>
              {{ category.name }}
            </span>
          </NuxtLink>
        </li>
        <li
          v-if="isNavFixed && !isMobileVersion"
          class="header__middle-item header__middle-item--cart-box header__middle-item--bottom-cart"
          @mouseenter="handleMouseMove"
          @mouseleave="handleMouseMove"
          @mousemove="handleMouseMove"
          @mouseover="handleMouseMove"
        >
          <NuxtLink
            to="/cart"
            class="header__middle-item-box header__cart-link"
          >
            <span v-if="itemsAmount" class="header__link--cart-item-amount">{{
              itemsAmount
            }}</span>
            <Icon
              name="grommet-icons:cart"
              class="header__icon header__middle-icon"
            />
            <p class="header__link">Cart</p>
          </NuxtLink>
          <CartDropdown :isCartOnHover="isCartOnHover" />
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { categories } from "~/config/category";
import { removeTokenFromLocalStorage } from "~/utils/tokenStorage";
import { useCustomerStore } from "~/stores/useCustomerStore";
import { useCartStore } from "~/stores/useCartStore";

const cartStore = useCartStore();
const customerStore = useCustomerStore();
const isCartOnHover = ref(false);
const isNavFixed = ref(false);
const { $toast } = useNuxtApp();
const { data, signOut } = useAuth();

const { isMobileVersion } = inject("mobile-version");

const itemsAmount = computed(() =>
  cartStore.cartItems.reduce((total, el) => total + el.amount, 0)
);

const {
  isModalOpen: isLoginModalOpen,
  closeModal: closeLoginModal,
  openModal: openLoginModal,
} = useModal();
const {
  isModalOpen: isRegisterModalOpen,
  closeModal: closeRegisterModal,
  openModal: openRegisterModal,
} = useModal();

const handleSignOutClick = async () => {
  removeTokenFromLocalStorage();
  customerStore.logoutCustomer();
  await signOut({ redirect: false });
  $toast.success("You've logged out successfully!");
};

const handleMouseMove = (e) => {
  if (e.type === "mouseleave") {
    isCartOnHover.value = false;
  } else {
    if (!isCartOnHover.value) {
      isCartOnHover.value = true;
    }
  }
};

const toggleNav = () => {
  const scrollYPosition = Math.floor(window.scrollY);
  if (scrollYPosition > 150) {
    isNavFixed.value = true;
  } else {
    isNavFixed.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", toggleNav);
});
</script>
<style scoped>
.header {
}
.header__top {
  border-bottom: 1px solid #e7e7e7;
}
.header__top-list,
.header__middle,
.header__bottom:not(.active) {
  max-width: 1260px;
  width: 90%;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;
}
.header__bottom.active:not(.is-mobile) {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: 9;
  backdrop-filter: blur(50px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
.header__bottom.is-mobile {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 15px 10px;
  overflow-y: hidden;
  overflow-x: scroll;
  background: #fff;
  z-index: 9999;
  backdrop-filter: blur(50px);
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);
}
.header__bottom.is-mobile .header__bottom-list {
  gap: 25px;
  width: 150%;
}
.header__bottom.is-mobile .header__bottom-item {
  flex: 1;
  margin: 0;
  text-align: center;
}
.header__bottom.is-mobile .header__category-photo {
  margin: auto;
}
.header__bottom.is-mobile::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.header__bottom.is-mobile::-webkit-scrollbar-track {
  background: transparent;
}
.header__bottom.is-mobile::-webkit-scrollbar-thumb {
  background: #999;
}

.header__top-list {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  font-weight: 600;
  font-size: 15px;
  color: #222;
}

.header__middle {
  padding: 25px 0;
}
.header__website-logo-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: clamp(1.7rem, calc(1.5vw + 1rem), 2.2rem);
}
.header__website-logo {
  width: 100px;
}
.header__middle-list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
}

.header__middle-item-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
}
.header__middle-item--cart-box {
  position: relative;
}
.header__cart-link {
  position: relative;
}
.header__middle-icon {
  font-size: 30px;
  color: #555;
}

.header__bottom {
  padding: 15px 0;
}
.header__bottom-list {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #222;
}
.header__bottom-item:not(:last-child) {
  margin-right: clamp(2rem, calc(7vw + 2rem), 5rem);
}

.header__profile-box {
  position: relative;
}
.profile-dropdown-list {
  position: absolute;
  right: 0;
  width: 150px;
  border-radius: 5px;
  opacity: 0;
  z-index: -1;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-out;
}
.profile-dropdown-list::after {
  position: absolute;
  content: "";
  top: -6px;
  right: 10px;
  width: 16px;
  height: 16px;
  background: inherit;
  z-index: -1;
  transform: rotate(45deg);
}
.header__profile-box:hover .profile-dropdown-list {
  z-index: 1;
  opacity: 1;
}
.profile-dropdown-list__item {
  display: block;
  width: 100%;
}
.profile-dropdown-list__item:not(:last-child) {
  text-align: center;
}
.profile-dropdown-list__link:focus {
  outline: transparent;
}
.profile-dropdown-list__link {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  width: 100%;
  padding: 10px;

  font-size: 15px;
  transition: background 0.3s ease-out;
}
.profile-dropdown-list__link:hover {
  background: rgba(0, 0, 0, 0.05);
}
.profile-dropdown-list__icon {
  font-size: 19px;
}
.header__category-photo {
  width: 40px;
  height: 40px;

  object-fit: cover;
}
.header__category-link {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #555;
}
.header__cart-link {
  position: relative;
}
.header__link {
  position: relative;
  transition: color 0.3s ease-out;
}
.header__middle-item-box:hover .header__link,
.header__link:hover {
  color: #fc8019;
}
.header__link--cart-item-amount {
  position: absolute;
  top: -5px;
  right: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}

@media (min-width: 768px) {
  .header__middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0;
  }
  .header__website-logo {
    margin-bottom: 0;
  }
  .header__middle-list {
    justify-content: unset;
  }
  .header__bottom-list {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
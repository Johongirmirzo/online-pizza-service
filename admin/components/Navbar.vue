<template>
  <header class="header">
    <nav class="nav">
      <div class="header__left">
        <RouterLink v-if="!isMobileVersion" to="/" class="nav__logo">
          Pizzeria</RouterLink
        >
        <div
          @click.stop="handleToggleMenuClick"
          class="hamburger-menu"
          :class="{
            active: isSidebarToggled,
            'hamburger-menu__mobile': isMobileVersion,
          }"
        >
          <div class="hamburger-menu__line"></div>
          <div class="hamburger-menu__line"></div>
          <div class="hamburger-menu__line"></div>
        </div>
      </div>
      <audio class="audio" ref="audio" :src="audioFile"></audio>

      <ul class="nav__list">
        <li class="nav__item nav__message-item">
          <button
            @click.stop="toggleMessageDropdown"
            class="nav__btn nav__message-btn"
            :class="{ 'has-message': !messages.length }"
          >
            <span v-if="messages.length" class="nav__messages-amount">{{
              messages.length
            }}</span>
            <Icon class="nav__icon" name="wpf:message" />
          </button>
          <ul
            class="dropdown-list dropdown-list--message message-list"
            :class="{
              active: isMessageDropdownToggled,
              'has-messages': messages.length,
              'dropdown-list--message-mobile': isMobileVersion,
            }"
          >
            <li class="message-list__header-item">
              <header class="message-list__header">
                <div v-if="messages.length" class="message-list__header-row">
                  <h5 class="message-list__title">Messages</h5>
                  <button
                    @click.stop="handleClearAllMessagesClick"
                    class="message-list__clear-message-btn"
                  >
                    CLEAR ALL
                  </button>
                </div>
                <h5
                  v-else
                  class="message-list__title message-list__title--center"
                >
                  There are not any messages yet
                </h5>
              </header>
            </li>
            <li
              v-for="message in messages.slice(0, 6)"
              :key="message.id"
              class="message-list__item dropdown-list__item"
            >
              <div class="message-list__box">
                <div class="message-list__message-box">
                  <NuxtLink
                    ref="messageLink"
                    @click.stop="toggleMessageDropdown"
                    :to="`/messages/notifications/${message.id}`"
                    class="message-list__message-link message-list__message-link--message"
                  >
                    <div class="message-list__message-box-header">
                      <p
                        class="message-list__message-text message-list__message-text--strong"
                      >
                        {{ message.subject }}
                      </p>
                      <div class="message-list__close-message-box">
                        <time
                          :datetime="message.date"
                          class="message-list__message-time-text"
                          >{{
                            DateTime.fromISO(message.date).toLocaleString({
                              day: "numeric",
                              month: "short",
                            })
                          }}</time
                        >
                        <button
                          @click="handleRemoveMessageClick(message.id)"
                          class="message-list__close-message-btn"
                        >
                          <Icon name="maki:cross" />
                        </button>
                      </div>
                    </div>
                    <p class="message-list__message">
                      {{ truncateText(message.message, 40) }}
                    </p>
                  </NuxtLink>
                </div>
              </div>
            </li>
            <li class="message-list__item-footer">
              <footer class="message-list__footer">
                <NuxtLink
                  class="message-list__footer-link"
                  @click.stop="toggleMessageDropdown"
                  to="/messages/notifications"
                  >View All Messages</NuxtLink
                >
              </footer>
            </li>
          </ul>
        </li>

        <li class="nav__item nav__notification-item">
          <button
            @click.stop="toggleNotificationDropdown"
            class="nav__btn nav__notification-btn"
            :class="{ 'has-order': !orders.length }"
          >
            <span v-if="orders.length" class="nav__orders-amount">{{
              orders.length
            }}</span>
            <Icon class="nav__icon" name="clarity:notification-solid" />
          </button>
          <ul
            class="dropdown-list dropdown-list--notification notification-list"
            :class="{
              active: isNotificationDropdownToggled,
              'has-notifications': orders.length,
              'dropdown-list--notification-mobile': isMobileVersion,
            }"
          >
            <li class="notification-list__header-item">
              <header class="notification-list__header">
                <div v-if="orders.length" class="notification-list__header-row">
                  <h5 class="notification-list__title">Orders</h5>
                  <button
                    @click.stop="handleClearAllOrdersClick"
                    class="notification-list__clear-notification-btn"
                  >
                    CLEAR ALL
                  </button>
                </div>
                <h5
                  v-else
                  class="notification-list__title notification-list__title--center"
                >
                  There are not any orders yet
                </h5>
              </header>
            </li>

            <li
              v-for="order in orders.slice(0, 5)"
              :key="order.id"
              class="notification-list__item dropdown-list__item"
            >
              <div class="notification-list__box">
                <div class="notification-list__notification-box">
                  <NuxtLink
                    ref="notificationLink"
                    @click.stop="toggleNotificationDropdown"
                    :to="`/notifications/${order.id}`"
                    class="notification-list__notification-link notification-list__notification-link--notification"
                  >
                    <div class="notification-list__notification-box-header">
                      <div class="notification-list__notification-box">
                        <p class="notification-list__notification-text">
                          Total Order: {{ order.orderTotal }} uzs - Order Items
                          {{ JSON.parse(order.orderItems).length }}
                        </p>
                      </div>
                      <div class="notification-list__close-notification-box">
                        <time
                          :datetime="order.created"
                          class="notification-list__notification-time-text"
                          >{{
                            DateTime.fromISO(order.created).toLocaleString({
                              day: "numeric",
                              month: "short",
                            })
                          }}</time
                        >
                        <button
                          @click="handleRemoveOrderClick(order.id)"
                          class="notification-list__close-notification-btn"
                        >
                          <Icon name="maki:cross" />
                        </button>
                      </div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </li>

            <li class="notification-list__footer-item">
              <footer class="notification-list__footer">
                <NuxtLink
                  class="notification-list__footer-link"
                  @click.stop="toggleNotificationDropdown"
                  to="/notifications"
                  >View All Orders</NuxtLink
                >
              </footer>
            </li>
          </ul>
        </li>
        <li class="nav__item nav__profile-item">
          <div @click.stop="toggleProfile" class="nav__profile-box">
            <img
              v-if="userStore?.user?.photo"
              class="nav__profile-img"
              :src="userStore?.user?.photo"
              alt="user profile photo"
            />

            <div
              v-else-if="!isMobileVersion"
              class="nav__profile-img-placeholder"
            >
              {{ userStore?.user?.name?.slice(0, 1) }}
            </div>
            <p
              v-if="userStore.user?.name && !isMobileVersion"
              class="nav__user-name"
            >
              {{ userStore?.user?.name }}
            </p>
            <button
              v-if="!isMobileVersion"
              class="nav__profile-toggler-btn"
              :class="{ active: isProfileDropdownToggled }"
            >
              <Icon
                class="nav__profile-toggler-icon"
                name="octicon:chevron-up-12"
              />
            </button>
          </div>
          <ul
            class="dropdown-list dropdown-list--profile"
            :class="{ active: isProfileDropdownToggled }"
          >
            <li class="dropdown-list__item">
              <RouterLink
                :to="`/profile/${userStore.user.id}`"
                class="dropdown-list__link"
              >
                <Icon class="dropdown-list__icon" name="akar-icons:edit" />
                <span class="dropdown-list__item-text">Edit Profile</span>
              </RouterLink>
            </li>

            <li class="dropdown-list__item">
              <RouterLink
                to="/messages/notifications"
                class="dropdown-list__link"
              >
                <Icon class="dropdown-list__icon" name="wpf:message" />
                <span class="dropdown-list__item-text"> Messages</span>
              </RouterLink>
            </li>
            <li class="dropdown-list__item">
              <RouterLink to="/notifications" class="dropdown-list__link">
                <Icon
                  class="dropdown-list__icon"
                  name="clarity:notification-solid"
                />
                <span class="dropdown-list__item-text">Notifications</span>
              </RouterLink>
            </li>
            <li class="dropdown-list__item">
              <a href="#" class="dropdown-list__link">
                <Icon
                  class="dropdown-list__icon"
                  name="fluent:arrow-exit-20-filled"
                />
                <span
                  @click="handleSignOutClick"
                  class="dropdown-list__item-text"
                  >Logout</span
                >
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { socket } from "~/config/socketIo";
import audioFile from "@/assets/audio/simple-notification-trial-152054.mp3";
import { useMobileMenuStore } from "~/stores/mobileMenu";
import { useUserStore } from "~/stores/user";
import { DateTime } from "luxon";
import { truncateText } from "~/utils/truncateText";
import { IMessage } from "~/types/message";
import { IOrder } from "~/types/order";
import { useMessageStore } from "~/stores/useMessageStore";
import { useOrderStore } from "~/stores/useOrderStore";
import { removeTokenFromLocalStorage } from "~/utils/tokenStorage";
const { data, signOut } = useAuth();

const messages = ref<IMessage[]>([]);
const orders = ref<IOrder[]>([]);
const isProfileDropdownToggled = ref(false);
const isNotificationDropdownToggled = ref(false);
const isMessageDropdownToggled = ref(false);
const messageLink = ref<HTMLElement | undefined>(undefined);
const audio = ref<HTMLElement | undefined>(undefined);

const messageStore = useMessageStore();
const orderStore = useOrderStore();

const userStore = useUserStore();
const { isSidebarToggled, toggleSidebar } = inject("sidebar-toggle");
const { isMobileVersion } = inject("mobile-version");

const mobileMenuStore = useMobileMenuStore();

watchEffect(() => {
  messages.value = messageStore.messages;
  orders.value = orderStore.orders;
});

const handleToggleMenuClick = () => {
  toggleSidebar();
  if (isMobileVersion.value) {
    mobileMenuStore.toggleMenu();
  }
};

const toggleProfile = () => {
  if (!isProfileDropdownToggled.value && isMessageDropdownToggled.value) {
    isMessageDropdownToggled.value = false;
  }
  if (!isProfileDropdownToggled.value && isNotificationDropdownToggled.value) {
    isNotificationDropdownToggled.value = false;
  }
  isProfileDropdownToggled.value = !isProfileDropdownToggled.value;
};
const toggleMessageDropdown = () => {
  if (!isMessageDropdownToggled.value && isProfileDropdownToggled.value) {
    isProfileDropdownToggled.value = false;
  }
  if (!isMessageDropdownToggled.value && isNotificationDropdownToggled.value) {
    isNotificationDropdownToggled.value = false;
  }
  isMessageDropdownToggled.value = !isMessageDropdownToggled.value;
};
const toggleNotificationDropdown = () => {
  if (!isNotificationDropdownToggled.value && isProfileDropdownToggled.value) {
    isProfileDropdownToggled.value = false;
  }
  if (!isNotificationDropdownToggled.value && isMessageDropdownToggled.value) {
    isMessageDropdownToggled.value = false;
  }
  isNotificationDropdownToggled.value = !isNotificationDropdownToggled.value;
};

const closeDropdown = () => {
  if (isProfileDropdownToggled.value) {
    isProfileDropdownToggled.value = false;
  }
  if (isMessageDropdownToggled.value) {
    isMessageDropdownToggled.value = false;
  }
  if (isNotificationDropdownToggled.value) {
    isNotificationDropdownToggled.value = false;
  }
};

const handleClearAllMessagesClick = () => {
  messages.value = [];
  messageStore.clearAllMessages();
  toggleMessageDropdown();
};
const handleClearAllOrdersClick = () => {
  orders.value = [];
  orderStore.clearAllOrders();
  toggleNotificationDropdown();
};

const handleSignOutClick = async () => {
  removeTokenFromLocalStorage();
  userStore.logoutUser();
  await signOut({ redirect: false });
  location.href = "https://online-pizza-delivery-admin.netlify.app/login";
};

const handleRemoveMessageClick = (messageId: number) => {
  messages.value = messages.value.filter(
    (message: IMessage) => message.id !== messageId
  );
  messageStore.deleteMessage(messageId);
};

const handleRemoveOrderClick = (orderId: number) => {
  orders.value = orders.value.filter((order: IOrder) => order.id !== orderId);
  orderStore.deleteOrder(orderId);
};

if (process.client) {
  window.addEventListener("click", closeDropdown);
}
const playAudio = (textToSpeech: string) => {
  audio.value.play();
  setTimeout(() => {
    speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(textToSpeech);
    speechSynthesis.speak(utterance);
  }, 1500);
};

socket.on("new-message", (message: IMessage) => {
  if (audio.value) {
    playAudio("New message has arrived!");
  }
  messageStore.storeMessage(message);
  messages.value = messageStore.messages;
});

socket.on("new-order", (order: IOrder) => {
  if (audio.value) {
    playAudio("New order has arrived!");
  }
  orderStore.storeOrder(order);
  orders.value = orderStore.orders;
});
</script>
<style scoped>
.header {
  position: sticky;
  top: 0;
  background: #fc8019;
  color: #fff;
  padding: 10px 15px;
  z-index: 9;
}
.header__left {
  display: flex;
  align-items: center;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__logo {
  font-size: clamp(1.1rem, calc(1.5vw + 1rem), 1.6rem);
  font-weight: 600;
}
.nav__message-item {
  position: relative;
}
.hamburger-menu {
  margin-left: 50px;
  width: 30px;
  cursor: pointer;
  transition: transform 0.3s ease-out;
}
.hamburger-menu__mobile {
  margin-left: 0;
}
.hamburger-menu__line {
  background: #fff;
  border-radius: 50px;
  height: 3px;
  width: auto;
  transition: all 0.3s ease-out;
}
.hamburger-menu__line:last-child {
  width: 50%;
}
.hamburger-menu__line:not(:last-child) {
  margin-bottom: 5px;
}
.hamburger-menu:hover .hamburger-menu__line:last-child {
  width: 100%;
}
.hamburger-menu.active {
  transform: translateX(-30px);
}
.hamburger-menu.active .hamburger-menu__line:nth-child(1) {
  width: 18px;
  transform: translate(14px, 3px) rotate(35deg);
}
.hamburger-menu.active .hamburger-menu__line:nth-child(2) {
  width: 100%;
}
.hamburger-menu.active .hamburger-menu__line:nth-child(3) {
  width: 18px;
  transform: translate(14px, -3px) rotate(-35deg);
}
.nav__list {
  display: flex;
  align-items: center;
  gap: 25px;
}
.nav__btn {
  color: #fff;
  font-size: 22px;
}
.nav__notification-btn,
.nav__message-btn {
  position: relative;
}
.nav__notification-btn.has-order .nav__orders-amount,
.nav__message-btn.has-message .nav__messages-amount {
  content: "";
  position: absolute;
  top: -12px;
  right: -16px;
  width: 25px;
  height: 25px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  background: #19a1fc;
  color: #fff;
}

.nav__notification-item,
.nav__profile-item {
  position: relative;
}
.nav__profile-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  background: hsla(0, 100%, 50%, 0.1);
  cursor: pointer;
}
.nav__profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.nav__profile-img-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 20px;
  background: rgba(237, 20, 20, 0.15);
}
.nav__profile-toggler-btn {
  color: #fff;
  transform: rotate(90deg);
  font-size: 20px;
  transition: transform 0.3s ease-out;
}
.nav__profile-toggler-btn.active {
  transform: rotate(180deg);
}
.dropdown-list {
  position: absolute;
  right: 0;
  top: 120px;
  padding: 15px 0;
  opacity: 0;
  visibility: hidden;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  z-index: -1;
}
.dropdown-list::after {
  content: "";
  position: absolute;
  top: -6px;
  right: 10px;
  width: 15px;
  height: 15px;
  transform: rotate(45deg);
  background: #fff;
}
.dropdown-list.active {
  opacity: 1;
  z-index: 1;
  visibility: visible;
}

.dropdown-list--notification.active,
.dropdown-list--message.active {
  top: 80px;
}

.dropdown-list--notification-mobile,
.dropdown-list--message-mobile {
  right: 0;
}

.dropdown-list--notification-mobile,
.dropdown-list--message-mobile::after {
  right: 0;
}

.dropdown-list--message-mobile {
  right: -50px;
}

.dropdown-list--profile.active {
  top: 100px;
}

.dropdown-list__item {
  color: #111;
}
.dropdown-list__link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 25px;
  transition: all 0.3s ease-out;
}
.dropdown-list__link:hover {
  background: rgba(0, 0, 0, 0.05);
}

.dropdown-list__icon {
  color: #fc8019;
  font-size: 20px;
}
.dropdown-list__item-text {
  color: #333;
  font-size: 15px;
}

.notification-list,
.message-list {
  padding: 0;
  width: 250px;
}

.notification-list.has-notifications,
.message-list.has-messages {
  overflow-y: scroll;
  max-height: 300px;
}

.message-list.has-messages::-webkit-scrollbar,
.notification-list.has-notifications::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}

.message-list.has-messages::-webkit-scrollbar-track,
.notification-list.has-notifications::-webkit-scrollbar-track {
  background: transparent;
}

.message-list.has-messages::-webkit-scrollbar-thumb,
.notification-list.has-notifications::-webkit-scrollbar-thumb {
  background: #999;
}

.notification-list__header-item,
.message-list__header-item {
  position: sticky;
  top: 0;
  padding: 8px 10px;
}

.notification-list__footer-item,
.message-list__footer-item {
  position: sticky;
  bottom: -2px;
}
.notification-list__header-item,
.notification-list__footer-item,
.message-list__header-item,
.message-list__footer-item {
  z-index: 1;
  background: #fff;
}

.notification-list__header-row,
.message-list__header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-list__title,
.message-list__title {
  font-size: 17px;
  color: #222;
}

.notification-list__title--center,
.message-list__title--center {
  text-align: center;
  margin: auto;
}

.notification-list__clear-message-btn,
.message-list__clear-message-btn {
  color: red;
  font-weight: 600;
  font-size: 12px;
}

.notification-list__item,
.message-list__item {
  padding: 10px 15px;
  border-top: 1px solid #e7e7e7;
  transition: all 0.3s ease-out;
}

.notification-list__item:hover,
.message-list__item:hover {
  background: rgba(0, 0, 0, 0.05);
}
.notification-list__notification-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.notification-list__notification-box {
  display: flex;
  align-items: center;
  gap: 5px;
}
.notification-list__notification-photo {
  width: 40px;
}
.notification-list__notification-text {
  font-weight: 600;
  color: #333;
  font-size: 13px;
}
.notification-list__close-notification-box,
.message-list__close-message-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.notification-list__close-notification-btn,
.message-list__close-message-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  transition: background 0.3s ease-out;
}

.notification-list__close-message-btn:hover,
.message-list__close-message-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.notification-list__notification-link--notification,
.message-list__message-link--message {
  display: block;
  width: 100%;
}
.notification-list__notification-link {
  display: block;
}
.notification-list__message-link:focus,
.message-list__message-link:focus {
  outline: 0;
}

.notification-list__message-box-header,
.message-list__message-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-list__message-text-strong,
.message-list__message-text--strong {
  font-size: 15px;
  font-weight: 600;
}

.notification-list__messate-time-text,
.message-list__message-time-text {
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.notification-list__notification,
.message-list__message {
  margin-top: 5px;
  font-weight: 500;
  color: #444;
  font-size: 14px;
}

.notification-list__footer,
.message-list__footer {
  text-align: center;
  border-top: 1px solid #e7e7e7;
  color: #222;
  font-weight: 600;
  font-size: 13px;
}

.notification-list__footer > *:focus,
.message-list__footer > *:focus {
  outline: 0;
}

.notification-list__footer-link,
.message-list__footer-link {
  display: block;
  padding: 10px 0;
  width: 100%;
}
.notification-list__footer-link:hover,
.message-list__footer-link:hover {
  background: rgba(0, 0, 0, 0.05);
}
.audio {
  position: absolute;
}

@media (min-width: 568px) {
  .header {
    padding: 10px 15px;
  }
}
@media (min-width: 992px) {
  .notification-list,
  .message-list {
    width: 350px;
  }
  .dropdown-list--notification-mobile,
  .dropdown-list--message-mobile {
    left: -110px;
  }
  .dropdown-list--notification-mobile::after,
  .dropdown-list--message-mobile::after {
    left: 153px;
  }
}
</style>
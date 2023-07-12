<template>
  <div>
    <Head>
      <Title>Pizzeria | Online Pizza Restaurant </Title>
      <Meta
        name="description"
        content="Online Pizza App where you find the best and the most affordable pizzas in Uzbekistan"
      />
      <Link rel="icon" type="image/png" :href="FaviconImage" />
    </Head>
    <NuxtLayout :name="layout">
      <NuxtPage />
      <CallPizzeria />
    </NuxtLayout>
    <audio ref="audio" :src="audioFile"></audio>
  </div>
</template>
<script setup lang="ts">
import { socket } from "~/config/socketIo";
import FaviconImage from "~/assets/images/R.png";
import audioFile from "@/assets/audio/simple-notification-trial-152054.mp3";
import { IOrder, OrderStatus } from "~/types/order";
import { useCustomerStore } from "~/stores/useCustomerStore";
import { getAllCustomerOrders } from "~/api/all-api-handlers";

const layout = ref("default");
const audio = ref<HTMLElement>();
const route = useRoute();
const customerStore = useCustomerStore();

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

const playAudio = () => {
  if (audio.value) {
    audio.value.play();
  }
};
const isOrderExist = async (orderId: number) => {
  const allCustomerOrders = await getAllCustomerOrders(
    customerStore.customer.id
  );
  return allCustomerOrders.data.data.some(
    (order: IOrder) => order.id === orderId
  );
};

socket.on(
  "new-order-status",
  async (orderData: { orderId: number; status: OrderStatus }) => {
    if (await isOrderExist(orderData.orderId)) {
      playAudio();
      setTimeout(() => {
        speechSynthesis;
        let utterance = new SpeechSynthesisUtterance(
          `The status of your order with id ${
            orderData.orderId
          } has changed to ${getOrderStatus(orderData.status)}`
        );
        speechSynthesis.speak(utterance);
      }, 2000);
    }
  }
);
</script>

<template>
  <section class="dashboard">
    <div class="dashboard__row">
      <div class="dashboard__col">latest orders</div>
      <div class="dashboard__col">latest applicants</div>
    </div>
    <div class="dashboard__row">
      <div class="dashboard__col">latest reviews</div>
      <div class="dashboard__col">latest messages</div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { getAllApplicants } from "~/api/applicant";
import { getAllOrders } from "~/api/order";
import { getAllReviews } from "~/api/review";
import { getAllMessages } from "~/api/message";

const latestApplicants = ref([]);
const latestOrders = ref([]);
const latestReviews = ref([]);
const latestMessages = ref([]);

watchEffect(async () => {
  const applicantsResp = await getAllApplicants();
  console.log(applicantsResp.data.data);
});
</script>
<style scoped>
</style>
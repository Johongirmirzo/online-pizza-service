<template>
  <section class="orders">
    <PizzaLoader v-if="isLoadingOrder" />
    <DeliveryAddressModal
      v-if="customerDeliveryAddress.id"
      :isAddressModalOpen="isModalOpen"
      :customerDeliveryAddress="customerDeliveryAddress"
      :toggleModal="toggleModal"
    />
    <div class="orders__table-box">
      <HeaderAction
        :routeTo="null"
        :dataList="orders"
        :csv="csv"
        :dataType="'order'"
        :downloadCSVFilename="downloadCSVFilename"
        :fetchAllData="fetchAllOrders"
        :handleDownloadCSVClick="handleDownloadCSVClick"
        :handleDownloadExcelClick="handleDownloadExcelClick"
        :handleDownloadPdfClick="handleDownloadPdfClick"
        @update-search-data="handleUpdateSearchData"
      />
      <div v-if="!orders.length" class="orders__table-placeholder-box">
        <h2 class="orders__table-placeholder-title">
          No orders have been created yet!
        </h2>
      </div>

      <table class="orders-table" v-else ref="orderPdfTable">
        <thead>
          <tr>
            <th scope="coll" class="orders-table__head">Id</th>
            <th scope="coll" class="orders-table__head">Type</th>
            <th scope="coll" class="orders-table__head">Payment</th>
            <th scope="coll" class="orders-table__head">Payment Status</th>
            <th scope="coll" class="orders-table__head">Item Amount</th>
            <th scope="coll" class="orders-table__head">Total</th>
            <th scope="coll" class="orders-table__head">Order Status</th>
            <th scope="coll" class="orders-table__head">Created</th>
            <th scope="coll" class="orders-table__head">Actions</th>
          </tr>
        </thead>
        <tbody>
          <OrderTableRow
            v-for="(orderItem, idx) of getFilteredOrders(searchData)"
            :key="orderItem.id"
            :orderItem="orderItem"
            :idx="idx"
            :getOrderStatus="getOrderStatus"
            :isFirstRow="idx === 0"
            :isLastRow="idx === orders.length - 1"
            :toggleOrderStatus="toggleOrderStatus"
            :togglePaymentStatus="togglePaymentStatus"
            :isStatusDropdownOpen="isStatusDropdownOpen"
            :activeRowId="activeRowId"
            :getActiveRowId="getActiveRowId"
            :toggleStatusDropdown="toggleStatusDropdown"
            :isPaymentStatusDropdownOpen="isPaymentStatusDropdownOpen"
            :paymentActiveRowId="paymentActiveRowId"
            :getPaymentActiveRowId="getPaymentActiveRowId"
            :togglePaymentStatusDropdown="togglePaymentStatusDropdown"
            :getCurrentOrderMakerId="getCurrentOrderMakerId"
            :isLoading="isLoading"
          />
        </tbody>
      </table>
    </div>
  </section>
</template>
  <script setup lang="ts">
import { socket } from "~/config/socketIo";
import { useLoading } from "~/composables/useLoading";
import { getAllOrders } from "~/api/order";
import { getAllCustomerAddresses, getCustomer } from "~/api/customer";
import { IOrder, OrderStatus, PaymentStatus } from "~/types/order";
const props = defineProps(["csvFileName", "filterBy"]);

const orders = ref<IUser[]>([]);
const searchData = ref("");
const isLoading = ref(false);
const { $toast } = useNuxtApp();
const orderPdfTable = ref<HTMLElement | undefined>(undefined);
const downloadCSVFilename = props.csvFileName;
const customerDeliveryAddress = ref({});

const handleUpdateSearchData = (val: string) => {
  searchData.value = val;
};

const getCurrentOrderMakerId = async (customerId: number) => {
  try {
    isLoading.value = true;
    const customerResp = await getCustomer(customerId.toString());
    const allCustomerAddressesResp = await getAllCustomerAddresses(customerId);
    const currentCustomerAddress = allCustomerAddressesResp.data.data.filter(
      (address) => address.isDefault
    );
    console.log(allCustomerAddressesResp.data.data);
    console.log(customerResp.data.data);

    customerDeliveryAddress.value = {
      ...currentCustomerAddress[0],
      ...customerResp.data.data,
    };
    isLoading.value = false;
    toggleModal();
  } catch (err) {
    isLoading.value = false;
    console.log("Error ", err);
  }
};

const { csv, generateCSV, generatePDF, generateExcel } = useHeaderAction();
const { isModalOpen, toggleModal } = useModal();
const {
  isStatusDropdownOpen,
  activeRowId,
  getActiveRowId,
  toggleStatusDropdown,
} = useStatusDropdown();
const {
  isStatusDropdownOpen: isPaymentStatusDropdownOpen,
  activeRowId: paymentActiveRowId,
  getActiveRowId: getPaymentActiveRowId,
  toggleStatusDropdown: togglePaymentStatusDropdown,
} = useStatusDropdown();
const { isLoading: isLoadingOrder, startLoading, stopLoading } = useLoading();

const handleDownloadCSVClick = () => {
  generateCSV<IOrder>(orders.value);
};

const handleDownloadExcelClick = () => {
  generateExcel(orderPdfTable.value, "order", "order");
};
const handleDownloadPdfClick = () => {
  generatePDF("order-table", orderPdfTable.value);
};

const fetchAllOrders = async () => {
  startLoading();
  orders.value = [];
  startLoading();
  const orderResp = await getAllOrders();
  if (props.filterBy) {
    orders.value = [
      ...orderResp.data.data.filter(
        (order: IOrder) => order.orderStatus === props.filterBy
      ),
    ];
  } else {
    orders.value = [...orderResp.data.data];
  }

  stopLoading();
};
fetchAllOrders();

const getFilteredOrders = (searchData: string) => {
  return orders.value.filter((order: any) => {
    return !searchData.length
      ? true
      : order.id.toString().includes(searchData.toLowerCase());
  });
};

const getOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case "ORDER_NOT_CONFIRMED":
      return "Not Confirmed";
    case "ORDER_CANCELLED":
      return "Cancelled";
    case "ORDER_CONFIRMED":
      return "Confirmed";
    case "ORDER_BEING_PREPARED":
      return "Being Prepared";
    case "ORDER_BOXED":
      return "Boxed";
    case "ORDER_DELIVERED":
      return "Delivered";
    case "ORDER_PICKED_UP":
      return "Picked Up";
  }
};

const toggleOrderStatus = async (orderId: number, status: OrderStatus) => {
  try {
    socket.emit("change-order-status", { orderId, status });
    orders.value = orders.value.map((order: IOrder) =>
      order.id === orderId ? { ...order, orderStatus: status } : order
    );
    fetchAllOrders();
    $toast.success(`Order status is changed to ${status} successfully!`);
  } catch (err) {
    console.log("Error", err);
  }
};

const togglePaymentStatus = async (orderId: number, status: PaymentStatus) => {
  try {
    socket.emit("change-payment-status", { orderId, status });
    orders.value = orders.value.map((order: IOrder) =>
      order.id === orderId ? { ...order, paymentStatus: status } : order
    );

    $toast.success(
      `Order  payment status is changed to ${status} successfully!`
    );
  } catch (err) {
    console.log("Error", err);
  }
};
</script>
  <style scoped>
.orders__header {
  text-align: center;
  margin-bottom: 35px;
}
.orders__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.orders__table-box {
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.orders__table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.orders__search-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.orders__search-input {
  border: 0;
  outline: 0;
}
.orders__table-placeholder-box {
  padding: 25px 0;
  text-align: center;
}
.orders__table-placeholder-title {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
}

.orders__table-icon {
  font-size: 22px;
}
.orders__table-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.orders__table-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}
.orders-table {
  width: 320%;
  table-layout: fixed;
  font-size: 15px;
}
.orders-table__head,
.orders-table__cell {
  padding: 25px;
  text-align: left;
}
.orders-table__cell {
  padding: 15px 25px;
  vertical-align: middle;
  border-top: 1px solid #e0e0e0;
  color: #444;
}
.orders-table__photo-cell {
  display: flex;
  gap: 5px;
}
.orders-table__photo {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}
.orders-table__text {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.orders-table__btns-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.orders-table__view-icon {
  color: rgb(59, 59, 237);
}

@media (min-width: 992px) {
  .orders-table {
    width: 200%;
  }
}
@media (min-width: 1350px) {
  .orders__table-box {
    overflow-x: hidden;
  }
  .orders-table {
    width: 100%;
    table-layout: normal;
  }
}
</style>
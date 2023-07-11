<template>
  <div v-if="isAddressModalFormOpen" class="modal-wrapper">
    <section
      class="address-modal"
      :class="{
        active: isAddressModalFormOpen,
        closed: isAddressModalFormClosed,
      }"
    >
      <button
        @click.stop="handleCloseModalClick"
        class="address-modal__close-btn"
      >
        <Icon name="maki:cross" />
      </button>
      <header class="address-modal__header">
        <button @click="handleMoveBackClick" class="address-modal__go-back-btn">
          <Icon name="ant-design:left-outlined" />
        </button>
        <h2 v-if="editAddressId > -1" class="address-modal__title">
          Edit an Address
        </h2>
        <h2 v-else class="address-modal__title">Add a New Address</h2>
      </header>
      <CustomerAddressForm
        :validationSchema="
          editAddressId === -1
            ? createCustomerAddressFormData
            : editCustomerAddressFormData
        "
        :isCreatingAddress="editAddressId === -1"
        :handleSubmitForm="
          editAddressId === -1
            ? handleAddNewAddressSubmit
            : handleEditAddressSubmit
        "
        :handleDeleteAddressClick="handleDeleteAddressClick"
        :initialValues="initialValues"
        :isLoading="isLoading"
        :editAddressId="editAddressId"
      />
    </section>
  </div>
</template>
<script setup lang="ts">
import {
  createCustomerAddressFormData,
  editCustomerAddressFormData,
} from "~/validations";
import { useCustomerStore } from "~/stores/useCustomerStore";
import { useCustomerAddress } from "~/stores/useCustomerAddress";
import {
  createaCustomerAddress,
  editCustomerAddress,
  deleteCustomerAddress,
} from "~/api/all-api-handlers";
import {
  ICustomerAddress,
  ICustomerAddressFormData,
} from "~/types/customer-address";

const props = defineProps([
  "isAddressModalFormOpen",
  "closeAddressModalForm",
  "openAddressModal",
  "editAddressId",
  "resetEditAddressId",
]);

const isAddressModalFormClosed = ref(false);
const customerAddressStore = useCustomerAddress();
const customerStore = useCustomerStore();
const { $toast } = useNuxtApp();
const { isLoading, startLoading, stopLoading } = useLoading();

const initialValues = ref({
  streetName: "",
  approach: "",
  doorCode: "",
  floor: "",
  apartmentNumber: "",
  comment: "",
});

watchEffect(() => {
  console.log(props.editAddressId, 999);
  if (props.editAddressId > -1) {
    const address = customerAddressStore.customerAddresses.find(
      (customerAddress: ICustomerAddress) =>
        customerAddress.id === props.editAddressId
    )!;
    initialValues.value = {
      ...address,
    };
  }
});

const handleCloseModalClick = () => {
  isAddressModalFormClosed.value = true;
  setTimeout(() => {
    props.closeAddressModalForm();
  }, 400);
};

const handleMoveBackClick = () => {
  handleCloseModalClick();
  props.resetEditAddressId();
  props.closeAddressModalForm();
  props.openAddressModal();
};

const handleAddNewAddressSubmit = async (address: ICustomerAddressFormData) => {
  console.log(address);
  if (customerAddressStore.customerAddresses.length === 5) {
    return $toast.error(
      "You've reached the limit! Maximum allowed addresses to add are 5"
    );
  }
  try {
    startLoading();
    const resp = await createaCustomerAddress(
      customerStore.customer.id,
      address
    );
    customerAddressStore.addCustomerAddress(resp.data.data);
    handleMoveBackClick();
    stopLoading();
  } catch (err: any) {
    if (err?.response?.data?.errors) {
      $toast.error(err.response?.data?.errors);
    }
    stopLoading();
  }
};

const resetInitialValues = () => {
  initialValues.value = {
    streetName: "",
    approach: "",
    doorCode: "",
    floor: "",
    apartmentNumber: "",
    comment: "",
  };
};

const handleEditAddressSubmit = async (address: ICustomerAddressFormData) => {
  try {
    startLoading();
    await editCustomerAddress(
      props.editAddressId,
      customerStore.customer.id,
      address
    );
    customerAddressStore.updateCustomerAddress(props.editAddressId, address);
    props.resetEditAddressId();
    handleMoveBackClick();
    resetInitialValues();
    stopLoading();
  } catch (err: any) {
    if (err?.response?.data?.errors) {
      $toast.error(err.response?.data?.errors);
    }
    resetInitialValues();
    props.resetEditAddressId();
    stopLoading();
  }
};

const handleDeleteAddressClick = async (addressId: number) => {
  try {
    startLoading();
    await deleteCustomerAddress(addressId);
    customerAddressStore.deleteCustomerAddress(addressId);
    props.resetEditAddressId();
    resetInitialValues();
    handleMoveBackClick();
    stopLoading();
  } catch (err: any) {
    if (err?.response?.data?.errors) {
      $toast.error(err.response?.data?.errors);
    }
    stopLoading();
  }
};

watchEffect(() => {
  if (props.isAddressModalFormOpen) {
    isAddressModalFormClosed.value = false;
  }
});
</script>
<style scoped>
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.address-modal {
  position: relative;
  max-width: 560px;
  width: 95%;
  max-height: 650px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 50px 25px;
  border-radius: 20px;
  background: #fff;
}
.address-modal::-webkit-scrollbar {
  height: 10px;
  width: 5px;
}
.address-modal::-webkit-scrollbar-track {
  background: transparent;
}
.address-modal::-webkit-scrollbar-thumb {
  background: #999;
}
.address-modal.active {
  animation: open 0.5s;
}
.address-modal.closed {
  animation: closed 0.5s;
}
@keyframes open {
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
}
@keyframes closed {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.1);
  }
}
.address-modal__header {
  position: relative;
  margin-bottom: 20px;
}
.address-modal__go-back-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: clamp(1.3rem, calc(1vw + 1rem), 1.5rem);
}
.address-modal__title {
  padding-left: 50px;
  font-size: clamp(1.7rem, calc(1.2vw + 1rem), 1.6rem);
}

.address-modal__close-btn {
  position: absolute;
  top: 0;
  right: -45px;
  font-size: 30px;
  color: #fff;
  transition: transform 0.3s ease-out;
}
.address-modal__close-btn:hover {
  transform: scale(1.1);
}
</style>
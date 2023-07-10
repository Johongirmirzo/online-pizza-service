<template>
  <div class="checkbox__box">
    <input
      class="checkbox__input"
      type="checkbox"
      :id="id"
      ref="input"
      :class="{ active: isCheckboxChecked }"
      @change="handleChangeClick(value)"
    />
  </div>
</template>
  <script setup lang="ts">
import { toRefs } from "vue";
import { useField } from "vee-validate";

const props = defineProps([
  "modelValue",
  "checked",
  "isCheckingFromPizzaModal",
  "isCheckingFromToppingModal",
  "id",
  "toppingType",
  "value",
]);

const isCheckboxChecked = ref(false);

watchEffect(() => {
  if (
    props.checked &&
    (props.isCheckingFromToppingModal || props.isCheckingFromPizzaModal)
  ) {
    isCheckboxChecked.value = true;
  } else {
    isCheckboxChecked.value = false;
  }
});

const handleChangeClick = (value: any) => {
  if (props.isCheckingFromToppingModal) {
    handleChange(value);
    isCheckboxChecked.value = !isCheckboxChecked.value;
  }
};

const { name } = toRefs(props);
const { checked, handleChange } = useField(name, undefined, {
  type: "checkbox",
  checkedValue: props.value,
});
</script>
  <style scoped>
.checkbox__input:after {
  width: 24px;
  height: 24px;
  border-radius: 5px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #fc8019;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 3px solid #fc8019;
  font-size: 15px;
  z-index: 1;
  cursor: pointer;
}

.checkbox__input.active:after {
  content: "✔";
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}
.checkbox__box {
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}
.checkbox__topping-type {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}
.checkbox__topping-price {
  font-size: 12px;
}
</style>
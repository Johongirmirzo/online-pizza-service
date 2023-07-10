<template>
  <div>
    <input
      class="pizza-form__checkbox"
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

const props = defineProps({
  modelValue: {
    type: null,
  },
  isCreatingPizza: Boolean,
  checked: Boolean,
  id: String,
  name: String,

  value: {
    type: String,
  },
});

const isCheckboxChecked = ref(false);
const input = ref<HTMLElement>();

watchEffect(() => {
  if (props.checked && !props.isCreatingPizza) {
    isCheckboxChecked.value = true;
  }
});

const handleChangeClick = (value: any) => {
  handleChange(value);
  isCheckboxChecked.value = !isCheckboxChecked.value;
};

const { name } = toRefs(props);
const { checked, handleChange } = useField(name, undefined, {
  type: "checkbox",
  checkedValue: props.value,
});
</script>
<style scoped>
.pizza-form__checkbox:after {
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
}

.pizza-form__checkbox.active:after {
  content: "✔";
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}
</style>
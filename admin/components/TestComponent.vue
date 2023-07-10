<template>
  <div>
    <button type="button" @click="handleChange(value)">
      {{ checked ? value : "Not Checked yet" }}
      {{ checked ? "checked" : "unchecked" }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: null,
  },
  name: String,
  value: {
    type: String,
  },
});

// we are using toRefs to create reactive references to `name` and `value` props
// this is important because vee-validte needs to know if any of these props change
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const { name } = toRefs(props);
const { checked, handleChange } = useField(name, undefined, {
  type: "checkbox",
  checkedValue: props.value,
});
</script>
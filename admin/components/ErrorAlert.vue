<template>
    <ul class="alert">
        <li v-for="(error, idx) in errors" :key="idx" class="alert__list">
            <p class="alert__text">
                {{ error }}
               
            </p>
            <button @click="removeAlertItem(idx)" class="alert__btn">
                <Icon name="icomoon-free:cross"/>
            </button>
        </li>
    </ul>
</template>
<script setup>
    const props = defineProps(["errors"]);

    const errors = ref([...props.errors])
    const removeAlertItem = idx =>{
        errors.value = errors.value.filter((_, i)=> i !== idx);
    };
</script>
<style scoped>
.alert {
    margin-bottom: 20px;
}
.alert__list {
    position: relative;
    padding: 10px;
    border: 2px solid rgb(239, 36, 36);
    border-radius: 5px;
    background: rgba(246, 88, 88, .5);
    color: #fff;
    font-size: 1.1rem;
}
.alert__btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    color: #fff;
}
</style>
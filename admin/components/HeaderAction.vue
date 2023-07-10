<template>
  <header class="header-action">
    <div class="header-action__left">
      <div class="header-action__search-box">
        <Icon
          class="header-action__icon header-action__search-icon"
          name="ant-design:search-outlined"
        />

        <input
          type="text"
          @input="($event) => $emit('updateSearchData', $event?.target?.value)"
          :placeholder="
            dataType === 'order' ? 'Search by order id' : 'Search by name'
          "
          class="header-action__search-input"
        />
      </div>
    </div>
    <div class="header-action__right">
      <NuxtLink
        v-if="routeTo"
        :title="`Add a ${dataType}`"
        :to="routeTo"
        class="header-action__btn"
      >
        <Icon
          name="material-symbols:add"
          class="header-action__icon header-action__add-data-icon"
        />
      </NuxtLink>
      <button
        :title="`Refetch ${dataType}`"
        @click="fetchAllData"
        class="header-action__btn"
      >
        <Icon
          name="ooui:reload"
          class="header-action__icon header-action__refetch-data-icon"
        />
      </button>
      <button
        v-if="dataList.length"
        title="Download PDF"
        @click="handleDownloadPdfClick"
        class="header-action__btn"
      >
        <Icon name="uiw:file-pdf" class="header-action__icon" />
      </button>
      <button
        v-if="dataList.length"
        title="Download Excel"
        @click="handleDownloadExcelClick"
        class="header-action__btn"
      >
        <Icon name="file-icons:microsoft-excel" class="header-action__icon" />
      </button>
      <a
        :href="`data:text/csv;charset=utf-8, ${csv}`"
        :download="downloadCSVFilename"
        v-if="dataList.length"
        title="Download CSV"
        @click="handleDownloadCSVClick"
        class="header-action__btn"
      >
        <Icon name="eos-icons:csv-file" class="header-action__icon" />
      </a>
    </div>
  </header>
</template>
<script setup lang="ts">
defineProps([
  "routeTo",
  "fetchAllData",
  "csv",
  "dataList",
  "dataType",
  "downloadCSVFilename",
  "update-search-data",
  "handleDownloadCSVClick",
  "handleDownloadExcelClick",
  "handleDownloadPdfClick",
]);
</script>
<style scoped>
.header-action {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background: #f2f2f2;
}
.header-action__search-box {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
}
.header-action__search-input {
  border: 0;
  outline: 0;
}
.header-action__icon {
  font-size: 22px;
}
.header-action__right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.header-action__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fc8019;
  color: #fff;
}

@media (min-width: 550px) {
  .header-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-action__search-box {
    margin-bottom: 0;
  }
}
</style>
<template>
  <a href="tel:1995" class="call-box">
    <span class="call-box__icon-box">
      <Icon name="mingcute:phone-fill" class="call-box__icon" />
    </span>
    <p class="call-box__text">*1995</p>
  </a>
</template>
<style scoped>
.call-box {
  position: fixed;
  bottom: 15px;
  left: 50px;
  padding: 10px 15px;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border: 3px solid #fc8019;
  background: #fff;
}
.call-box__icon-box {
  position: absolute;
  left: -35px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid rgb(52, 52, 229);
  color: #fc8019;
  z-index: 9999;
  background: #fff;
}
.call-box__icon {
  font-size: 25px;
}
.call-box__text {
  font-size: 35px;
  font-weight: bold;
  color: rgb(52, 52, 229);
}
</style>
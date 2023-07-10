<template>
  <section class="feedback">
    <header class="feedback__header">
      <h1 class="feedback__title">
        WE LOVE YOUR FEEDBACK!
        <span class="feedback__title--sub">
          WHAT CAN WE DO TO IMPROVE YOUR PIZZERIA EXPERIENCE?
        </span>
      </h1>
    </header>
    <p class="feedback__description">
      We work every day to make creating & delivering pizzas an easy & pleasant
      experience, that's why we need your help to keep getting better.
    </p>
    <p class="feedback__description">
      Any advice you could give us would be greatly appreciated.
    </p>

    <p class="feedback__description">We look forward to hearing from you.</p>

    <p class="feedback__description">Thanks!</p>
    <div class="feedback__btns-box">
      <NuxtLink to="/feedback/dine-in" class="feedback__btn">DINE IN</NuxtLink
      ><NuxtLink to="/feedback/delivery" class="feedback__btn"
        >DELIVERY</NuxtLink
      >
    </div>
  </section>
</template>
<style scoped>
.feedback {
  max-width: 960px;
  width: 95%;
  margin: 80px auto;
  padding: 25px;
  border-radius: 10px;
  background: #f2f2f2;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.feedback__header {
  margin-bottom: 15px;
}
.feedback__title {
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
  color: #333;
}
.feedback__title--sub {
  font-size: clamp(1.2rem, calc(1.5vw + 1rem), 1.5rem);
  color: #777;
}
.feedback__description {
  margin-bottom: 15px;
  color: #222;
}
.feedback__btns-box {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
  text-align: center;
}
.feedback__btns-box > * {
  flex: 1;
}
.feedback__btn {
  padding: 10px 0;
  background: #fc8109;
  transition: all 0.3s ease-out;
  font-weight: 600;
  color: #fff;
  border-radius: 5px;
}
</style>
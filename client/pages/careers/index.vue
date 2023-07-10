<template>
  <section class="career">
    <header class="career__header">
      <h1 class="career__title">
        <span class="career__title--sub-title career__title--sub"
          >Be part of PIZZERIA family</span
        >
        <span class="career__title--tall"> Grow </span>
        With Us
      </h1>
    </header>
    <div class="career__row">
      <div class="career__card">
        <h3 class="career__card-title">Team Member</h3>
        <NuxtLink to="/careers/team-member" class="career__card-link">
          Apply
        </NuxtLink>
      </div>
      <div class="career__card">
        <h3 class="career__card-title">Driver</h3>

        <NuxtLink to="/careers/driver" class="career__card-link">
          Apply
        </NuxtLink>
      </div>
      <div class="career__card">
        <h3 class="career__card-title">Manager</h3>
        <NuxtLink to="/careers/manager" class="career__card-link">
          Apply
        </NuxtLink>
      </div>
      <div class="career__card">
        <h3 class="career__card-title">Area Coach</h3>
        <NuxtLink to="/careers/area-coach" class="career__card-link">
          Apply
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<style scoped>
.career {
  margin: 50px 0 100px 0;
}
.career__header {
  text-align: center;
  margin-bottom: 35px;
}
.career__title {
  font-size: clamp(1.5rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.career__title--sub {
  font-size: 16px;
  color: #222;
}
.career__title--sub-title {
  display: block;
}
.career__title--tall {
  font-size: clamp(1.55rem, calc(1.5vw + 1rem), 2.1rem);
  transition: font-size 0.3s ease-out;
}
.career__title--tall:hover {
  font-size: clamp(1.6rem, calc(1.6vw + 1rem), 2.2rem);
}
.career__row {
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.career__card {
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.career__card-title {
  margin-bottom: 20px;
  font-size: 25px;
}
.career__card-link {
  padding: 10px 0;
  display: block;
  text-align: center;
  border-radius: 10px;
  background: #fc8019;
  font-weight: 600;
  color: #fff;
  transition: all 0.3s ease-out;
}
.career__card-link:hover {
  background: #e77417;
}
</style>
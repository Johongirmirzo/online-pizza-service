<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__row">
        <div class="footer__row-box">
          <h5 class="footer__title">Order Now</h5>
          <ul class="footer__list">
            <li class="footer__item">
              <NuxtLink to="/#pizzas" class="footer__link">Pizzas</NuxtLink>
            </li>
            <li class="footer__item">
              <NuxtLink to="/#snacks" class="footer__link">Snacks</NuxtLink>
            </li>
            <li class="footer__item">
              <NuxtLink to="/#salads" class="footer__link">Salads</NuxtLink>
            </li>
            <li class="footer__item">
              <NuxtLink to="/#desserts" class="footer__link">Desserts</NuxtLink>
            </li>
            <li class="footer__item">
              <NuxtLink to="/#drinks" class="footer__link">Drinks</NuxtLink>
            </li>
            <li class="footer__item">
              <NuxtLink to="/#dips" class="footer__link">Dips</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="footer__row-box">
          <h5 class="footer__title">About</h5>
          <ul class="footer__list">
            <li class="footer__item">
              <NuxtLink to="/about" class="footer__link">About Us</NuxtLink>
            </li>
            <li class="footer__item">
              <NuxtLink to="/careers" class="footer__link">Career</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="footer__row-box">
          <h5 class="footer__title">Our Policies</h5>
          <ul class="footer__list">
            <li class="footer__item">
              <NuxtLink to="/privacy-policy" class="footer__link"
                >Privacy & Policy</NuxtLink
              >
            </li>
            <li class="footer__item">
              <NuxtLink to="/terms-of-service" class="footer__link"
                >Terms & Conditions</NuxtLink
              >
            </li>
            <li class="footer__item">
              <NuxtLink to="/faq-and-help" class="footer__link"
                >FAQs & Help</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div class="footer__row-box">
          <h5 class="footer__title">Improve Us With Your Feedback</h5>
          <NuxtLink class="footer__give-feedback-btn" to="/feedback"
            >Give Feedback</NuxtLink
          >
        </div>
      </div>
      <div class="footer__bottom">
        <small class="footer__copyright"
          >&copy; 2023 Pizzeria Uzbekistan. All rights reserved. Made with
          <Icon name="teenyicons:heart-solid" class="footer__heart-icon" />
          by
          <a
            class="footer__redirect-link"
            href="https://jaxongir-rahimov.netlify.app/"
            target="_blank"
            >Jaxongir Rahimov</a
          >
        </small>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer {
  margin-top: 100px;
  padding-top: 100px;
  background: #000;
  color: #fff;
}
.footer__wrapper {
  max-width: 960px;
  width: 95%;
  margin: 0 auto;
}
.footer__row {
  margin-bottom: 80px;
}
.footer__row-box {
  margin-bottom: 45px;
}
.footer__title {
  margin-bottom: 15px;
  font-size: 18px;
}
.footer__item {
  color: #e9e9e9;
  font-size: 13px;
  transition: all 0.3s ease-out;
}
.footer__item:hover {
  transform: translateX(5px);
  color: #fff;
}
.footer__item:not(:last-child) {
  margin-bottom: 10px;
}
.footer__give-feedback-btn {
  padding: 10px 25px;
  border-radius: 10px;
  background: #fff;
  color: #000;
  font-weight: 600;
  transition: all 0.3s ease-out;
}
.footer__give-feedback-btn:hover {
  background: #f0f0f0;
}
.footer__bottom {
  text-align: center;
  padding-bottom: 50px;
  font-size: 14px;
  margin-bottom: 100px;
}

.footer__heart-icon {
  margin: 0 5px;
  font-size: 16px;
  animation: heartAnimate 1s infinite both;
  color: red;
}
@keyframes heartAnimate {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(0.9);
  }
}
.footer__redirect-link {
  color: rgb(47, 47, 240);
  text-decoration: underline;
  text-underline-offset: 5px;
  font-size: 15px;
}

@media (min-width: 768px) {
  .footer__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .footer__bottom {
    margin-bottom: 0;
  }
}
</style>
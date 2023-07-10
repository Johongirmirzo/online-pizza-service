<template>
  <section class="faq-help">
    <header class="faq-help__header">
      <NuxtLink to="/">
        <Icon name="icon-park-outline:left" />
        Go Back</NuxtLink
      >
      <h1 class="faq-help__title">FAQ & Help</h1>
    </header>
    <div class="faq-help__box">
      <ul class="faq-help__list">
        <li class="faq-help__item">
          <h2 class="faq-help__box-title">
            How do I know where my pizzas will be kept?
          </h2>
          <p class="faq-help__text">
            This will be specified by you while placing order. In case, the
            rider calls you up for help & you are not reachable, the order will
            be placed on a clean surface at the door.
          </p>
        </li>
        <li class="faq-help__item">
          <h2 class="faq-help__box-title">
            How will I know the restaurant has received my online order?
          </h2>
          <p class="faq-help__text">
            Once you submit your order, the order tracking screen will display a
            tick mark against "Order Confirmation" status.
          </p>
        </li>
        <li class="faq-help__item">
          <h2 class="faq-help__box-title">
            What is the minimum order amount for delivery?
          </h2>
          <p class="faq-help__text">
            Minimum order amount for delivery is 40000 uzs (inclusive of taxes).
          </p>
        </li>
        <li class="faq-help__item">
          <h2 class="faq-help__box-title">
            Can I modify/cancel my online order?
          </h2>
          <p class="faq-help__text">
            The online order once placed cannot be modified or cancelled, either
            through the website or offline by calling the restaurant or our call
            center.
          </p>
        </li>
        <li class="faq-help__item">
          <h2 class="faq-help__box-title">How can I get a refund?</h2>
          <p class="faq-help__text">
            In case of a late delivery of a prepaid order or if payment is
            debited but the order was not placed, you can lodge a complaint at
            our call center by dialing 1995. Once your complaint has been
            acknowledged, the amount will be refunded within 21 business days or
            next credit cycle, if paid via credit card.
          </p>
        </li>
        <li class="faq-help__item">
          <h2 class="faq-help__box-title">
            Do I need to pay taxes on my order?
          </h2>
          <p class="faq-help__text">
            Yes. All prices mentioned on the websit eare exclusive of taxes.
          </p>
        </li>
        <li class="faq-help__item">
          <h2 class="faq-help__box-title">
            How do I know where my pizzas will be kept?
          </h2>
          <p class="faq-help__text">
            This will be specified by you while placing order. In case, the
            rider calls you up for help & you are not reachable, the order will
            be placed on a clean surface at the door.
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
<style scoped>
.faq-help {
  margin: 50px 0 100px 0;
}
.faq-help__header {
  margin-bottom: 25px;
}
.faq-help__title {
  text-align: center;
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.faq-help__box {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 25px;
  border-radius: 10px;
  font-weight: 600;
}
.faq-help__item {
  margin-bottom: 35px;
}
.faq-help__box-title {
  font-size: clamp(1.2rem, calc(1vw + 1rem), 1.5rem);
}
.faq-help__text {
  color: #444;
  font-weight: 400;
  margin-top: 10px;
}
</style>
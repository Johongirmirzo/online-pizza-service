<template>
  <section class="about">
    <article class="about__hero">
      <figure class="about__img-box">
        <img src="@/assets/about/about-us-oven.jpg" alt="" class="about__img" />
      </figure>
      <div class="about__text-box">
        <header class="about__header">
          <h1 class="about__title">About Us</h1>
        </header>
        <p class="about__description">
          Looking for the best pizza in town? Look no further than
          <strong class="about__strong">Pizzeria!</strong> We use only the
          freshest ingredients and our pizzas are cooked to perfection in our
          brick oven.
        </p>
        <p class="about__description">
          We're so confident that you'll love our pizza that we offer a 100%
          satisfaction guarantee. If you're not happy with your pizza for any
          reason, simply bring it back and we'll replace it or give you a full
          refund.
        </p>
        <p class="about__text">
          Here are just a few of the reasons why
          <strong class="about__strong">Pizzeria!</strong> is the best pizza
          place in town:
        </p>
        <ul class="about__list">
          <li class="about__item">
            We use only the freshest ingredients. Our dough is made fresh daily
            and our toppings are sourced from local farmers.
          </li>
          <li class="about__item">
            Our pizzas are cooked to perfection in our brick oven. This gives
            them a crispy crust and a delicious, smoky flavor.
          </li>
          <li class="about__item">
            We offer a wide variety of toppings. You can choose from traditional
            toppings like pepperoni and sausage, or get creative with more
            unique toppings like goat cheese, roasted vegetables, or even
            pineapple.
          </li>
          <li class="about__item">
            We offer generous portions. Our pizzas are made with large,
            hand-tossed crusts, so you'll never leave feeling hungry.
          </li>
          <li class="about__item">
            We have a friendly and welcoming atmosphere. Our staff is always
            happy to help you choose the perfect pizza and make sure you have a
            great dining experience.
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>
<style scoped>
.about {
  margin: 90px 0;
}

.about__header {
  margin-bottom: 20px;
  text-align: center;
}
.about__title {
  font-size: clamp(1.5rem, calc(1.5vw + 1rem), 2.5rem);
  font-weight: 600;
  color: #222;
}
.about__hero {
  display: flex;
  flex-direction: column-reverse;
  gap: 50px;
}
.about__hero > * {
  flex: 1;
}
.about__img-box {
  overflow: hidden;
  animation: moveFromLeft 0.7s ease-out;
}
.about__text-box {
  animation: moveFromRight 0.7s ease-out;
}
@keyframes moveFromLeft {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes moveFromRight {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.about__img {
  border-radius: 10px;
  height: 600px;
  object-fit: cover;
  transition: transform 0.3s ease-out;
  cursor: pointer;
}
.about__img:hover {
  transform: scale(1.05);
}
.about__description,
.about__text,
.about__item {
  color: #444;
}
.about__description {
  margin-bottom: 15px;
}
.about__strong {
  text-transform: uppercase;
  font-weight: 900;
  color: #222;
}
.about__text {
  margin-bottom: 15px;
}
.about__item {
  list-style: disc;
  margin-bottom: 10px;
}

@media (min-width: 992px) {
  .about__hero {
    flex-direction: row;
  }
}
</style>
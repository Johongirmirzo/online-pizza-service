<template>
  <section class="terms">
    <header class="terms__header">
      <NuxtLink to="/">
        <Icon name="icon-park-outline:left" />
        Go Back</NuxtLink
      >
      <h1 class="terms__title">Terms & Conditions</h1>
    </header>
    <div class="terms__box">
      <header class="terms__box-header">
        <h2 class="terms__box-title">Pizzeria</h2>
        <h2 class="terms__box-title">Terms & Conditions</h2>
      </header>
      <div class="terms__terms-box">
        <strong class="terms__terms-strong"> Pizzeria Terms Of Use </strong>
        <p class="terms__terms-description">
          PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY. BY ACCESSING
          THIS WEBSITE/M-SITE AND ANY PAGES THEREOF OR THE APP, YOU AGREE TO BE
          BOUND BY THE TERMS AND CONDITIONS OF USE BELOW AND/OR ANY SUCH TERMS
          AND CONDITIONS OF USE AS ARE COMMUNICATED ON THE PAGES THEREOF. YOU
          AGREE TO BE BOUND BY THESE TERMS DISCLOSED AND DESCRIBED HEREIN AND
          ALL TERMS INCORPORATED BY REFERENCE. IF YOU DO NOT AGREE TO ALL THESE
          TERMS, DO NOT USE THIS WEBSITE/M-SITE (HEREINAFTER KNOWN AS THE
          "SITE");
        </p>
      </div>
      <div class="pricay__text-box">
        <p class="terms__description">
          These Terms & Conditions are published in accordance with the
          Information Technology Act, 2000, Consumer Protection Act, 2019,
          Consumer Protection (E-commerse) Rules, 2020, and regulations,
          guidelines, by laws and notifications made thereafter that require
          publishing the rules and regulations, privacy policy and terms &
          conditions of use for access or usage of this website.
        </p>
        <p class="terms__description">
          For the purpose of these Terms & Conditions (which comprises of the
          General Terms of Use, Pizzeria Home Delivery Terms and Conditions,
          Offers' related terms and conditions, and the Disclaimer) wherever the
          context so requires "You" or "User" shall mean any natural or legal
          person who has agreed to become a User of the Site by using or
          registering on the Site as customer for placing the order or accessing
          the services offered on the Site. The term "We", "Us", "Our" or
          "Company" shall mean Yum Restaurants (Uzbekistan) Private Limited and
          its affiliates, as applicable.
        </p>
      </div>
      <div class="terms__text-box">
        <h3 class="terms__tertiary-title">General Terms of Use</h3>
        <p class="terms__description">
          Consent: By accessing the Site or by availing the services offered on
          Site, You agree to the Terms and Conditions read with Our Privacy
          Policy, or any other terms and conditions as available on Our site/app
          and updated from time to time. Whenver You submit information via this
          site/app, You consent to the collection, use and disclosure of the
          information in accordance with these Terms and Conditions read with
          Our Privacy Policy as available on Our Site and updated from time to
          time.
        </p>
        <p class="terms__list-description">
          Cashback or Discount on Payment page:
        </p>
        <ul class="terms__list">
          <li class="terms__item">
            While we provide the details of the offers and promotions on Our
            portals, we request You to kindly keep Yourself updated of the
            changes and alterations that maybe carried out by the respective
            payment method partners/third parties.
          </li>
        </ul>
        <p class="terms__description">
          Prohibited Use In addition to other prohibitions as set forth in the
          Pizza Hut Home Delivery Terms and Conditions, You are prohibited from
          using the channels of Site or its content: (a) for any unlawful
          purpose; (b) to solicit others to perform or participate in any
          unlawful acts; (c) to violate any international, central or state or
          local regulations, rules or laws; (d) to infringe upon or violate our
          intellectual property rights or the intellectual property rights of
          others; (e) to harass, abuse, insult, harm, defame, slander,
          disparage, intimdate, or discriminate based on religion, ethnicity,
          rage, age, national origin or disability; (f) to submit fale or
          misleading information; (g) to upload or transmit viruses or any other
          type of malicious code that will or may be used in any way that will
          affect the functionality or operation of Terms and Conditions or of
          any related Websites/Apps, other Websites/Apps, or the Internet; (h)
          to collect o track the personal information of others; (i) to spam,
          phish, pharm, spieder, crawl, or scrape; (j) for nay obscene or
          immoral purpose; or (k) to interfere with or cirvumvent the security
          features of Pizzeria Home Delivery Services or any related
          Website/App, other Website/App, or the Internet.
        </p>
      </div>
    </div>
  </section>
</template>
<style scoped>
.terms {
  margin: 50px 0 100px 0;
}
.terms__header {
  margin-bottom: 25px;
}
.terms__title {
  text-align: center;
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.terms__box {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 25px;
  border-radius: 10px;
  font-weight: 600;
}
.terms__box-header {
  margin-bottom: 25px;
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}

.terms__text-box,
.terms__terms-box {
  margin-bottom: 50px;
}

.terms__item,
.terms__list-description,
.terms__description,
.terms__terms-description {
  font-size: 20px;
  color: #555;
}
.terms__description {
  margin-bottom: 25px;
}

.terms__terms-strong {
  display: inline-block;
  margin-bottom: 5px;
  font-size: clamp(1.2rem, calc(1vw + 1rem), 1.5rem);
}
.terms__tertiary-title {
  margin: 50px 0 10px 0;
  text-align: center;
  font-size: clamp(1.2rem, calc(1vw + 1rem), 1.5rem);
}
.terms__list-description {
  margin-bottom: 10px;
}
.terms__item {
  position: relative;
  margin-bottom: 20px;
  margin-left: 25px;
}
.terms__item::after {
  position: absolute;
  display: inline-block;
  content: "";
  top: 50%;
  transform: translateY(-50%);
  left: -25px;

  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #555;
}

@media (min-width: 768px) {
  .terms__box-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
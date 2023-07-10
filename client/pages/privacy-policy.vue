<template>
  <section class="privacy">
    <header class="privacy__header">
      <NuxtLink to="/">
        <Icon name="icon-park-outline:left" />
        Go Back</NuxtLink
      >
      <h1 class="privacy__title">Privacy & Policy</h1>
    </header>
    <div class="privacy__box">
      <header class="privacy__box-header">
        <h2 class="privacy__box-title">Pizzeria</h2>
        <h2 class="privacy__box-title">Privacy Policy</h2>
      </header>
      <div class="privacy__terms-box">
        <strong class="privacy__terms-strong"> Pizzeria Terms of Use </strong>
        <p class="privacy__terms-description">
          THESE TERMS AND CONDITIONS APPLY TO THE WEB SITE (UZBEKISTAN), THE
          M-SITE AND/OR THE PIZZERA (UZBEKISTAN). PLEASE READ THIS STATEMENT
          CAREFULLY. IF YOU DO NOT WISH TO BE BOUND BY THESE TERMS AND
          CONDITIONS THEN YOU SHOULD NOT ACCESS THIS SITE. ACCESS OF THIS SITE
          BY YOU SHALL BE DEEMED TO BE YOUR ACCEPTANCE OF THESE TERMS AND
          CONDITIONS.
        </p>
      </div>
      <div class="pricay__text-box">
        <p class="privacy__description">
          Yum Restaurants Uzbekistan (Private) Limited ("hereinafter referred to
          as either, Company, We, Us, or Our") is committed to protecting the
          privacy of personal data or information ("Personal Information") you
          may provide Us on the website, the app, or the m-site ("the Site"). We
          believe it is important for you to know how We treat your Personal
          Information. The terms of this Privacy Policy apply to all users of
          this Site. If you do not agree with the terms of this Privacy Policy,
          you should immediately cease the use of this Site.
        </p>
        <p class="privacy__description">
          Below you will find answers to several questions regarding Our Privacy
          Policy
        </p>
      </div>
      <div class="privacy__text-box">
        <h3 class="privacy__tertiary-title">
          What Information Does Company Collect About Me On This Site?
        </h3>
        <p class="privacy__description">
          Company collects Personal Information that you may voluntarily provide
          on online forms, which may include: Name, phone number, email ID,
          address, latitude, longitude, user registration, contact requests,
          guest comments, online surveys, and other online activities. The
          personal Information collected on this Site may include some or all of
          the following: your name, address, telephone number, email addresses,
          demographic information, and any other information you may
          volunetarily provide. You will have the choice whether or not to
          disclose such Personal Information in the above mentioned activities;
          however, some parts of the Site and some services may be more
          difficult or impossible to use if you choose not to disclose Personal
          Information. At the time of registration, you will have the option to
          receive future offers and updates from the Company by checking the
          appropriate opt-in box. If you choose to opt-in, your Personal
          Information will be kept in a secured database and We will alert you
          via email to new features, special offers, updated information and new
          services
        </p>
        <p class="privacy__description">
          In addition to the Personal Information identified above, Our web
          servers automatically identify computers by their IP addresses.
          Company may use IP addresses to analyse trends, administer the Site,
          track users' movement and gather broad demographic information for
          aggregate use.
        </p>
        <p class="privacy__description">
          Further, Our Site may use technologies such as cookies to provide
          visitors with tailored information upon each visit. Cookies are a
          common part of many commercial websites that allow small text files to
          be sent by a website, accepted by a web browser and then placed on
          your hard drive as recognition for repeat visits to the Site. Every
          time you visit Our Site, Our servers, through cookies, pixels and/or
          GIF files, collect basic technical information such as your domain
          name, the addresses of the last URL visited prior to clicking through
          to the Site, and your browser and operating system. You do not need to
          enable cookies to visit Our Site; however, some parts of the Site and
          some services may be more difficult or impossible to use if cookies
          are disabled. It does not contain your name, address, telephone
          number, or email address.
        </p>
      </div>
      <div class="privacy__text-box">
        <h3 class="privacy__tertiary-title">
          What Does Company Do With The Information Collected?
        </h3>
        <p class="privacy__list-description">
          Company may use your Personal Information for any of the following
          purposes:
        </p>
        <ul class="privacy__list">
          <li class="privacy__item">
            To understand the use of the Site and make improvements
          </li>
          <li class="privacy__item">To fulfil prizes</li>
          <li class="privacy__item">
            To register visitors for online activities they choose to
            participate in such as: contests, surveys, employment applications,
            comment forms, or any other online interactive activities
          </li>
          <li class="privacy__item">
            To respond to specific requests from visitors
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style scoped>
.privacy {
  margin: 50px 0 100px 0;
}
.privacy__header {
  margin-bottom: 25px;
}
.privacy__title {
  text-align: center;
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}
.privacy__box {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 25px;
  border-radius: 10px;
  font-weight: 600;
}
.privacy__box-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  align-items: center;
  font-size: clamp(1.4rem, calc(1.5vw + 1rem), 2rem);
  font-weight: 600;
}

.privacy__text-box,
.privacy__terms-box {
  margin-bottom: 50px;
}

.privacy__item,
.privacy__list-description,
.privacy__description,
.privacy__terms-description {
  font-size: 20px;
  color: #555;
}
.privacy__description {
  margin-bottom: 25px;
}

.privacy__terms-strong {
  display: inline-block;
  margin-bottom: 5px;
  font-size: clamp(1.2rem, calc(1vw + 1rem), 1.5rem);
}
.privacy__tertiary-title {
  margin: 50px 0 10px 0;
  text-align: center;
  font-size: clamp(1.2rem, calc(1vw + 1rem), 1.5rem);
}
.privacy__list-description {
  margin-bottom: 10px;
}
.privacy__item {
  position: relative;
  margin-bottom: 20px;
  margin-left: 25px;
}
.privacy__item::after {
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
</style>
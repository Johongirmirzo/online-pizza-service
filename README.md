# Online Pizza Delivery Service

- Online Pizza Delivery consists of 2 parts
  - ADMIN: where Admin of the restaurant can create SUB-ADMIN, DRIVER and control what resource they are authorized to do. Admin can also creat product categories and menu items, change status of each item default being PENDING, and to INACTIVE, ACTIVE, order notification is available, each time any customer makes order, ADMIN/SUB-ADMIN notified with voice message about new order. Admin can also track sales, and others on dashboard page. 
  - CLIENT: client can add available menu items to his cart but is required to login to make an order. once he logs in, he can make an order. As soon as he makes an order, he'll be redirected to live order page where countdown timer about time it takes his order to be ready. Any time Admin changes his order status from not-confirmed to confirmed, being prepared, boxed picked/delivered, he will be notified with voice message. He can also send message on contact page on real time

## App [Live](https://online-pizza-delivery.netlify.app/) 

## Technologies used

- Typescript,
- Express
- Prisma
- PosgresSQL
- Vue/Nuxt, Pinia


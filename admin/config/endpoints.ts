// const BASE_URL = `${process.env.SERVER_URL || 'http://localhost:8800'}/api/v1.0`
const BASE_URL = 'https://online-pizza-service.onrender.com/api/v1.0'

const ENDPOINTS = {
  LOGIN: '/users/login',
  GET_ALL_USERS: '/users/get-all-users',
  GET_USER: '/users/get-user',
  CREATE_USER: '/users/create-user',
  EDIT_USER: '/users/edit-user',
  DELETE_USER: '/users/delete-user',
  CHANGE_USER_STATUS: '/users/change-user-status',

  GET_ALL_CATEGORIES: '/category/get-all-categories',
  GET_CATEGORY: '/category/get-category',
  CREATE_CATEGORY: '/category/create-category',
  EDIT_CATEGORY: '/category/edit-category',
  DELETE_CATEGORY: '/category/delete-category',

  GET_ALL_TOPPINGS: '/topping/get-all-toppings',
  GET_TOPPING: '/topping/get-topping',
  CREATE_TOPPING: '/topping/create-topping',
  EDIT_TOPPING: '/topping/edit-topping',
  DELETE_TOPPING: '/topping/delete-topping',

  GET_ALL_CUSTOMERS: '/customer/get-all-customers',
  GET_CUSTOMER: '/customer/get-customer',
  GET_ALL_CUSTOMER_ADDRESSES: '/customer/get-all-customer-addresses',
  CHANGE_CUSTOMER_STATUS: '/customer/change-customer-status',
  DELETE_CUSTOMER: '/customer/delete-customer',

  GET_ALL_APPLICANTS: '/applicant/get-all-applicants',
  GET_APPLICANT: '/applicant/get-applicant',
  CHANGE_APPLICANT_STATUS: '/applicant/change-applicant-status',
  DELETE_APPLICANT: '/applicant/delete-applicant',

  GET_ALL_EMPLOYEES: '/employee/get-all-employees',
  GET_EMPLOYEE: '/employee/get-employee',
  CREATE_EMPLOYEE: '/employee/create-employee',
  EDIT_EMPLOYEE: '/employee/edit-employee',
  DELETE_EMPLOYEE: '/employee/delete-employee',

  GET_ALL_EMPLOYEE_EMERGENCY_CONTACTS:
    '/employee/get-all-employee-emergency-contacts',
  GET_EMPLOYEE_EMERGENCY_CONTACT: '/employee/get-employee-emergency-contact',
  CREATE_EMPLOYEE_EMERGENCY_CONTACT:
    '/employee/create-employee-emergency-contact',
  EDIT_EMPLOYEE_EMERGENCY_CONTACT: '/employee/edit-employee-emergency-contact',
  DELETE_EMPLOYEE_EMERGENCY_CONTACT:
    '/employee/delete-employee-emergency-contact',

  GET_ALL_EMPLOYEE_NOTES: '/employee/get-all-employee-notes',
  GET_EMPLOYEE_NOTE: '/employee/get-employee-note',
  CREATE_EMPLOYEE_NOTE: '/employee/create-employee-note',
  EDIT_EMPLOYEE_NOTE: '/employee/edit-employee-note',
  DELETE_EMPLOYEE_NOTE: '/employee/delete-employee-note',

  GET_ALL_EMPLOYEE_LEAVE_DAYS: '/employee/get-all-employee-leave-days',
  GET_EMPLOYEE_LEAVE_DAY: '/employee/get-employee-leave-day',
  CREATE_EMPLOYEE_LEAVE_DAY: '/employee/create-employee-leave-day',
  CHANGE_EMPLOYEE_LEAVE_STATUS: '/employee/change-employee-leave-status',
  EDIT_EMPLOYEE_LEAVE_DAY: '/employee/edit-employee-leave-day',
  DELETE_EMPLOYEE_LEAVE_DAY: '/employee/delete-employee-leave-day',

  GET_ALL_MESSAGES: '/message/get-all-messages',
  GET_MESSAGE: '/message/get-message',
  DELETE_MESSAGE: '/message/delete-message',

  GET_ALL_FEEDBACKS: '/feedback/get-all-feedbacks',
  GET_FEEDBACK: '/feedback/get-feedback',
  CHANGE_FEEDBACK_STATUS: '/feedback/change-feedback-status',
  DELETE_FEEDBACK: '/feedback/delete-feedback',

  GET_ALL_DIPS: '/menu/get-all-dips',
  GET_DIP: '/menu/get-dip',
  CREATE_DIP: '/menu/create-dip',
  EDIT_DIP: '/menu/edit-dip',
  CHANGE_DIP_STATUS: '/menu/change-dip-status',
  DELETE_DIP: '/menu/delete-dip',

  GET_ALL_MENU_ITEMS: '/menu/get-all-menu-items',
  GET_MENU_ITEM: '/menu/get-menu-item',
  CREATE_MENU_ITEM: '/menu/create-menu-item',
  EDIT_MENU_ITEM: '/menu/edit-menu-item',
  CHANGE_MENU_ITEM_STATUS: '/menu/change-menu-item-status',
  DELETE_MENU_ITEM: '/menu/delete-menu-item',

  GET_ALL_PIZZAS: '/menu/get-all-pizzas',
  GET_PIZZA: '/menu/get-pizza',
  CREATE_PIZZA: '/menu/create-pizza',
  EDIT_PIZZA: '/menu/edit-pizza',
  CHANGE_PIZZA_STATUS: '/menu/change-pizza-status',
  DELETE_PIZZA: '/menu/delete-pizza',

  GET_ALL_ORDERS: '/order/get-all-orders',
  GET_ALL_CUSTOMER_ORDERS: '/order/get-all-customer-orders',
  GET_ORDER: '/order/get-order',
  CHANGE_ORDER_STATUS: '/order/change-order-status',

  GET_ALL_REVIEWS: '/review/get-all-reviews',
  CHANGE_REVIEW_STATUS: '/review/change-review-status',
}

export { BASE_URL, ENDPOINTS }

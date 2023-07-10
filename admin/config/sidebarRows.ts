import {v4 as uuid} from "uuid";


export const sidebar = [
    {id: uuid(), navigateTo: "/", name: "Dashboard", icon: "radix-icons:dashboard"},
    {id: uuid(), name: "Category", icon: "iconamoon:category-light", categories: [
        {id: uuid(), navigateTo: "/category/add-category", name: "Add Category", icon: "iconamoon:category-light"},
        {id: uuid(), navigateTo: "/category/categories", name: "Categories", icon: "bx:food-menu"}
    ]},
    {id: uuid(), name: "Topping", icon: "icon-park-outline:list", categories: [
        {id: uuid(), navigateTo: "/topping/add-topping", name: "Add Topping", icon: "zondicons:add-outline"},
        {id: uuid(), navigateTo: "/topping/toppings", name: "Toppings", icon: "icon-park:list"}
    ]},
    {id: uuid(), name: "Menu", icon: "bx:food-menu", categories: [
        {id: uuid(), navigateTo: "/menu/add-pizza", name: "Add Pizza", icon: "iconamoon:category-light"},
        {id: uuid(), navigateTo: "/menu/add-dip", name: "Add Dip", icon: "iconamoon:category-light"},
        {id: uuid(), navigateTo: "/menu/add-menu-item", name: "Add Menu Item", icon: "iconamoon:category-light"},
        {id: uuid(), navigateTo: "/menu/pizzas", name: "Pizzas", icon: "bx:food-menu"},
        {id: uuid(), navigateTo: "/menu/dips", name: "Dips", icon: "bx:food-menu"},
        {id: uuid(), navigateTo: "/menu/menu-items", name: "Menu Items", icon: "bx:food-menu"}
    ]},
    // {id: uuid(), navigateTo: "/cart", name: "Carts", icon: "grommet-icons:cart"},
    {id: uuid(), name: "Orders", icon: "material-symbols:order-approve-outline", categories: [
        {id: uuid(), navigateTo: "/orders/all-orders", name: "All Orders", icon: "fluent-mdl2:activate-orders"},
        {id: uuid(), navigateTo: "/orders/not-confirmed-orders", name: "Not Confirmed", icon: "uiw:loading"},
        {id: uuid(), navigateTo: "/orders/cancelled-orders", name: "Cancelled", icon: "material-symbols:cancel"},
        {id: uuid(), navigateTo: "/orders/confirmed-orders", name: "Confirmed", icon: "fluent-mdl2:waitlist-confirm"},
        {id: uuid(), navigateTo: "/orders/foods-beeing-prepared", name: "Food Being Prepared", icon: "mdi:fish-food"},
        {id: uuid(), navigateTo: "/orders/boxed", name: "Boxed", icon: "ion:fast-food"},
        {id: uuid(), navigateTo: "/orders/picked-up-orders", name: "Picked Up", icon: "ion:fast-food"},
        {id: uuid(), navigateTo: "/orders/delivered-orders", name: "Delivered", icon: "iconamoon:delivery-bold"},
    ]},
    {id: uuid(), name: "User", icon: "fa-solid:users", categories: [
        {id: uuid(), navigateTo: "/user/add-user", name: "Add User", icon: "humbleicons:user-add"},
        {id: uuid(), navigateTo: "/user/users", name: "Users", icon: "fa-solid:users"}
    ]},
    {id: uuid(), navigateTo: "/customers", name: "Customers", icon: "fa-solid:users"},
    {id: uuid(), name: "Applicants", icon: "mdi:resume", categories: [
        {id: uuid(), navigateTo: "/applicant/applicants", name: "Applicants", icon: "humbleicons:user-add"},
        {id: uuid(), navigateTo: "/applicant/accepted-applicants", name: "Accepted Applicants", icon: "fa-solid:users"},
        {id: uuid(), navigateTo: "/applicant/rejected-applicants", name: "Rejected Applicants", icon: "fa-solid:users"}
    ]},
    {id: uuid(), name: "Employees", icon: "fa-solid:users", categories: [
        {id: uuid(), navigateTo: "/employee/add-employee", name: "Add Employee", icon: "humbleicons:user-add"},
        {id: uuid(), navigateTo: "/employee/add-employee-leave-day", name: "Add Employee Leave Day", icon: "humbleicons:user-add"},
        {id: uuid(), navigateTo: "/employee/add-employee-note", name: "Add Employee Note", icon: "humbleicons:user-add"},
        {id: uuid(), navigateTo: "/employee/employees", name: "Employees", icon: "fa-solid:users"},
        {id: uuid(), navigateTo: "/employee/employee-leave-days", name: "Employee Leave Days", icon: "fa-solid:users"},
        {id: uuid(), navigateTo: "/employee/employee-notes", name: "Employee Notes", icon: "fa-solid:users"}
    ]},
    {id: uuid(), navigateTo: "/messages", name: "Messages", icon: "wpf:message"},
    {id: uuid(), navigateTo: "/reviews", name: "Reviews", icon: "material-symbols:rate-review-outline-rounded"},
    {id: uuid(), navigateTo: "/feedbacks", name: "Feedbacks", icon: "uil:feedback"},
    {id: uuid(), name: "Reports", icon: "mdi:report-box-outline", categories: [
        {id: uuid(), navigateTo: "/report/between-dates", name: "B/W dates", icon: "fluent-mdl2:date-time"},
        {id: uuid(), navigateTo: "/report/sale-reports", name: "Sale Reports", icon: "mdi:cart-sale"}
    ]},
  ]
const sub_admin_not_allowed_routes = [
    "Category",
    "Topping",
    "Menu",
    "User",
    "Applicants",
    "Employees",
    "Feedbacks"
];
const driver_not_allowed_routes = [
    "Category",
    "Topping",
    "Menu",
    "User",
    "Applicants",
    "Employees",
    "Messages",
    "Customers"
];

const sub_admin_not_allowed_route_pathes = [
    "categories",
    "add-category",
    "edit-category-id",
    "toppings",
    "add-topping",
    "edit-topping-id",
    "menu-pizzas",
    "menu-add-pizza",
    "menu-edit-pizza-id",
    "menu-dips",
    "menu-add-dip",
    "menu-edit-dip-id",
    "menu-menu-items",
    "menu-add-menu-item",
    "menu-edit-menu-item-id",
    "users",
    "add-user",
    "edit-user-id",
    "applicant-applicants",
    "applicant-accepted-applicants",
    "applicant-rejected-applicants",
    "employee-employees",
    "employee-employee-leave-days",
    "employee-employee-notes",
    "employee-add-employee",
    "employee-add-employee-leave-day",
    "employee-add-employee-note",
];

const driver_not_allowed_route_pathes = ["categories",
    ...sub_admin_not_allowed_route_pathes,
    "messages",
    "reviews",
    "feedbacks",
    "customers",
    "between-dates",
    "order-count",
    "sale-reports",
]

export {
    sub_admin_not_allowed_routes,
    driver_not_allowed_routes,
    driver_not_allowed_route_pathes,
    sub_admin_not_allowed_route_pathes
}
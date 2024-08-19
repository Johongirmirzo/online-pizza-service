"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemType = exports.Status = void 0;
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
})(Status || (exports.Status = Status = {}));
var MenuItemType;
(function (MenuItemType) {
    MenuItemType["DRINKS"] = "DRINKS";
    MenuItemType["SNACKS"] = "SNACKS";
    MenuItemType["DESSERTS"] = "DESSERTS";
    MenuItemType["SALADS"] = "SALADS";
})(MenuItemType || (exports.MenuItemType = MenuItemType = {}));

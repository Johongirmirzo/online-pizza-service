<template>
  <select v-model="orderTime">
    <option value="today" selected>Today's Total Orders</option>
    <option value="week">This Week's Total Orders</option>
    <option value="month">This Month's Total Orders</option>
    <option value="year">This Year's Total Orders</option>
  </select>

  <div v-if="data?.labels?.length">
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import * as chartConfig from "./chartConfig.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

console.log(DateTime.fromJSDate(new Date()).month);

const orderTime = ref("");

const orders = ref([]);
const data = ref({});

watchEffect(async () => {
  const resp = await fetch(
    "http://localhost:8800/api/v1.0/order/get-all-orders"
  );
  const data = await resp.json();
  orders.value = data.data.sort((a, b) => a.id - b.id);
});

console.log(DateTime.local(2023, 7, 10).daysInYear);

watchEffect(() => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const currentDate = date.getDate();
  const orderRate = orderTime.value;
  switch (orderRate) {
    case "today":
      const todaysFilteredOrders = orders.value.filter((order) => {
        const parsedDate = DateTime.fromISO(order.created);
        const orderYear = parsedDate.year;
        const orderMonth = parsedDate.month;
        const orderDay = parsedDate.day;
        return (
          orderYear === currentYear &&
          orderMonth === currentMonth &&
          orderDay === currentDate
        );
      });

      data.value = {
        labels: [
          ...todaysFilteredOrders.map(
            (order) =>
              `${DateTime.fromISO(order.created).toFormat("h:mma")} - ${
                order.orderTotal
              } uzs`
          ),
        ],
        datasets: [
          {
            label: "Today's Orders",
            backgroundColor: "#f87979",
            data: [
              ...todaysFilteredOrders.map(
                (curr) => JSON.parse(curr.orderItems).length
              ),
            ],
          },
        ],
      };
      break;
    case "week":
      let totalForEachDay = [];
      let totalOrdersForEachDay = [];

      const orderWeekDays = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };

      const filteredThisWeekOrders = orders.value.filter((order) => {
        const parsedDate = DateTime.fromISO(order.created);
        const orderYear = parsedDate.year;
        const orderMonth = parsedDate.month;
        const orderDay = parsedDate.day;
        const orderWeekDay = parsedDate.weekday;

        const startOfWeek = orderDay - orderWeekDay + 1;
        const endOfWeek = orderDay + (7 - orderWeekDay);
        if (
          orderYear === currentYear &&
          orderMonth === currentMonth &&
          orderDay >= startOfWeek &&
          orderDay <= endOfWeek
        ) {
          return true;
        } else {
          return false;
        }
      });

      for (const weekDayOrder of filteredThisWeekOrders) {
        const parsedDate = DateTime.fromISO(weekDayOrder.created);
        const orderWeekDay = parsedDate.weekday;
        switch (orderWeekDay) {
          case 1:
            orderWeekDays.monday.push(weekDayOrder);
            break;
          case 2:
            orderWeekDays.tuesday.push(weekDayOrder);
            break;
          case 3:
            orderWeekDays.wednesday.push(weekDayOrder);
            break;
          case 4:
            orderWeekDays.thursday.push(weekDayOrder);
            break;
          case 5:
            orderWeekDays.friday.push(weekDayOrder);
            break;
          case 6:
            orderWeekDays.saturday.push(weekDayOrder);
            break;
          case 7:
            orderWeekDays.sunday.push(weekDayOrder);
            break;
        }
      }

      const weekDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      for (const weekDay of Object.keys(orderWeekDays)) {
        if (orderWeekDays[weekDay].length) {
          totalForEachDay.push(
            orderWeekDays[weekDay].reduce(
              (prev, curr) => prev + curr.orderTotal,
              0
            )
          );
          totalOrdersForEachDay.push(orderWeekDays[weekDay].length);
        } else {
          totalForEachDay.push(0);
          totalOrdersForEachDay.push(0);
        }
      }
      data.value = {
        labels: [
          ...weekDays.map(
            (weekDay, idx) => `${weekDay} - ${totalForEachDay[idx]} uzs`
          ),
        ],
        datasets: [
          {
            label: "This Week's Orders",
            backgroundColor: "#f87979",
            data: [...totalOrdersForEachDay.map((orderAmount) => orderAmount)],
          },
        ],
      };
      break;
    case "month":
      let totalForEachDayOfMonth = [];
      let totalOrdersForEachDayOfMonth = [];

      const thisMonthFilteredOrders = orders.value.filter((order) => {
        const parsedDate = DateTime.fromISO(order.created);
        const orderYear = parsedDate.year;
        const orderMonth = parsedDate.month;
        console.log(parsedDate.day);
        return orderYear === currentYear && orderMonth === currentMonth;
      });

      const orderMonthDays = {};
      const parsedDate = DateTime.fromJSDate(date);
      const currentOrderYear = parsedDate.year;
      const currentOrderMonth = parsedDate.month;
      const daysInMonth = DateTime.fromJSDate(date).daysInMonth!;
      for (let i = 1; i <= daysInMonth; i++) {
        orderMonthDays[`${i}/${currentOrderMonth}/${currentOrderYear}`] = [];
      }

      for (const thisMonthOrder of thisMonthFilteredOrders) {
        const parsedDate = DateTime.fromISO(thisMonthOrder.created);
        const orderDay = parsedDate.day;

        for (let i = 1; i <= daysInMonth; i++) {
          const currentDay = i;

          if (orderDay === currentDay) {
            orderMonthDays[
              `${currentDay}/${currentOrderMonth}/${currentOrderYear}`
            ].push(thisMonthOrder);
          }
        }
      }

      for (const orderMonthDay of Object.keys(orderMonthDays)) {
        console.log(orderMonthDays[orderMonthDay], 9);
        if (orderMonthDays[orderMonthDay].length) {
          totalForEachDayOfMonth.push(
            orderMonthDays[orderMonthDay].reduce(
              (prev, curr) => prev + curr.orderTotal,
              0
            )
          );

          totalOrdersForEachDayOfMonth.push(
            orderMonthDays[orderMonthDay].length
          );
        } else {
          totalOrdersForEachDayOfMonth.push(0);
          totalForEachDayOfMonth.push(0);
        }
      }
      data.value = {
        labels: [
          ...Object.keys(orderMonthDays).map(
            (orderMonthDay, idx) =>
              `${orderMonthDay} - ${totalForEachDayOfMonth[idx]} uzs`
          ),
        ],
        datasets: [
          {
            label: "This Month's Orders",
            backgroundColor: "#f87979",
            data: [
              ...totalOrdersForEachDayOfMonth.map((orderAmount) => orderAmount),
            ],
          },
        ],
      };
      break;
    case "year":
      const totalForEachMonthOfYear = [];
      const totalOrdersForEachMonthOfYear = [];
      const orderMonths = {};
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const thisYearFilteredOrders = orders.value.filter((order) => {
        const parsedDate = DateTime.fromISO(order.created);
        const orderYear = parsedDate.year;
        return orderYear === currentYear;
      });

      for (let monthOfYear = 0; monthOfYear <= 11; monthOfYear++) {
        console.log(monthOfYear);
        orderMonths[months[monthOfYear]] = [];
      }

      for (const thisYearOrder of thisYearFilteredOrders) {
        const parsedDate = DateTime.fromISO(thisYearOrder.created);
        const orderMonth = parsedDate.month;
        for (let monthOfYear = 1; monthOfYear <= 12; monthOfYear++) {
          if (orderMonth === monthOfYear) {
            orderMonths[months[orderMonth]].push(thisYearOrder);
          }
        }
      }

      for (const orderMonthYear of Object.keys(orderMonths)) {
        if (orderMonths[orderMonthYear].length) {
          totalForEachMonthOfYear.push(
            orderMonths[orderMonthYear].reduce(
              (prev, curr) => prev + curr.orderTotal,
              0
            )
          );
          totalOrdersForEachMonthOfYear.push(
            orderMonths[orderMonthYear].length
          );
        } else {
          totalForEachMonthOfYear.push(0);
          totalOrdersForEachMonthOfYear.push(0);
        }
      }
      console.log(orderMonths);
      console.log(totalForEachMonthOfYear);
      console.log(totalOrdersForEachMonthOfYear);

      data.value = {
        labels: [
          ...Object.keys(orderMonths).map(
            (orderMonthDay, idx) =>
              `${orderMonthDay} - ${totalForEachMonthOfYear[idx]} uzs`
          ),
        ],
        datasets: [
          {
            label: "This Years's Orders",
            backgroundColor: "#f87979",
            data: [
              ...totalOrdersForEachMonthOfYear.map(
                (orderAmount) => orderAmount
              ),
            ],
          },
        ],
      };
      break;
  }
});

const options = {
  responsive: true,
  maintainAspectRatio: true,
};
</script>
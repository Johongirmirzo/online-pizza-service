<template>
  <div class="line-chart__box" v-if="chartData?.labels?.length">
    <Line class="line-chart" :data="chartData" :options="options" />
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

const props = defineProps(["orders", "orderTime"]);

const chartData = ref({});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

watchEffect(() => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const currentDate = date.getDate();
  const orderRate = props.orderTime;
  switch (orderRate) {
    case "today":
      const orderHours = {
        "9:00-12:00": [],
        "12:01-15:00": [],
        "15:01-18:00": [],
        "18:01-21:00": [],
        "21:01-24:45": [],
      };
      const hours = [
        "9:00-12:00",
        "12:00-15:00",
        "15:00-18:00",
        "18:00-21:00",
        "21:00-24:45",
      ];
      const totalOrderForHour = [];
      const totalForHour = [];

      const todaysFilteredOrders = props.orders
        .slice()
        .sort((a, b) => a.id - b.id)
        .filter((order) => {
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

      todaysFilteredOrders.forEach((filteredOrder) => {
        const parsedDate = DateTime.fromISO(filteredOrder.created);
        const orderHour = parsedDate.hour;
        const orderMinute = parsedDate.minute;

        for (let i = 0; i < hours.length; i++) {
          const fromHour = Number(hours[i].split("-")[0].split(":")[0]);
          const fromMinute = Number(hours[i].split("-")[0].split(":")[1]);
          const toHour = Number(hours[i].split("-")[1].split(":")[0]);
          const toMinute = Number(hours[i].split("-")[1].split(":")[1]);

          if (
            orderHour >= fromHour &&
            orderMinute >= fromMinute &&
            orderHour < toHour
          ) {
            orderHours[hours[i]].push(filteredOrder);
          }
        }
      });

      for (const orderHour of Object.keys(orderHours)) {
        if (orderHours[orderHour].length) {
          totalForHour.push(
            orderHours[orderHour].reduce(
              (prev, curr) => prev + curr.orderTotal,
              0
            )
          );
          totalOrderForHour.push(orderHours[orderHour].length);
        } else {
          totalForHour.push(0);
          totalOrderForHour.push(0);
        }
      }

      console.log({ totalForHour, totalOrderForHour });

      chartData.value = {
        labels: [
          ...Object.keys(orderHours).map(
            (orderHour, idx) => `${orderHour} - ${totalForHour[idx]} uzs`
          ),
        ],
        datasets: [
          {
            label: "Today's Orders",
            backgroundColor: "#f87979",
            data: [
              ...totalOrderForHour.map((totalForEachHour) => totalForEachHour),
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

      const filteredThisWeekOrders = props.orders.filter((order) => {
        const parsedDate = DateTime.fromISO(order.created);
        const orderYear = parsedDate.year;
        const orderMonth = parsedDate.month;
        const orderDay = parsedDate.day;

        const startOfWeek =
          DateTime.fromJSDate(date).day - DateTime.fromJSDate(date).weekday + 1;
        const endOfWeek =
          DateTime.fromJSDate(date).day +
          (7 - DateTime.fromJSDate(date).weekday);

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
      chartData.value = {
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

      const thisMonthFilteredOrders = props.orders.filter((order) => {
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
      chartData.value = {
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

      const thisYearFilteredOrders = props.orders.filter((order) => {
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

      chartData.value = {
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
  maintainAspectRatio: false,
};
</script>
<style scoped>
.line-chart__box {
  height: 400px;
}
</style>
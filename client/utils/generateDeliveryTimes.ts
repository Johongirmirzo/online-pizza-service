export const generateDeliveryTimes = ()=>{
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const deliveryTimes = [];


  if (hour === 23 && minutes >= 0) return [];
  if (hour === 22 && minutes >= 45) {
    deliveryTimes.push(`${hour + 1}:15 - ${hour + 1}:45`);
    return;
  }
  if (minutes >= 0 && minutes <= 15) {
    deliveryTimes.push(`${hour}:45 - ${hour + 1}:15`);
  } else if (minutes >= 16 && minutes <= 30) {
    deliveryTimes.push(`${hour + 1}:00 - ${hour + 1}:30`);
  } else if (minutes >= 31 && minutes <= 45) {
    deliveryTimes.push(`${hour + 1}:15 - ${hour + 1}:45`);
  } else {
    if (minutes >= 46) {
      deliveryTimes.push(`${hour + 1}:30 - ${hour + 2}:00`);
    }
  }
  let lastSetMinute = Number(
    deliveryTimes[deliveryTimes.length - 1].split("-")[0].split(":")[1]
  );
  let lastSetHour = Number(
    deliveryTimes[deliveryTimes.length - 1].split("-")[0].split(":")[0]
  );
  while (
    `${lastSetHour}:${lastSetMinute.toString().padStart(2, "0")}` !== "23:00"
  ) {
    lastSetMinute = Number(
      deliveryTimes[deliveryTimes.length - 1].split("-")[0].split(":")[1]
    );
    lastSetHour = Number(
      deliveryTimes[deliveryTimes.length - 1].split("-")[0].split(":")[0]
    );
    switch (lastSetMinute + 15) {
      case 15:
        deliveryTimes.push(`${lastSetHour}:15 - ${lastSetHour}:45`);
        break;
      case 30:
        deliveryTimes.push(`${lastSetHour}:30 - ${lastSetHour + 1}:00`);
        break;
      case 45:
        deliveryTimes.push(`${lastSetHour}:45 - ${lastSetHour + 1}:15`);
        break;
      case 60:
        deliveryTimes.push(`${lastSetHour + 1}:00 - ${lastSetHour + 1}:30`);
        break;
    }
  }
  return deliveryTimes
}
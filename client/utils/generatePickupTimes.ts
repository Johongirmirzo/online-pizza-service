export const generateOrderPickupTimes = ()=>{
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const pickupTimes = [];


    if (hour === 23 && minutes > 15) {
        pickupTimes.push(`${hour}:45`);
        return pickupTimes
    }
    if (minutes >= 0 && minutes <= 15) {
        pickupTimes.push(`${hour}:45`);
    } else if (minutes >= 16 && minutes <= 30) {
        pickupTimes.push(`${hour + 1}:00`);
    } else if (minutes >= 31 && minutes <= 45) {
        pickupTimes.push(`${hour + 1}:15`);
    } else {
        if (minutes >= 46) {
        pickupTimes.push(`${hour + 1}:30`);
        }
    }
    let lastSetMinute = Number(pickupTimes[pickupTimes.length - 1].split(":")[1]);
    let lastSetHour = Number(pickupTimes[pickupTimes.length - 1].split(":")[0]);
    while (pickupTimes[pickupTimes.length - 1] !== "23:45") {
        lastSetMinute = Number(pickupTimes[pickupTimes.length - 1].split(":")[1]);
        lastSetHour = Number(pickupTimes[pickupTimes.length - 1].split(":")[0]);
        switch (lastSetMinute + 15) {
        case 15:
            pickupTimes.push(`${lastSetHour}:15`);
            break;
        case 30:
            pickupTimes.push(`${lastSetHour}:30`);
            break;
        case 45:
            pickupTimes.push(`${lastSetHour}:45`);
            break;
        case 60:
            pickupTimes.push(`${lastSetHour + 1}:00`);
            break;
        }
    }
    return pickupTimes
}
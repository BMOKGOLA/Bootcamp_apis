export function enoughAirtime(projectedUsage, airtime) {
  const dataRate = 12;
  const callRate = 1.88;
  const smsRate = 0.75;

  // Split the usage string by commas and trim any extra spaces
  const splitProjectedUsage = projectedUsage.split(',').map(usage => usage.trim());

  let sum = 0;

  // Calculate the total cost based on the usage
  for (let i = 0; i < splitProjectedUsage.length; i++) {
      const currentUsage = splitProjectedUsage[i];
      if (currentUsage === 'data') {
          sum += dataRate;
      } else if (currentUsage === 'call') {
          sum += callRate;
      } else if (currentUsage === 'sms') {
          sum += smsRate;
      }
  }

  // Calculate the remaining airtime
  const remainingAirtime = airtime - sum;

  // Return the remaining airtime, ensuring it's at least R0.00
  if (remainingAirtime < 0) {
      return 'R0.00';
  }
  return 'R' + remainingAirtime.toFixed(2);
}

  
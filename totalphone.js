export function totalPhoneBill(phoneString) {
    // Ensure no extra spaces and split the input string
    const phoneStringList = phoneString.split(',').map(item => item.trim());

    // Define rates
    const callRate = 2.75;
    const smsRate = 0.65;

    // Initialize total
    let total = 0;

    // Calculate total bill
    for (let i = 0; i < phoneStringList.length; i++) {
        const item = phoneStringList[i];
        if (item === 'call') {
            total += callRate;
        } else if (item === 'sms') {
            total += smsRate;
        }
    }

    // Return the total bill as a numeric value
    return total;
}

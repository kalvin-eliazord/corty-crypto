export function formatNumberWithUnits(value: number): string {
    if (!value || isNaN(value)) {
      console.warn("Incorrect value, cannot format");
      return "0,00 B";
    }
  
    const units = ["", "K", "M", "B", "T"];
    let unitIndex = 0;
  
    while (Math.abs(value) >= 1000 && unitIndex < units.length - 1) {
      value /= 1000;
      unitIndex++;
    }
  
    const formattedValue = value.toFixed(2);
    const cleanedValue = parseFloat(formattedValue).toString();
  
    return `${cleanedValue}${units[unitIndex]}`;
  }
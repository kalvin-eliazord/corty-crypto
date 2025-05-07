export const formatDataChart = (data: [number, number][]) => {
    if (!data) return [];
  
    return data.slice(90).map(([timestamp, mainData]) => ({
      day: new Date(timestamp).getDate(),
      mainData,
    }));
  };
  
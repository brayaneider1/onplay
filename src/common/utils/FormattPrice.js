 // funcion utilizada para dar formato de moneda a un number
 
 export const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
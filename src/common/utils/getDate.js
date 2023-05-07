// obtener la fecha actual
export function getCurrentDate() {
  let date = new Date().toLocaleDateString('en-CA')
  return date
}
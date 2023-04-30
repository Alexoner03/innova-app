export function obtenerHoraActual() {
  const fecha = new Date();
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Nota: en JavaScript los meses empiezan en 0
  const anio = fecha.getFullYear().toString();
  const horas = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  const segundos = fecha.getSeconds().toString().padStart(2, '0');
  return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
}

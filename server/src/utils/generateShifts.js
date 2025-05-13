import { initMySql } from "../dao/mySql/connection.js";
import { ShiftModel } from "../dao/mySql/models/shift.model.js";
import { format, addDays, eachDayOfInterval } from "date-fns";
import * as dateFnsTz from "date-fns-tz";

const utcToZonedTime = dateFnsTz.toZonedTime;

const generateShifts = async () => {
  try {

    await initMySql(); // Inicializa la conexión a la base de datos


    const startDate = new Date(); // Fecha de inicio (hoy)
    const endDate = addDays(startDate, 180); // Fecha de fin (6 meses desde hoy)
    const timeZone = "America/Argentina/Buenos_Aires";

    // Horarios disponibles para los turnos
    const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

    // Generar todas las fechas en el rango
    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    // Iterar sobre las fechas y horarios para crear los turnos
    for (const date of dates) {
      for (const time of timeSlots) {
        const shiftDateTime = `${format(date, "yyyy-MM-dd")}T${time}:00`;
        const zonedDateTime = utcToZonedTime(new Date(shiftDateTime), timeZone);

        // Verificar si el turno ya existe
        const existingShift = await ShiftModel.findOne({
          where: {
            date: format(zonedDateTime, "yyyy-MM-dd"),
            time: format(zonedDateTime, "HH:mm:ss"),
          },
        });

        if (!existingShift) {
          await ShiftModel.create({
            date: format(zonedDateTime, "yyyy-MM-dd"),
            time: format(zonedDateTime, "HH:mm:ss"),
            status: "available", // Estado inicial del turno
          });
        }
      }
    } // Fin del bucle de fechas y horarios
    console.log("Turnos generados exitosamente para los próximos 6 meses.");
  } catch (error) {
    console.error("Error al generar los turnos:", error);
  }
};

generateShifts();

// node src/utils/generateShifts.js
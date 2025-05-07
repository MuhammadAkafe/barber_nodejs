import { Request, Response } from "express";
import db from "../../database/pgconnection";

export const Get_all_appointments = async (req: Request, res: Response) => {
  try {
    const { userid, date } = req.query;

    // ✅ التحقق من userid
    if (!userid || isNaN(Number(userid))) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    // ✅ استخدم التاريخ المرسل أو التاريخ الحالي
    let selectedDate = new Date(); // الآن
    if (typeof date === "string" && /^\d{4}-\d{2}$/.test(date)) {
      const [year, month] = date.split("-").map(Number);
      selectedDate = new Date(year, month - 1); // اضبط التاريخ على أول يوم في الشهر
    }

    // ✅ احسب أول وآخر يوم في الشهر المختار
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDay()-1)
      .toISOString()
      .split("T")[0];
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];

      console.log(firstDay, lastDay);

     // ✅ جلب المواعيد بين أول وآخر يوم في الشهر
    const appointments = await db("appointments")
      .where("userid", Number(userid))
      .andWhere("appointment_date", ">=", firstDay)
      .andWhere("appointment_date", "<=", lastDay)
      .orderBy("appointment_date", "asc")
      .orderBy("appointment_time", "asc");

      

    return res.status(200).json(appointments);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

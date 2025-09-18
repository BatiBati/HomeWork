import { config as configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const { EMAIL_PASS, EMAIL_USER } = process.env;

const transport = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});
export const sendHomeworkAddedNotification = async (
  parentEmail: string,
  taskInfo: string,
  studentId: string,
  lessonName: string,
  taskEndSchedule: string
) => {
  try {
    const result = await transport.sendMail({
      from: EMAIL_USER,
      to: parentEmail,
      subject: "Шинэ даалгавар нэмэгдлээ - HomeWork System",
      text: `Сайн байна уу! Багш шинэ даалгавар нэмлээ: ${taskInfo}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; min-width: 400px;">
          <h3 style="color: #333; text-align: center; margin: 10px 0; font-size: 20px;">Шинэ даалгавар нэмэгдлээ</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h4 style="color: #007bff; margin: 0 0 10px 0; font-size: 16px;">Даалгаврын бүрэн мэдээлэл:</h4>
            
            <div style="margin: 10px 0;">
              <strong style="color: #333; font-size: 14px;">Хичээлийн нэр:</strong>
              <p style="font-size: 14px; margin: 5px 0; padding: 5px; background-color: white; border-radius: 4px;">${lessonName}</p>
            </div>
            
          
            <div style="margin: 10px 0;">
              <strong style="color: #333; font-size: 14px;">Дуусах хугацаа:</strong>
              <p style="font-size: 14px; margin: 5px 0; padding: 5px; background-color: white; border-radius: 4px;">${new Date(
                taskEndSchedule
              ).toLocaleDateString("mn-MN")} ${new Date(
        taskEndSchedule
      ).toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            
          
            
            <div style="margin: 15px 0; text-align: center;">
              <a href="http://localhost:3000/student/${studentId}" 
                 style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 14px;">
              Даалгавар харах
              </a>
            </div>
          </div>
          
          <div style="background-color: #e9ecef; padding: 10px; border-radius: 6px; margin: 10px 0;">
            <p style="color: #495057; font-size: 12px; margin: 0; text-align: center;">
              <strong>Анхааруулга:</strong> Энэ даалгаврыг цаг тухайд нь хийж дуусгахыг анхаарна уу!
            </p>
          </div>
          
          <p style="color: #666; font-size: 11px; margin: 5px 0; text-align: center;">
            Энэ мэдэгдэл нь таны хүүхдийн багшийн системээс автоматаар илгээгдсэн болно.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 10px 0;">
          <p style="color: #999; font-size: 10px; text-align: center; margin: 5px 0;">
            HomeWork Management System
          </p>
        </div>
      `,
    });

    console.log("✅ Email sent:", result);

    return taskInfo;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email sending failed");
  }
};

// import { config as configDotenv } from "dotenv";
// import { createTransport } from "nodemailer";

// configDotenv();

// const { EMAIL_PASS, EMAIL_USER } = process.env;

// const transport = createTransport({
//   service: "gmail",
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
// });
// export const sendHomeworkAddedNotification = async (
//   parentEmail: string,
//   taskInfo: string,
//   daycareEmails: string[],
//   studentId: string,
//   lessonName: string,
//   taskEndSchedule: string
// ) => {
//   try {
//     // ---------- Parent email ----------
//     await transport.sendMail({
//       from: EMAIL_USER,
//       to: parentEmail,
//       subject: "Таны хүүхдийн шинэ даалгавар нэмэгдлээ",
//       html: `
//         <div>
//           <h3>Шинэ даалгавар ирлээ</h3>
//           <p>Хичээлийн нэр: ${lessonName}</p>
//           <p>Дуусах хугацаа: ${new Date(taskEndSchedule).toLocaleString(
//             "mn-MN"
//           )}</p>
//           <p>Таны хүүхдийн даалгавар: ${taskInfo}</p>
//           <a href="http://localhost:3000/student/${studentId}">Даалгавар харах</a>
//         </div>
//       `,
//     });

//     // ---------- Daycare email ----------
//     for (const email of daycareEmails) {
//       await transport.sendMail({
//         from: EMAIL_USER,
//         to: email,
//         subject: `Хүүхдийн даалгавар: ${lessonName}`,
//         html: `
//           <div>
//             <h3>Хүүхдийн мэдээлэл болон даалгавар</h3>
//             <p>Хичээлийн нэр: ${lessonName}</p>
//             <p>Дуусах хугацаа: ${new Date(taskEndSchedule).toLocaleString(
//               "mn-MN"
//             )}</p>
//             <p>Даалгаврын мэдээлэл: ${taskInfo}</p>
//             <p>Хүүхдийн профайл харах: <a href="http://localhost:3000/daycare/student/${studentId}">Click Here</a></p>
//           </div>
//         `,
//       });
//     }

//     console.log("✅ Emails sent successfully!");
//   } catch (error) {
//     console.error("Email sending failed:", error);
//     throw new Error("Email sending failed");
//   }
// };

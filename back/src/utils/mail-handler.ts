import { config as configDotenv } from "dotenv";
import { createTransport } from "nodemailer";
import { assignmentModel } from "../models/assignment.models";

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
  childrens: {
    firstName: string;
    lastName: string;
    parents: { email: string; daycareEmail?: string }[];
    grade: string;
    school: string;
  }[],
  lessons: { lessonName: string; taskDescription: string }[],
  assignment: InstanceType<typeof assignmentModel>
) => {
  try {
    // Get all unique parent emails
    const parentEmails = [];
    const daycareEmails = [];

    childrens.forEach((child) => {
      if (
        child.parents[0].email &&
        !parentEmails.includes(child.parents[0].email)
      ) {
        parentEmails.push(child.parents[0].email);
      }

      if (
        child.parents[0].daycareEmail &&
        !daycareEmails.includes(child.parents[0].daycareEmail)
      ) {
        daycareEmails.push(child.parents[0].daycareEmail);
      }
    });

    // ---------- Parent email (individualized per child) ----------
    for (const child of childrens) {
      const parentEmail = child.parents[0]?.email;
      if (!parentEmail) continue;

      const lessonsHtml = lessons
        .map(
          (lesson, index) => `
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
          <h4>Хичээл ${index + 1}: ${lesson.lessonName}</h4>
          <p><strong>Даалгавар:</strong> ${lesson.taskDescription}</p>
        </div>
      `
        )
        .join("");

      await transport.sendMail({
        from: EMAIL_USER,
        to: parentEmail,
        subject: `Таны хүүхэд ${child.firstName} ${child.lastName}-д шинэ даалгавар нэмэгдлээ (${lessons.length} хичээл)`,
        html: `
          <div>
            <h3>${child.firstName} ${
          child.lastName
        } хүүхдийн шинэ даалгавар</h3>
            <p><strong>Дуусах хугацаа:</strong> ${new Date(
              assignment.taskEndSchedule
            ).toLocaleString("mn-MN")}</p>
            <p><strong>Хичээлийн тоо:</strong> ${lessons.length}</p>
            
            <h4>Хичээлийн жагсаалт:</h4>
            ${lessonsHtml}
            
            <div style="margin-top: 20px;">
              <a href="https://home-work-n1g4.vercel.app/parent" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Даалгавар харах</a>
            </div>
          </div>
        `,
      });
    }

    for (const child of childrens) {
      const daycareEmail = child.parents[0].daycareEmail;
      if (daycareEmail && daycareEmail.trim() !== "") {
        // Create HTML content for all lessons for daycare
        const lessonsHtml = lessons
          .map(
            (lesson, index) => `
          <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            <h4>Хичээл ${index + 1}: ${lesson.lessonName}</h4>
            <p><strong>Даалгавар:</strong> ${lesson.taskDescription}</p>
          </div>
        `
          )
          .join("");

        await transport.sendMail({
          from: EMAIL_USER,
          to: daycareEmail,
          subject: `${child.firstName} ${child.lastName} хүүхдийн даалгавар (${lessons.length} хичээл)`,
          html: `
            <div>
              <h3>${child.school} ${child.grade} ${child.firstName} ${
            child.lastName
          } хүүхдийн даалгавар</h3>
              <p><strong>Дуусах хугацаа:</strong> ${new Date(
                assignment.taskEndSchedule
              ).toLocaleString("mn-MN")}</p>
              <p><strong>Хичээлийн тоо:</strong> ${lessons.length}</p>
              
              <h4>Хичээлийн жагсаалт:</h4>
              ${lessonsHtml}
              
              <div style="margin-top: 15px;">
                <p>Хүүхдийн даалгавар харах: <a href="https://home-work-n1g4.vercel.app/assignment/${
                  assignment.id
                }" style="background-color: #28a745; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px;">Click Here</a></p>
              </div>
            </div>
          `,
        });
        console.log(
          `📧 Sent daycare email for ${child.firstName} ${child.lastName} to: ${daycareEmail}`
        );
      }
    }

    console.log("✅ Emails sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email sending failed");
  }
};

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
  childrens: {
    firstName: string;
    lastName: string;
    parents: { email: string; daycareEmail?: string }[];
  }[],
  lessons: { lessonName: string; taskDescription: string }[],
  taskEndSchedule: string
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

    console.log("📧 All parent emails:", parentEmails);
    console.log("📧 All daycare emails:", daycareEmails);

    // ---------- Parent email ----------
    if (parentEmails.length > 0) {
      await transport.sendMail({
        from: EMAIL_USER,
        to: parentEmails.join(","),
        subject: "Таны хүүхдийн шинэ даалгавар нэмэгдлээ",
        html: `
          <div>
            <h3>Шинэ даалгавар ирлээ</h3>
            <p>Хичээлийн нэр: ${lessons[0].lessonName}</p>
            <p>Дуусах хугацаа: ${new Date(taskEndSchedule).toLocaleString(
              "mn-MN"
            )}</p>
            <p>Таны хүүхдийн даалгавар: ${lessons[0].taskDescription}</p>
            <a href="http://localhost:3000/assignment">Даалгавар харах</a>
          </div>
        `,
      });
    }

    // ---------- Daycare email ----------
    // Send individual emails for each child to their specific daycare
    for (const child of childrens) {
      const daycareEmail = child.parents[0].daycareEmail;
      if (daycareEmail && daycareEmail.trim() !== "") {
        await transport.sendMail({
          from: EMAIL_USER,
          to: daycareEmail,
          subject: `${child.firstName} ${child.lastName} хүүхдийн даалгавар: ${lessons[0].lessonName}`,
          html: `
            <div>
              <h3>${child.firstName} ${child.lastName} хүүхдийн даалгавар</h3>
              <p>Хичээлийн нэр: ${lessons[0].lessonName}</p>
              <p>Дуусах хугацаа: ${new Date(taskEndSchedule).toLocaleString(
                "mn-MN"
              )}</p>
              <p>Даалгаврын мэдээлэл: ${lessons[0].taskDescription}</p>
              <p>Хүүхдийн даалгавар харах: <a href="http://localhost:3000/daycare/assignment">Click Here</a></p>
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

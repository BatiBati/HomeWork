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
            <div style="margin-bottom: 16px; padding: 16px; background: #ffffff; border: 1px solid #e6ebf1; border-radius: 12px; box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <div style="width:8px; height:8px; border-radius:50%; background: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%);"></div>
                <h4 style="margin:0; font-size:16px; color:#0f172a;">Хичээл ${
                  index + 1
                }: ${lesson.lessonName}</h4>
              </div>
              <p style="margin:0; color:#334155; line-height:1.6;">
                <strong style="color:#0f172a;">Даалгавар:</strong>
                ${lesson.taskDescription}
              </p>
            </div>
          `
        )
        .join("");

      await transport.sendMail({
        from: EMAIL_USER,
        to: parentEmail,
        subject: `Таны хүүхэд ${child.firstName} ${child.lastName}-д шинэ даалгавар нэмэгдлээ (${lessons.length} хичээл)`,
        html: `
          <div style="margin:0; padding:24px; background:#f7f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; color:#0f172a;">
            <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e6ebf1; border-radius:16px; overflow:hidden; box-shadow: 0 6px 20px rgba(2, 6, 23, 0.08);">
              <div style="height:6px; background: linear-gradient(90deg, #6366f1 0%, #22d3ee 100%);"></div>
              <div style="padding:24px 24px 8px 24px;">
                <h3 style="margin:0 0 8px 0; font-size:20px;">${
                  child.firstName
                } ${child.lastName} хүүхдийн шинэ даалгавар</h3>
                <p style="margin:0; color:#475569;">
                  <strong style="color:#0f172a;">Дуусах хугацаа:</strong>
                  ${new Date(assignment.taskEndSchedule).toLocaleString(
                    "mn-MN"
                  )}
                </p>
                <p style="margin:6px 0 0 0; color:#475569;">
                  <strong style="color:#0f172a;">Хичээлийн тоо:</strong> ${
                    lessons.length
                  }
                </p>
              </div>
              <div style="padding:16px 24px 8px 24px;">
                <h4 style="margin:0 0 12px 0; font-size:16px; color:#334155;">Хичээлийн жагсаалт</h4>
                ${lessonsHtml}
                <div style="padding: 8px 24px 24px 24px;">
                <a href="https://home-work-n1g4.vercel.app/parent" style="display:inline-block; background: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%); color: #ffffff; padding: 12px 18px; text-decoration: none; border-radius: 12px; font-weight:600; box-shadow: 0 6px 14px rgba(2, 6, 23, 0.12);">Даалгавар харах</a>
              </div>
              </div>
              
              <div style="padding:16px 24px; background:#f8fafc; border-top:1px solid #e6ebf1; color:#64748b; font-size:12px;">
                Энэ имэйл автоматаар илгээгдсэн болно. Хариу бичих шаардлагагүй.
              </div>
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
              <div style="margin-bottom: 14px; padding: 14px; background: #ffffff; border: 1px solid #e6ebf1; border-radius: 12px; box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <div style="width:8px; height:8px; border-radius:50%; background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);"></div>
                  <h4 style="margin:0; font-size:15px; color:#0f172a;">Хичээл ${
                    index + 1
                  }: ${lesson.lessonName}</h4>
                </div>
                <p style="margin:0; color:#334155; line-height:1.6;">
                  <strong style="color:#0f172a;">Даалгавар:</strong>
                  ${lesson.taskDescription}
                </p>
              </div>
            `
          )
          .join("");

        await transport.sendMail({
          from: EMAIL_USER,
          to: daycareEmail,
          subject: `${child.firstName} ${child.lastName} хүүхдийн даалгавар (${lessons.length} хичээл)`,
          html: `
            <div style="margin:0; padding:24px; background:#f7f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; color:#0f172a;">
              <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e6ebf1; border-radius:16px; overflow:hidden; box-shadow: 0 6px 20px rgba(2, 6, 23, 0.08);">
                <div style="height:6px; background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%);"></div>
                <div style="padding:24px 24px 8px 24px;">
                  <h3 style="margin:0 0 8px 0; font-size:20px;">${
                    child.school
                  } ${child.grade} ${child.firstName} ${
            child.lastName
          } хүүхдийн даалгавар</h3>
                  <p style="margin:0; color:#475569;">
                    <strong style="color:#0f172a;">Дуусах хугацаа:</strong>
                    ${new Date(assignment.taskEndSchedule).toLocaleString(
                      "mn-MN"
                    )}
                  </p>
                  <p style="margin:6px 0 0 0; color:#475569;">
                    <strong style="color:#0f172a;">Хичээлийн тоо:</strong> ${
                      lessons.length
                    }
                  </p>
                </div>
                <div style="padding:16px 24px 8px 24px;">
                  <h4 style="margin:0 0 12px 0; font-size:16px; color:#334155;">Хичээлийн жагсаалт</h4>
                  ${lessonsHtml}
                </div>
                <div style="padding: 8px 24px 24px 24px;">
                  <a href="https://home-work-n1g4.vercel.app/assignment/${
                    assignment.id
                  }" style="display:inline-block; background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); color: #ffffff; padding: 12px 18px; text-decoration: none; border-radius: 12px; font-weight:600; box-shadow: 0 6px 14px rgba(2, 6, 23, 0.12);">Хүүхдийн даалгавар үзэх</a>
                </div>
                <div style="padding:16px 24px; background:#f8fafc; border-top:1px solid #e6ebf1; color:#64748b; font-size:12px;">
                  Энэ имэйл автоматаар илгээгдсэн болно. Хариу бичих шаардлагагүй.
                </div>
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

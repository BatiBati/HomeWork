"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHomeworkEditedNotification = void 0;
const dotenv_1 = require("dotenv");
const nodemailer_1 = require("nodemailer");
(0, dotenv_1.config)();
const { EMAIL_PASS, EMAIL_USER } = process.env;
const transport = (0, nodemailer_1.createTransport)({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});
const sendHomeworkEditedNotification = (childrens, lessons, assignment) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        for (const child of childrens) {
            const parentEmail = (_a = child.parents[0]) === null || _a === void 0 ? void 0 : _a.email;
            if (parentEmail) {
                const lessonsHtml = lessons
                    .map((lesson, index) => `
              <div style="margin-bottom: 16px; padding: 16px; background: #ffffff; border: 1px solid #e6ebf1; border-radius: 12px; box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <div style="width:8px; height:8px; border-radius:50%; background: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%);"></div>
                  <h4 style="margin:0; font-size:16px; color:#0f172a;">Хичээл ${index + 1}: ${lesson.lessonName}</h4>
                </div>
                <p style="margin:0; color:#334155; line-height:1.6;">
                  <strong style="color:#0f172a;">Шинэчилсэн даалгавар:</strong>
                  ${lesson.taskDescription}
                </p>
              </div>
            `)
                    .join("");
                yield transport.sendMail({
                    from: EMAIL_USER,
                    to: parentEmail,
                    subject: `Таны хүүхэд ${child.firstName} ${child.lastName}-ийн даалгавар шинэчлэгдлээ (${lessons.length} хичээл)`,
                    html: `
            <div style="margin:0; padding:24px; background:#f7f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; color:#0f172a;">
              <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e6ebf1; border-radius:16px; overflow:hidden; box-shadow: 0 6px 20px rgba(2, 6, 23, 0.08);">
                <div style="height:6px; background: linear-gradient(90deg, #6366f1 0%, #22d3ee 100%);"></div>
                <div style="padding:24px 24px 8px 24px;">
                  <h3 style="margin:0 0 8px 0; font-size:20px;">${child.firstName} ${child.lastName} хүүхдийн даалгавар шинэчлэгдлээ</h3>
                  <p style="margin:0; color:#475569;">
                    <strong style="color:#0f172a;">Дуусах хугацаа:</strong>
                    ${new Date(assignment.taskEndSchedule).toLocaleString("mn-MN")}
                  </p>
                </div>

                <div style="padding:16px 24px 8px 24px;">
                  <h4 style="margin:0 0 12px 0; font-size:16px; color:#334155;">Шинэчлэл</h4>
                  ${lessonsHtml}
                </div>

                <div style="padding: 8px 24px 24px 24px;">
                  <a href="https://home-work-n1g4.vercel.app/parent" style="display:inline-block; background: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%); color: #ffffff; padding: 12px 18px; text-decoration: none; border-radius: 12px; font-weight:600; box-shadow: 0 6px 14px rgba(2, 6, 23, 0.12);">Даалгавар харах</a>
                </div>

                <div style="padding:16px 24px; background:#f8fafc; border-top:1px solid #e6ebf1; color:#64748b; font-size:12px;">
                  Энэ имэйл автоматаар илгээгдсэн болно. Хариу бичих шаардлагагүй.
                </div>
              </div>
            </div>
          `,
                });
            }
            const daycareEmail = (_b = child.parents[0]) === null || _b === void 0 ? void 0 : _b.daycareEmail;
            if (daycareEmail && daycareEmail.trim() !== "") {
                const lessonsHtml = lessons
                    .map((lesson, index) => `
              <div style="margin-bottom: 14px; padding: 14px; background: #ffffff; border: 1px solid #e6ebf1; border-radius: 12px; box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <div style="width:8px; height:8px; border-radius:50%; background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);"></div>
                  <h4 style="margin:0; font-size:15px; color:#0f172a;">Хичээл ${index + 1}: ${lesson.lessonName}</h4>
                </div>
                <p style="margin:0 0 6px 0; color:#334155;">
                  <strong style="color:#0f172a;">Дуусах хугацаа:</strong>
                  ${new Date(assignment.taskEndSchedule).toLocaleString("mn-MN")}
                </p>
                <p style="margin:0; color:#334155; line-height:1.6;">
                  <strong style="color:#0f172a;">Шинэчилсэн даалгавар:</strong>
                  ${lesson.taskDescription}
                </p>
              </div>
            `)
                    .join("");
                yield transport.sendMail({
                    from: EMAIL_USER,
                    to: daycareEmail,
                    subject: `${child.firstName} ${child.lastName} хүүхдийн даалгавар шинэчлэгдлээ`,
                    html: `
            <div style="margin:0; padding:24px; background:#f7f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; color:#0f172a;">
              <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e6ebf1; border-radius:16px; overflow:hidden; box-shadow: 0 6px 20px rgba(2, 6, 23, 0.08);">
                <div style="height:6px; background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%);"></div>
                <div style="padding:24px 24px 8px 24px;">
                  <h3 style="margin:0 0 8px 0; font-size:20px;">${child.school} ${child.grade} ${child.firstName} ${child.lastName} хүүхдийн даалгавар шинэчлэгдлээ</h3>
                  <p style="margin:0; color:#475569;">
                    <strong style="color:#0f172a;">Дуусах хугацаа:</strong>
                    ${new Date(assignment.taskEndSchedule).toLocaleString("mn-MN")}
                  </p>
                </div>
                <div style="padding:16px 24px 8px 24px;">
                  ${lessonsHtml}
                </div>
                <div style="padding: 8px 24px 24px 24px;">
                  <a href="https://home-work-n1g4.vercel.app/assignment/${assignment.id}" style="display:inline-block; background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); color: #ffffff; padding: 12px 18px; text-decoration: none; border-radius: 12px; font-weight:600; box-shadow: 0 6px 14px rgba(2, 6, 23, 0.12);">Хүүхдийн даалгавар үзэх</a>
                </div>
                <div style="padding:16px 24px; background:#f8fafc; border-top:1px solid #e6ebf1; color:#64748b; font-size:12px;">
                  Энэ имэйл автоматаар илгээгдсэн болно. Хариу бичих шаардлагагүй.
                </div>
              </div>
            </div>
          `,
                });
            }
        }
    }
    catch (error) {
        console.error("Edit email sending failed:", error);
        throw new Error("Edit email sending failed");
    }
});
exports.sendHomeworkEditedNotification = sendHomeworkEditedNotification;
//# sourceMappingURL=edit.mail.js.map
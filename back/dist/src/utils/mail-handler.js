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
exports.sendHomeworkAddedNotification = void 0;
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
const sendHomeworkAddedNotification = (childrens, lessons, taskEndSchedule) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all unique parent emails
        const parentEmails = [];
        const daycareEmails = [];
        childrens.forEach((child) => {
            if (child.parents[0].email &&
                !parentEmails.includes(child.parents[0].email)) {
                parentEmails.push(child.parents[0].email);
            }
            if (child.parents[0].daycareEmail &&
                !daycareEmails.includes(child.parents[0].daycareEmail)) {
                daycareEmails.push(child.parents[0].daycareEmail);
            }
        });
        console.log("📧 All parent emails:", parentEmails);
        console.log("📧 All daycare emails:", daycareEmails);
        // ---------- Parent email ----------
        if (parentEmails.length > 0) {
            yield transport.sendMail({
                from: EMAIL_USER,
                to: parentEmails.join(","),
                subject: "Таны хүүхдийн шинэ даалгавар нэмэгдлээ",
                html: `
          <div>
            <h3>Шинэ даалгавар ирлээ</h3>
            <p>Хичээлийн нэр: ${lessons[0].lessonName}</p>
            <p>Дуусах хугацаа: ${new Date(taskEndSchedule).toLocaleString("mn-MN")}</p>
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
                yield transport.sendMail({
                    from: EMAIL_USER,
                    to: daycareEmail,
                    subject: `${child.firstName} ${child.lastName} хүүхдийн даалгавар: ${lessons[0].lessonName}`,
                    html: `
            <div>
              <h3>${child.firstName} ${child.lastName} хүүхдийн даалгавар</h3>
              <p>Хичээлийн нэр: ${lessons[0].lessonName}</p>
              <p>Дуусах хугацаа: ${new Date(taskEndSchedule).toLocaleString("mn-MN")}</p>
              <p>Даалгаврын мэдээлэл: ${lessons[0].taskDescription}</p>
              <p>Хүүхдийн даалгавар харах: <a href="http://localhost:3000/daycare/assignment">Click Here</a></p>
            </div>
          `,
                });
                console.log(`📧 Sent daycare email for ${child.firstName} ${child.lastName} to: ${daycareEmail}`);
            }
        }
        console.log("✅ Emails sent successfully!");
    }
    catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Email sending failed");
    }
});
exports.sendHomeworkAddedNotification = sendHomeworkAddedNotification;
//# sourceMappingURL=mail-handler.js.map
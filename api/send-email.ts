import nodemailer from "nodemailer";
import { quoteRequestSchema } from "../src/lib/quote-request";
import { siteConfig } from "../src/lib/seo";

const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES = 15 * 1024 * 1024;
const THEME = {
  background: "#f7fbf6",
  surface: "#ffffff",
  primary: "#2f6446",
  primaryDark: "#234f37",
  primaryLight: "#e7f2ea",
  accent: "#b9d6c1",
  border: "#d8e7db",
  text: "#214031",
  muted: "#5e7668",
  soft: "#edf5ef",
};

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function parseBoolean(value: string | undefined) {
  return value?.toLowerCase() === "true";
}

function parsePort(value: string) {
  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a valid port number.");
  }
  return port;
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: getEnv("SMTP_HOST"),
      port: parsePort(getEnv("SMTP_PORT")),
      secure: parseBoolean(process.env.SMTP_SECURE),
      auth: {
        user: getEnv("SMTP_USER"),
        pass: getEnv("SMTP_PASS"),
      },
    });
  }

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtmlMessage(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message?: string;
  attachments: Array<{ filename: string }>;
}) {
  const details = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email, highlight: true },
    { label: "Phone", value: data.phone },
    { label: "Address", value: data.address },
    { label: "Service", value: data.service },
    { label: "Message", value: data.message || "(none)" },
  ];

  return `
    <div style="margin:0;padding:0;background:${THEME.background};font-family:Arial,Helvetica,sans-serif;color:${THEME.text};line-height:1.5">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.background};padding:24px 0">
        <tr>
          <td align="center">
            <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:92vw;border-collapse:separate;border-spacing:0">
              <tr>
                <td style="padding:0 0 16px">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.primary};border-radius:24px;overflow:hidden">
                    <tr>
                      <td style="padding:28px 30px 24px;background:${THEME.primary};color:#f8fff9">
                        <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.85">Cozy Green Landscaping</div>
                        <div style="font-size:28px;font-weight:700;margin:10px 0 8px">New quote request received</div>
                        <div style="font-size:15px;opacity:0.92">A customer submitted the contact form from the website. Reply directly to the customer's email to continue the conversation.</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 30px 24px;background:${THEME.primaryDark};color:#f8fff9">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:16px 18px;background:rgba(255,255,255,0.1);border-radius:16px">
                              <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Service requested</div>
                              <div style="font-size:22px;font-weight:700;margin-top:4px">${escapeHtml(data.service)}</div>
                            </td>
                            <td width="16"></td>
                            <td style="padding:16px 18px;background:rgba(255,255,255,0.1);border-radius:16px">
                              <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Reply to</div>
                              <div style="font-size:18px;font-weight:700;margin-top:4px;word-break:break-word">${escapeHtml(data.email)}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:0 0 16px">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.surface};border:1px solid ${THEME.border};border-radius:22px;overflow:hidden">
                    <tr>
                      <td style="padding:22px 24px;border-bottom:1px solid ${THEME.border};background:${THEME.soft}">
                        <div style="font-size:18px;font-weight:700;color:${THEME.text}">Customer details</div>
                        <div style="font-size:13px;color:${THEME.muted};margin-top:4px">Everything the team needs to follow up.</div>
                      </td>
                    </tr>
                    ${details
                      .map(
                        (item, index) => `
                          <tr>
                            <td style="padding:16px 24px;border-top:${index === 0 ? "0" : `1px solid ${THEME.border}`};">
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="160" style="vertical-align:top;font-size:13px;font-weight:700;color:${THEME.primaryDark};padding-right:16px">${escapeHtml(
                                    item.label,
                                  )}</td>
                                  <td style="vertical-align:top;font-size:14px;color:${item.highlight ? THEME.primaryDark : THEME.text};font-weight:${item.highlight ? "700" : "400"};word-break:break-word">${escapeHtml(
                                    item.value,
                                  )}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        `,
                      )
                      .join("")}
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:0 0 16px">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.surface};border:1px solid ${THEME.border};border-radius:22px;overflow:hidden">
                    <tr>
                      <td style="padding:22px 24px;border-bottom:1px solid ${THEME.border};background:${THEME.soft}">
                        <div style="font-size:18px;font-weight:700;color:${THEME.text}">Project message</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px 24px;font-size:14px;color:${THEME.text};white-space:pre-wrap;word-break:break-word">${escapeHtml(
                        data.message || "(none)",
                      )}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:0 0 16px">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.surface};border:1px solid ${THEME.border};border-radius:22px;overflow:hidden">
                    <tr>
                      <td style="padding:22px 24px;border-bottom:1px solid ${THEME.border};background:${THEME.soft}">
                        <div style="font-size:18px;font-weight:700;color:${THEME.text}">Attachments</div>
                        <div style="font-size:13px;color:${THEME.muted};margin-top:4px">${data.attachments.length} file${data.attachments.length === 1 ? "" : "s"} attached</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px 24px">
                        ${
                          data.attachments.length
                            ? `
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                ${data.attachments
                                  .map(
                                    (attachment) => `
                                      <tr>
                                        <td style="padding:8px 0;border-bottom:1px solid ${THEME.border};font-size:14px;color:${THEME.text};word-break:break-word">
                                          ${escapeHtml(attachment.filename)}
                                        </td>
                                      </tr>
                                    `,
                                  )
                                  .join("")}
                              </table>
                            `
                            : `<div style="font-size:14px;color:${THEME.muted}">No images were attached.</div>`
                        }
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:0">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.primary};border-radius:20px;overflow:hidden">
                    <tr>
                      <td style="padding:18px 24px;color:#f8fff9;font-size:13px">
                        <strong style="display:block;font-size:14px;margin-bottom:4px">Cozy Green Landscaping</strong>
                        <span style="opacity:0.92">${escapeHtml(siteConfig.serviceArea)} · ${escapeHtml(siteConfig.contactPhone)} · ${escapeHtml(siteConfig.contactEmail)}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function buildPlainTextMessage(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message?: string;
}) {
  return [
    `New quote request from ${siteConfig.name}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Address: ${data.address}`,
    `Service: ${data.service}`,
    `Message: ${data.message || "(none)"}`,
  ].join("\n");
}

function buildAutoReplyText(data: { name: string; service: string }) {
  return [
    `Hi ${data.name},`,
    "",
    `Thanks for reaching out to ${siteConfig.name}. We received your message about ${data.service}.`,
    "A member of our team will review it and get back to you as soon as possible, usually within 24 hours.",
    "",
    "If you need to update your request, just reply to this email and we'll take care of it.",
    "",
    "Best regards,",
    siteConfig.name,
  ].join("\n");
}

function buildAutoReplyHtml(data: { name: string; service: string }) {
  return `
    <div style="margin:0;padding:0;background:${THEME.background};font-family:Arial,Helvetica,sans-serif;color:${THEME.text};line-height:1.5">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.background};padding:24px 0">
        <tr>
          <td align="center">
            <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:92vw;border-collapse:separate;border-spacing:0">
              <tr>
                <td style="padding:0 0 16px">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.primary};border-radius:24px;overflow:hidden">
                    <tr>
                      <td style="padding:30px;background:${THEME.primary};color:#f8fff9">
                        <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.85">Cozy Green Landscaping</div>
                        <div style="font-size:28px;font-weight:700;margin:10px 0 8px">We received your message</div>
                        <div style="font-size:15px;opacity:0.92">Thanks for contacting us, ${escapeHtml(data.name)}. Your request is in our queue and we’ll be in touch soon.</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:0 0 16px">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.surface};border:1px solid ${THEME.border};border-radius:22px;overflow:hidden">
                    <tr>
                      <td style="padding:22px 24px;border-bottom:1px solid ${THEME.border};background:${THEME.soft}">
                        <div style="font-size:18px;font-weight:700;color:${THEME.text}">What happens next</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 24px;font-size:14px;color:${THEME.text}">
                        <div style="margin:0 0 14px">We’ve received your request about <strong style="color:${THEME.primaryDark}">${escapeHtml(
                          data.service,
                        )}</strong>.</div>
                        <div style="margin:0 0 14px">A team member will review the details and respond, usually within 24 hours.</div>
                        <div style="margin:0">If you need to add anything, just reply to this email and we’ll update your request.</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:0">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${THEME.primary};border-radius:20px;overflow:hidden">
                    <tr>
                      <td style="padding:18px 24px;color:#f8fff9;font-size:13px">
                        <strong style="display:block;font-size:14px;margin-bottom:4px">Cozy Green Landscaping</strong>
                        <span style="opacity:0.92">${escapeHtml(siteConfig.serviceArea)} · ${escapeHtml(siteConfig.contactPhone)} · ${escapeHtml(siteConfig.contactEmail)}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 120) || "attachment";
}

function getStringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function logError(context: string, error: unknown) {
  if (error instanceof Error) {
    const details = error as Error & {
      code?: string;
      command?: string;
      response?: string;
      responseCode?: number;
    };

    console.error(context, {
      message: details.message,
      code: details.code,
      command: details.command,
      responseCode: details.responseCode,
      response: details.response,
      stack: details.stack,
    });
    return;
  }

  console.error(context, error);
}

export async function handleSendEmail(request: Request) {
  console.log("send-email invoked", {
    method: request.method,
    url: request.url,
  });

  try {
    const formData = await request.formData();
    const parsed = quoteRequestSchema.safeParse({
      name: getStringField(formData, "name"),
      email: getStringField(formData, "email"),
      phone: getStringField(formData, "phone"),
      address: getStringField(formData, "address"),
      service: getStringField(formData, "service"),
      message: getStringField(formData, "message"),
    });

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid form data.", 400);
    }

    const fileValues = formData.getAll("attachments");
    if (fileValues.length > MAX_ATTACHMENTS) {
      return jsonError(`You can attach up to ${MAX_ATTACHMENTS} images.`, 400);
    }

    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType: string;
    }> = [];
    let totalAttachmentBytes = 0;

    for (const value of fileValues) {
      if (!(value instanceof File)) {
        continue;
      }

      if (!value.type.startsWith("image/")) {
        return jsonError("Only image attachments are allowed.", 400);
      }

      if (value.size > MAX_ATTACHMENT_BYTES) {
        return jsonError("Each image must be 5MB or smaller.", 400);
      }

      totalAttachmentBytes += value.size;
      if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
        return jsonError("Total attachment size is too large.", 400);
      }

      attachments.push({
        filename: sanitizeFilename(value.name),
        content: Buffer.from(await value.arrayBuffer()),
        contentType: value.type || "application/octet-stream",
      });
    }

    const subject = `[Quote Request] ${parsed.data.service} - ${parsed.data.name}`;
    const text = buildPlainTextMessage(parsed.data);
    const html = buildHtmlMessage({
      ...parsed.data,
      attachments: attachments.map((attachment) => ({ filename: attachment.filename })),
    });

    const transporterInstance = getTransporter();

    const info = await transporterInstance.sendMail({
      from: getEnv("SMTP_FROM"),
      to: getEnv("SMTP_TO"),
      replyTo: parsed.data.email,
      subject,
      text,
      html,
      attachments,
    });

    try {
      await transporterInstance.sendMail({
        from: getEnv("SMTP_FROM"),
        to: parsed.data.email,
        replyTo: getEnv("SMTP_TO"),
        subject: `We received your message - ${siteConfig.name}`,
        text: buildAutoReplyText({
          name: parsed.data.name,
          service: parsed.data.service,
        }),
        html: buildAutoReplyHtml({
          name: parsed.data.name,
          service: parsed.data.service,
        }),
      });
    } catch (replyError) {
      logError("Failed to send auto-reply email:", replyError);
    }

    return Response.json({ ok: true, messageId: info.messageId });
  } catch (error) {
    logError("Failed to send quote request email:", error);
    return jsonError("Email service is not configured or unavailable.", 500);
  }
}

export default {
  async fetch(request: Request) {
    console.log("send-email fetch", {
      method: request.method,
      url: request.url,
    });

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "POST" },
      });
    }

    return handleSendEmail(request);
  },
};

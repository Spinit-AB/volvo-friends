"use client";

import { useT } from "@/locales/utils/useT";
import { TColor } from "@/utils/types";
import { Button } from "../button/Button";
import { Truck } from "../graphics/Truck";
import { Toast, useToast } from "../toast/Toast";
import styles from "./Form.module.css";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

export function ContactFormClient({
  lang,
  subjects,
  color,
}: {
  lang: string;
  subjects: string[];
  color: TColor;
}) {
  const t = useT({ lang });

  // Toast state and handler
  const { toastState, showToast } = useToast();

  // Local submit handler for development
  const handleLocalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (isLocal) {
      // Local development - use API endpoint
      const message = formData.get("message");
      const email = formData.get("email");
      const subject = formData.get("subject");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, email, subject }),
      });

      if (res.ok) {
        showToast(
          t("contact.toast_success_title"),
          t("contact.toast_success_message"),
          "success",
        );
        form.reset();
      } else {
        showToast(
          t("contact.toast_error_title"),
          t("contact.toast_error_message"),
          "error",
        );
      }
    } else {
      // Production - submit to static HTML file for Netlify Forms
      try {
        await fetch("/forms/contact.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(
            Array.from(formData.entries()) as [string, string][],
          ).toString(),
        });

        showToast(
          t("contact.toast_success_title"),
          t("contact.toast_success_message"),
          "success",
        );
        form.reset();
      } catch {
        showToast(
          t("contact.toast_error_title"),
          t("contact.toast_error_message"),
          "error",
        );
      }
    }
  };

  // Remove the useEffect that was checking sessionStorage

  return (
    <section className={`page-container green ${styles.contact}`}>
      <header className={`full-width ${styles.contactHeader}`}>
        <h2 className={`text-display-xl ${styles.resizingHeading}`}>
          {t("contact.title")}
        </h2>
      </header>
      <form
        name="contact"
        method="POST"
        className={`${styles.root} ${color} ${styles.contactForm}`}
        onSubmit={handleLocalSubmit}
      >
        <p className={`${styles.contactText}`}>{t("contact.text")}</p>
        <input type="hidden" name="form-name" value="contact" />
        {/* Honeypot field for spam protection - hidden from users */}
        <p style={{ display: "none" }}>
          <label>
            Don&apos;t fill this out if you&apos;re human:{" "}
            <input name="bot-field" />
          </label>
        </p>

        <Select
          label={t("contact.subject")}
          name="subject"
          id="contact-subject"
          color={color}
          options={subjects}
        />

        <Input
          label={t("contact.email")}
          type="email"
          name="email"
          id="contact-email"
          color={color}
          helpText={t("contact.email_help")}
        />

        <Textarea
          label={t("contact.message")}
          name="message"
          id="contact-message"
          color={color}
          required
        />
        <Button
          size="base"
          color={"green"}
          type="submit"
          className={styles.sendBtn}
        >
          {t("contact.send")}
        </Button>
      </form>
      <Truck className={styles.truck} />
      <Toast toastState={toastState} t={t} />
    </section>
  );
}

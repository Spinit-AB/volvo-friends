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
import { useEffect } from "react";

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
    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");
    if (isLocal) {
      e.preventDefault();
      const form = e.currentTarget.elements;
      const textarea = form.namedItem("message");
      const emailInput = form.namedItem("email");
      const subjectSelect = form.namedItem("subject");
      const message = textarea && "value" in textarea ? textarea.value : "";
      const email = emailInput && "value" in emailInput ? emailInput.value : "";
      const subject =
        subjectSelect && "value" in subjectSelect ? subjectSelect.value : "";
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
      } else {
        showToast(
          t("contact.toast_error_title"),
          t("contact.toast_error_message"),
          "error",
        );
      }
    } else {
      // Set a flag so we can show a toast after Netlify reloads the page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("contactSubmitted", "1");
      }
    }
    // If not local, let Netlify handle the form
  };
  // On mount, show toast if Netlify submission flag is set
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("contactSubmitted") === "1"
    ) {
      showToast(
        t("contact.toast_success_title"),
        t("contact.toast_success_message"),
        "success",
      );
      sessionStorage.removeItem("contactSubmitted");
    }
  }, [showToast, t]);

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
        data-netlify="true"
        className={`${styles.root} ${color} ${styles.contactForm}`}
        onSubmit={handleLocalSubmit}
      >
        <p className={`${styles.contactText}`}>{t("contact.text")}</p>
        <input type="hidden" name="form-name" value="contact" />

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

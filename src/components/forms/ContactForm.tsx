"use client";

import { useT } from "@/locales/utils/useT";
import { useId } from "react";
import styles from "./Form.module.css";
import { Button } from "../button/Button";
import { TColor } from "@/utils/types";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { Truck } from "../graphics/Truck";

export function ContactForm({
  lang,
  subjects,
  color,
}: {
  lang: string;
  subjects: string[];
  color: TColor;
}) {
  const textareaId = useId();
  const emailId = useId();
  const subjectId = useId();

  const t = useT({ lang });
  return (
    <section className={`page-container green ${styles.contact}`}>
      <header className={`full-width ${styles.contactHeader}`}>
        <h2 className={`text-display-xl ${styles.resizingHeading}`}>
          {t("contact.title")}
        </h2>
      </header>
      {/* <ContactForm
          lang={lang}
          subjects={["Övrigt", "Frågor till Styrelsen", "Bidra till arkivet"]}
          color={"green"}
          className={`${styles.contactForm}`}
        /> */}

      <form
        name="contact"
        method="POST"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        netlify
        onSubmit={async (e) => {
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
            const message =
              textarea && "value" in textarea ? textarea.value : "";
            const email =
              emailInput && "value" in emailInput ? emailInput.value : "";
            const subject =
              subjectSelect && "value" in subjectSelect
                ? subjectSelect.value
                : "";
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message, email, subject }),
            });
            if (res.ok) {
              alert("Message sent!");
            } else {
              alert("Error sending message");
            }
          }
          // If not local, let Netlify handle the form
        }}
        className={`${styles.root} ${color} ${styles.contactForm}`}
      >
        <p className={`${styles.contactText}`}>{t("contact.text")}</p>
        <input type="hidden" name="form-name" value="contact" />

        <Select
          label={t("contact.subject")}
          name="subject"
          id={subjectId}
          color={color}
          options={subjects}
        />

        <Input
          label={t("contact.email")}
          type="email"
          name="email"
          id={emailId}
          color={color}
          helpText={t("contact.email_help")}
        />

        <Textarea
          label={t("contact.message")}
          name="message"
          id={textareaId}
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
    </section>
  );
}

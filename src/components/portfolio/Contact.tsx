import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Send, TriangleAlert } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks } from "./SocialLinks";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
const EMPTY: ContactInput = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const sendingRef = useRef(false);

  const update = (field: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return; // guard against double submits

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    const { data, errors: found } = validateContact(values);
    setErrors(found);
    if (!data) {
      const first = Object.keys(found)[0];
      if (first) form.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
      return;
    }
    if (honeypot) return;

    sendingRef.current = true;
    setStatus("sending");
    try {
      const res = await fetch(PROFILE.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          title: data.subject,
          message: data.message,
          _subject: `Contato via Portfólio — ${data.subject}`,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setValues(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  }

  const sending = status === "sending";

  return (
    <section id="contato" aria-labelledby="contato-title" className="relative isolate overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[520px] -translate-x-1/2 rounded-full glow-orb opacity-40" />

      <div className="container-premium grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            index="04"
            label="Contato"
            title="Entre em contato."
            subtitle="Interessado em trabalhar juntos? Envie uma mensagem!"
          />
          <div data-reveal className="mt-10 space-y-6">
            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-flex items-center gap-4 rounded-2xl border border-border px-5 py-4 transition-all duration-500 hover:border-border-strong hover:bg-accent/50"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Mail className="size-[18px]" />
              </span>
              <span>
                <span className="block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">E-mail direto</span>
                <span className="block text-foreground transition-colors group-hover:text-lavender">{PROFILE.email}</span>
              </span>
            </a>
            <SocialLinks withEmail />
          </div>
        </div>

        <form
          data-reveal
          noValidate
          onSubmit={onSubmit}
          aria-describedby="contact-status"
          className="surface-card relative rounded-[1.75rem] p-6 sm:p-9"
        >
          {/* honeypot */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Nome completo" error={errors.name}>
              <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Seu nome completo" value={values.name} onChange={update("name")} {...fieldProps("name", errors)} />
            </Field>
            <Field id="email" label="E-mail" error={errors.email}>
              <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="seuemail@email.com" value={values.email} onChange={update("email")} {...fieldProps("email", errors)} />
            </Field>
          </div>
          <div className="mt-5 grid gap-5">
            <Field id="subject" label="Assunto" error={errors.subject}>
              <input id="contact-subject" name="subject" type="text" placeholder="Título da mensagem" value={values.subject} onChange={update("subject")} {...fieldProps("subject", errors)} />
            </Field>
            <Field id="message" label="Mensagem" error={errors.message}>
              <textarea id="contact-message" name="message" rows={5} placeholder="Escreva sua mensagem aqui" value={values.message} onChange={update("message")} {...fieldProps("message", errors)} className={cn(fieldProps("message", errors).className, "resize-y")} />
            </Field>
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" variant="hero" size="xl" disabled={sending} aria-busy={sending} className="w-full sm:w-auto">
              {sending ? <Loader2 className="animate-spin" /> : <Send />}
              {sending ? "Enviando..." : "Enviar mensagem"}
            </Button>

            <p id="contact-status" role="status" aria-live="polite" className="min-h-6 text-sm">
              {status === "success" && (
                <span className="inline-flex items-center gap-2 text-success">
                  <CheckCircle2 className="size-4" /> Mensagem enviada com sucesso. Obrigada!
                </span>
              )}
              {status === "error" && (
                <span className="inline-flex items-start gap-2 text-destructive">
                  <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                  <span>
                    Não foi possível enviar agora. Escreva para{" "}
                    <a className="underline underline-offset-2" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>.
                  </span>
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function fieldProps(field: keyof ContactInput, errors: ContactErrors) {
  const invalid = Boolean(errors[field]);
  return {
    required: true,
    "aria-required": true,
    "aria-invalid": invalid,
    "aria-describedby": invalid ? `contact-${field}-error` : undefined,
    className: cn(
      "w-full rounded-xl border bg-background/50 px-4 py-3 text-[0.95rem] text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring/40",
      invalid ? "border-destructive" : "border-input focus:border-border-strong",
    ),
  } as const;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`contact-${id}`} className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`contact-${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

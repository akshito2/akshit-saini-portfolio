import { useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  Instagram,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { contact, projectTypes } from "@/data/profile";
import { supabase } from "@/lib/supabase";
import { Reveal } from "@/components/Reveal";
import { Turnstile } from "@marsidev/react-turnstile";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState("");

  const validate = (data: Record<string, string>) => {
    const errs: Record<string, string> = {};

    if (!data.name || data.name.trim().length < 2) {
      errs.name = "Please enter your full name.";
    }

    if (
      !data.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      errs.email = "Please enter a valid email address.";
    }

    if (!data.message || data.message.trim().length < 10) {
      errs.message =
        "Please enter a message (at least 10 characters).";
    }

    return errs;
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(
      formData.entries()
    ) as Record<string, string>;

    // Validate form
    const errs = validate(data);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    // Check Turnstile
    if (!turnstileToken) {
      setErrors({
        captcha:
          "Please complete the security verification.",
      });
      return;
    }

    setStatus("loading");

    try {
      // Send form to Supabase Edge Function
      //
      // The Edge Function handles:
      // 1. Turnstile verification
      // 2. Rate limiting
      // 3. Database insert
      // 4. Resend email
      const { data: responseData, error: functionError } =
        await supabase.functions.invoke(
          "send-contact-email",
          {
            body: {
              name: data.name,
              email: data.email,
              project_type: data.projectType,
              message: data.message,
              turnstileToken,
            },
          }
        );

      // Edge Function request failed
      if (functionError) {
        console.error(
          "Contact function error:",
          functionError
        );

        setStatus("error");
        return;
      }

      // Edge Function returned an error
      if (!responseData?.success) {
        console.error(
          "Contact submission failed:",
          responseData
        );

        setStatus("error");
        return;
      }

      // Success
      setStatus("success");
      form.reset();
      setTurnstileToken("");
      setErrors({});
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
    }
  };

  const socials = [
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: contact.email.startsWith("[")
        ? undefined
        : `mailto:${contact.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: contact.phone.startsWith("[")
        ? undefined
        : `tel:${contact.phone}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: contact.phone.startsWith("[")
        ? undefined
        : `https://wa.me/${contact.phone.replace(
            /\D/g,
            ""
          )}`,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: contact.instagram,
      href: contact.instagram.startsWith("[")
        ? undefined
        : "https://www.instagram.com/_akshit.edits/",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal
          variant="up"
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Contact
          </p>

          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Let's Create{" "}
            <span className="text-accent-gradient">
              Something Great
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-300">
            Have a project in mind? Send me the details and
            I'll get back to you within 24 hours.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left — Contact info */}
          <Reveal
            variant="left"
            className="lg:col-span-2"
          >
            <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 glass p-7">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Get in Touch
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  Whether it's a corporate film, YouTube
                  channel, or a single reel — I'd love to
                  hear about your project.
                </p>

                <div className="mt-6 space-y-3">
                  {socials.map((social) => (
                    <div
                      key={social.label}
                      className="group flex items-center gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-800/60 text-accent transition-colors group-hover:border-accent/40">
                        <social.icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-ink-400">
                          {social.label}
                        </p>

                        {social.href ? (
                          <a
                            href={social.href}
                            target={
                              social.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel="noopener noreferrer"
                            className="block truncate text-sm font-medium text-ink-100 transition-colors hover:text-accent"
                            data-cursor="hover"
                          >
                            {social.value}
                          </a>
                        ) : (
                          <p className="truncate text-sm font-medium text-ink-300">
                            {social.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — Form */}
          <Reveal
            variant="right"
            delay={100}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 glass p-7"
              noValidate
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  error={errors.name}
                />

                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  error={errors.email}
                />
              </div>

              {/* Project Type */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-ink-100">
                  Project Type
                </label>

                <select
                  name="projectType"
                  className="w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/50 focus:bg-ink-800"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a project type
                  </option>

                  {projectTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-ink-850"
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-ink-100">
                  Message
                </label>

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project, timeline, and what you're looking for..."
                  className={`w-full resize-none rounded-xl border bg-ink-800/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/50 focus:bg-ink-800 ${
                    errors.message
                      ? "border-red-500/50"
                      : "border-white/10"
                  }`}
                />

                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Cloudflare Turnstile */}
              <div className="mt-5">
                <Turnstile
                  siteKey={
                    import.meta.env
                      .VITE_TURNSTILE_SITE_KEY
                  }
                  onSuccess={(token) => {
                    setTurnstileToken(token);

                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.captcha;
                      return next;
                    });
                  }}
                  onExpire={() => {
                    setTurnstileToken("");
                  }}
                  onError={() => {
                    setTurnstileToken("");

                    setErrors({
                      captcha:
                        "Security verification failed. Please try again.",
                    });
                  }}
                />

                {errors.captcha && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.captcha}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-60"
                data-cursor="magnet"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Success message */}
              {status === "success" && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  {contact.successMessage}
                </div>
              )}

              {/* Error message */}
              {status === "error" && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {contact.errorMessage}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink-100">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-ink-800/60 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-ink-400 focus:border-accent/50 focus:bg-ink-800 ${
          error
            ? "border-red-500/50"
            : "border-white/10"
        }`}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
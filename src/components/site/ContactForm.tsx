import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { PhoneInput } from "./PhoneInput";
import { Check } from "lucide-react";
import { SelectDropdown } from "./SelectDropdown";

const projectTypes = ["Residential", "Commercial", "Industrial", "Institutional"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30),
  email: z.string().trim().email("Please enter a valid email").max(120),
  projectType: z.enum(["Residential", "Commercial", "Industrial", "Institutional"]),
  message: z.string().trim().min(10, "Please add a short description (10+ characters)").max(1500),
});

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

const initial: FormValues = {
  name: "",
  phone: "+61 ",
  email: "",
  projectType: "Residential",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  const set = <K extends keyof FormValues>(k: K, v: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please review the form and try again.");
      return;
    }
    setPending(true);
    try {
      const formData = new FormData();
      formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY as string);
      formData.append("subject", `New enquiry from ${parsed.data.name} — RST Consulting`);
      formData.append("name", parsed.data.name);
      formData.append("email", parsed.data.email);
      formData.append("phone", parsed.data.phone);
      formData.append("project_type", parsed.data.projectType);
      formData.append("message", parsed.data.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        toast.success("Thanks - we'll be in touch within 1 business day.");
      } else {
        toast.error(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-border p-10 bg-mist shadow-navy-md">
        <div className="h-12 w-12 rounded-full bg-navy text-white flex items-center justify-center shadow-navy-md">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-navy">
          Message received.
        </h3>
        <p className="mt-3 text-muted-foreground max-w-md">
          Thanks {values.name.split(" ")[0]} - we've logged your enquiry and
          will respond within one business day. For anything urgent, please
          call (03) 9540 3640.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initial);
            setSubmitted(false);
          }}
          className="mt-6 text-sm text-steel hover:text-navy underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field label="Name" id="name" error={errors.name}>
        <input
          id="name"
          type="text"
          required
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className={inputCls(!!errors.name)}
          placeholder="Your full name"
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone" id="phone" error={errors.phone}>
          <PhoneInput
            id="phone"
            value={values.phone}
            onChange={(v) => set("phone", v)}
            invalid={!!errors.phone}
            required
          />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <input
            id="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls(!!errors.email)}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <Field label="Project type" id="projectType" error={errors.projectType}>
        <SelectDropdown
          id="projectType"
          value={values.projectType}
          options={[...projectTypes]}
          onChange={(v) => set("projectType", v as FormValues["projectType"])}
          invalid={!!errors.projectType}
        />
      </Field>

      <Field label="Message" id="message" error={errors.message}>
        <textarea
          id="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className={inputCls(!!errors.message)}
          placeholder="Tell us briefly about the project - site, scope, timing."
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full sm:w-auto bg-navy text-white px-8 py-3.5 text-sm font-medium tracking-wide hover:bg-steel transition-colors disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
      <p className="text-xs text-muted-foreground">
        We respond to all quote requests within 1 business day.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.18em] text-navy font-medium mb-2"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function inputCls(invalid: boolean) {
  return `w-full rounded-md border ${
    invalid ? "border-destructive" : "border-border"
  } focus:border-steel focus:outline-none focus:ring-2 focus:ring-steel/20 bg-white px-3 py-3 text-sm transition-colors`;
}

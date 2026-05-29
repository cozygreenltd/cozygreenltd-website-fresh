// Quote request form with validation and an email handoff.
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/seo";
import { QUOTE_SERVICES, quoteRequestSchema } from "../lib/quote-request";

function buildQuoteMailto(form: {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
}) {
  const subject = `Quote request: ${form.service} - ${form.name.trim()}`;
  const body = [
    "New Quote Request",
    "",
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Address: ${form.address.trim()}`,
    `Service: ${form.service}`,
    "",
    "Project details:",
    form.message.trim() || "No additional project details were provided.",
  ].join("\n");

  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function QuoteForm({
  variant = "card",
  defaultService,
  compact = false,
}: {
  variant?: "card" | "plain";
  defaultService?: string;
  compact?: boolean;
}) {
  // Form state stays local so no backend submission is required.
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: defaultService ?? "",
    message: "",
  });

  const onChange = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    setForm((current) => ({ ...current, service: defaultService ?? "" }));
  }, [defaultService]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Validate locally, then open the visitor's email app with the request details.
    e.preventDefault();
    const r = quoteRequestSchema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }

    window.location.href = buildQuoteMailto(form);
    toast.success("Your email app is opening with the quote request details.");
  };

  const wrapper =
    variant === "card"
      ? cn(
          "bg-card text-card-foreground rounded-[10px] border border-white/90 shadow-[0_20px_50px_rgba(29,61,45,0.14)]",
          compact ? "p-4 sm:p-5" : "p-5 sm:p-6",
        )
      : "";
  const fieldGap = compact ? "gap-3" : "gap-4";
  const inputClass = compact ? "h-9 text-sm" : undefined;
  const labelClass = compact ? "text-xs" : undefined;

  return (
    <form onSubmit={submit} className={wrapper}>
      {variant === "card" && (
        <div className={compact ? "mb-3" : "mb-4"}>
          <h3 className={compact ? "text-lg font-semibold" : "text-xl font-semibold"}>
            Get a Free Quote
          </h3>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Tell us a bit about your project.
          </p>
        </div>
      )}
      <div className={cn("grid sm:grid-cols-2", fieldGap)}>
        <div>
          <Label htmlFor="name" className={labelClass}>
            Name
          </Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            maxLength={80}
            className={inputClass}
          />
        </div>
        <div>
          <Label htmlFor="phone" className={labelClass}>
            Phone
          </Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            maxLength={30}
            className={inputClass}
          />
        </div>
        <div>
          <Label htmlFor="email" className={labelClass}>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            maxLength={255}
            className={inputClass}
          />
        </div>
        <div>
          <Label htmlFor="address" className={labelClass}>
            Address
          </Label>
          <Input
            id="address"
            value={form.address}
            onChange={(e) => onChange("address", e.target.value)}
            maxLength={180}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="service" className={labelClass}>
            Service
          </Label>
          <Select value={form.service} onValueChange={(v) => onChange("service", v)}>
            <SelectTrigger id="service" className={inputClass}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {QUOTE_SERVICES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message" className={labelClass}>
            Project details (optional)
          </Label>
          <Textarea
            id="message"
            value={form.message}
            onChange={(e) => onChange("message", e.target.value)}
            rows={compact ? 1 : 4}
            maxLength={1000}
            className={compact ? "min-h-[48px] rounded-[14px]" : undefined}
          />
        </div>
      </div>
      <Button
        type="submit"
        className={cn("w-full", compact ? "mt-2 h-9" : "mt-4")}
        size={compact ? "default" : "lg"}
      >
        Open Email App
      </Button>
    </form>
  );
}

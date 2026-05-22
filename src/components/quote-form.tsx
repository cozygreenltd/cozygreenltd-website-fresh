import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().max(1000).optional(),
});

const SERVICES = [
  "Lawn Maintenance",
  "Garden Design",
  "Tree Trimming",
  "Outdoor Lighting",
  "Hardscaping",
  "Yard Cleanups",
  "Other",
];

export function QuoteForm({
  variant = "card",
  defaultService,
}: {
  variant?: "card" | "plain";
  defaultService?: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService ?? "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks! We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", phone: "", service: defaultService ?? "", message: "" });
    }, 700);
  };

  const wrapper =
    variant === "card"
      ? "bg-card text-card-foreground rounded-2xl shadow-xl border border-border p-6 sm:p-7"
      : "";

  return (
    <form onSubmit={submit} className={wrapper}>
      {variant === "card" && (
        <div className="mb-4">
          <h3 className="text-xl font-bold">Get a Free Quote</h3>
          <p className="text-sm text-muted-foreground">Tell us a bit about your project.</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => onChange("name", e.target.value)} maxLength={80} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} maxLength={30} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} maxLength={255} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="service">Service</Label>
          <Select value={form.service} onValueChange={(v) => onChange("service", v)}>
            <SelectTrigger id="service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Project details (optional)</Label>
          <Textarea
            id="message"
            value={form.message}
            onChange={(e) => onChange("message", e.target.value)}
            rows={4}
            maxLength={1000}
          />
        </div>
      </div>
      <Button type="submit" disabled={submitting} className="w-full mt-4" size="lg">
        {submitting ? "Sending..." : "Request My Free Quote"}
      </Button>
    </form>
  );
}
// Quote request form with validation, image uploads, and a real email submit flow.
import { useEffect, useRef, useState } from "react";
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
import { ImagePlus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedImage } from "@/components/animated-image";
import { quoteRequestSchema } from "@/lib/quote-request";

const SERVICES = [
  "Lawn Maintenance",
  "Garden Design",
  "Tree Trimming",
  "Outdoor Lighting",
  "Hardscaping",
  "Yard Cleanups",
  "Other",
];

type Attachment = {
  id: string;
  file: File;
  url: string;
};

export function QuoteForm({
  variant = "card",
  defaultService,
}: {
  variant?: "card" | "plain";
  defaultService?: string;
}) {
  // Form state stays local; the browser sends the payload directly to the API route.
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: defaultService ?? "",
    message: "",
  });
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const addFiles = (files: FileList | File[]) => {
    // Only image files are accepted, and duplicate selections are ignored by ID.
    const incoming = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!incoming.length) return;

    setAttachments((current) => {
      const currentIds = new Set(current.map((item) => item.id));
      const next = incoming
        .map((file) => ({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          url: URL.createObjectURL(file),
        }))
        .filter((item) => !currentIds.has(item.id));

      return [...current, ...next];
    });
  };

  const removeAttachment = (id: string) => {
    // Revoke the preview URL immediately so dropped images do not leak memory.
    setAttachments((current) => {
      const target = current.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return current.filter((item) => item.id !== id);
    });
  };

  useEffect(() => {
    // Clean up any active object URLs when the component unmounts or attachments change.
    return () => {
      attachments.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [attachments]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = quoteRequestSchema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const payload = new FormData();
      Object.entries(r.data).forEach(([key, value]) => {
        payload.append(key, value ?? "");
      });
      attachments.forEach((item) => {
        payload.append("attachments", item.file, item.file.name);
      });

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: payload,
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? "Failed to send your request.");
      }

      toast.success(
        attachments.length
          ? `Thanks! We'll be in touch within 24 hours. (${attachments.length} image${attachments.length === 1 ? "" : "s"} attached)`
          : "Thanks! We'll be in touch within 24 hours.",
      );
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        service: defaultService ?? "",
        message: "",
      });
      attachments.forEach((item) => URL.revokeObjectURL(item.url));
      setAttachments([]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong sending the form.",
      );
    } finally {
      setSubmitting(false);
    }
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
          <Input
            id="name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            maxLength={80}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            maxLength={30}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            maxLength={255}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="address">Project address</Label>
          <Input
            id="address"
            value={form.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Street address, city"
            maxLength={180}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="service">Service</Label>
          <Select value={form.service} onValueChange={(v) => onChange("service", v)}>
            <SelectTrigger id="service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
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
        <div className="sm:col-span-2">
          <Label>Upload photos</Label>
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
              addFiles(e.dataTransfer.files);
            }}
            className={cn(
              "mt-2 cursor-pointer rounded-2xl border border-dashed bg-muted/30 p-5 text-center transition-colors",
              dragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50",
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.currentTarget.value = "";
              }}
            />
            <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Upload className="h-5 w-5" />
              </div>
              <div className="font-medium">Drag and drop photos here</div>
              <p className="text-sm text-muted-foreground">
                or click to browse local files. PNG, JPG, WEBP supported.
              </p>
            </div>
          </div>
          {attachments.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {attachments.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card"
                >
                  <AnimatedImage
                    src={item.url}
                    alt={item.file.name}
                    className="h-28 w-full object-cover"
                    zoomDuration={9}
                  />
                  <button
                    type="button"
                    onClick={() => removeAttachment(item.id)}
                    className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white opacity-90 transition-opacity hover:opacity-100"
                    aria-label={`Remove ${item.file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 p-3">
                    <ImagePlus className="h-4 w-4 text-primary" />
                    <span className="truncate text-xs text-muted-foreground">{item.file.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button type="submit" disabled={submitting} className="w-full mt-4" size="lg">
        {submitting ? "Sending..." : "Request My Free Quote"}
      </Button>
    </form>
  );
}

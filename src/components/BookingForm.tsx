import { useEffect, useMemo, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/hooks/useTranslations";
import { DISHTRIBUTER_API_BASE, dishtributerHeaders } from "@/config/dishtributer";

const API_URL = `${DISHTRIBUTER_API_BASE}/public/bookings`;
const CONFIG_URL = `${DISHTRIBUTER_API_BASE}/public/config`;

// A reservation slot must start at least this many hours from now.
const MIN_LEAD_HOURS = 2;

type Step = "form" | "preorder" | "success";

interface FormData {
  name: string;
  date: string;
  partySize: string;
  phone: string;
  email: string;
}

// Mirror of Dishtributer's bookingConfig shape (see Dishtributer functions/src/types).
interface TimeRange {
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
}
interface BookingService {
  id: string;
  name: string;
  intervalMinutes: number;
  default: TimeRange;
  overrides?: Record<string, TimeRange | null>; // weekday -> range, or null = closed
}

interface Slot {
  time: string; // "HH:MM"
  disabled: boolean; // within the lead-time window
}
interface ServiceSlots {
  serviceId: string;
  serviceName: string;
  slots: Slot[];
}

// getDay() index (0 = Sunday) -> Dishtributer weekday key.
const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const pad = (n: number) => String(n).padStart(2, "0");

function buildServiceSlots(
  service: BookingService,
  dateStr: string,
  now: Date
): ServiceSlots {
  const [y, mo, d] = dateStr.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(y, mo - 1, d).getDay()];

  // Per-weekday override wins; an explicit null means the venue is closed.
  let range: TimeRange | null = service.default;
  if (service.overrides && weekday in service.overrides) {
    range = service.overrides[weekday];
  }

  const slots: Slot[] = [];
  if (range && service.intervalMinutes >= 1) {
    const start = toMinutes(range.startTime);
    const end = toMinutes(range.endTime);
    const leadCutoff = now.getTime() + MIN_LEAD_HOURS * 60 * 60 * 1000;

    for (let m = start; m <= end; m += service.intervalMinutes) {
      const slotDate = new Date(y, mo - 1, d, Math.floor(m / 60), m % 60);
      // Never show slots already in the past.
      if (slotDate.getTime() < now.getTime()) continue;
      slots.push({
        time: `${pad(Math.floor(m / 60))}:${pad(m % 60)}`,
        disabled: slotDate.getTime() < leadCutoff,
      });
    }
  }

  return { serviceId: service.id, serviceName: service.name, slots };
}

const inputClass = {
  label: "text-gray-400 text-sm pb-0.5",
  inputWrapper:
    "bg-[#262626] border border-white/10 rounded-sm shadow-none " +
    "data-[hover=true]:border-padre-primary/40 data-[focus=true]:!border-padre-primary",
  input: "placeholder:text-neutral-500",
};

export function BookingForm() {
  const { goodLabel, language } = useI18n();
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    date: "",
    partySize: "",
    phone: "",
    email: "",
  });

  const [services, setServices] = useState<BookingService[]>([]);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const isLargeGroup = Number(form.partySize) > 6;

  // Pull the venue's booking config (services / opening windows) once.
  useEffect(() => {
    fetch(CONFIG_URL, { headers: dishtributerHeaders })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const list = data?.bookingConfig?.services;
        if (Array.isArray(list)) setServices(list);
      })
      .catch(() => {
        /* non-fatal: time picker simply won't show */
      })
      .finally(() => setConfigLoaded(true));
  }, []);

  // Recompute available slots whenever the chosen date (or config) changes.
  const serviceSlots = useMemo(() => {
    if (!form.date || services.length === 0) return [];
    const now = new Date();
    return services
      .map((s) => buildServiceSlots(s, form.date, now))
      .filter((g) => g.slots.length > 0);
  }, [form.date, services]);

  const hasConfiguredServices = services.length > 0;
  const hasAnySlots = serviceSlots.length > 0;

  const setField =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setError(null);
      // Changing the date invalidates any previously picked slot.
      if (field === "date") {
        setSelectedTime("");
        setSelectedServiceId("");
      }
    };

  const selectSlot = (serviceId: string, time: string) => {
    setSelectedServiceId(serviceId);
    setSelectedTime(time);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.date ||
      !form.partySize ||
      !form.phone.trim() ||
      !form.email.trim()
    ) {
      setError(goodLabel("booking_error_required"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError(goodLabel("booking_error_email"));
      return;
    }
    // A time is required only when slots are actually offered for the date.
    if (hasAnySlots && !selectedTime) {
      setError(goodLabel("booking_error_required"));
      return;
    }
    if (isLargeGroup) {
      setStep("preorder");
    } else {
      submit(false);
    }
  };

  const submit = async (enablePreOrder: boolean) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: dishtributerHeaders,
        body: JSON.stringify({
          bookingName: form.name.trim(),
          bookingDate: form.date,
          partySize: Number(form.partySize),
          phone: form.phone.trim(),
          email: form.email.trim(),
          ...(selectedTime && { bookingTime: selectedTime }),
          ...(selectedServiceId && { serviceId: selectedServiceId }),
          enablePreOrder,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || goodLabel("booking_error_generic"));
      }
      setStep("success");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : goodLabel("booking_error_generic")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const locale =
    language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : "en-GB";
  const formattedDate = form.date
    ? new Date(form.date + "T12:00:00").toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <p className="text-padre-primary text-xs uppercase tracking-[0.2em] font-bold font-lato">
                {goodLabel("booking_name_prefix")}
              </p>
              <Input
                aria-label={goodLabel("booking_name_prefix")}
                placeholder={goodLabel("booking_name_placeholder")}
                value={form.name}
                onChange={setField("name")}
                classNames={{
                  ...inputClass,
                  input: "text-lg font-cormorant placeholder:text-neutral-500",
                }}
                autoFocus
              />
            </div>

            <div className="w-full h-px bg-white/5" />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label={goodLabel("booking_date_label")}
                type="date"
                min={today}
                value={form.date}
                onChange={setField("date")}
                classNames={inputClass}
              />
              <Input
                label={goodLabel("booking_party_size_label")}
                type="number"
                inputMode="numeric"
                min="1"
                max="50"
                placeholder="2"
                value={form.partySize}
                onChange={setField("partySize")}
                classNames={inputClass}
              />
            </div>

            {/* Time slots, driven by the venue's bookingConfig */}
            {hasConfiguredServices && (
              <div className="flex flex-col gap-3">
                <p className="text-gray-400 text-sm">
                  {goodLabel("booking_time_label")}
                </p>

                {!form.date ? (
                  <p className="text-neutral-500 text-sm font-lato italic">
                    {goodLabel("booking_time_hint")}
                  </p>
                ) : !configLoaded ? (
                  <p className="text-neutral-500 text-sm font-lato italic">
                    {goodLabel("booking_time_loading")}
                  </p>
                ) : !hasAnySlots ? (
                  <p className="text-neutral-500 text-sm font-lato italic">
                    {goodLabel("booking_time_none")}
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {serviceSlots.map((group) => (
                      <div key={group.serviceId} className="flex flex-col gap-2">
                        <p className="text-padre-primary text-[11px] uppercase tracking-[0.15em] font-bold font-lato">
                          {group.serviceName}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {group.slots.map((slot) => {
                            const isSelected =
                              selectedServiceId === group.serviceId &&
                              selectedTime === slot.time;
                            return (
                              <button
                                key={`${group.serviceId}-${slot.time}`}
                                type="button"
                                disabled={slot.disabled}
                                onClick={() =>
                                  selectSlot(group.serviceId, slot.time)
                                }
                                className={`px-3 py-1.5 text-sm font-lato rounded-sm border transition-colors ${
                                  slot.disabled
                                    ? "bg-transparent text-neutral-600 border-white/5 line-through cursor-not-allowed"
                                    : isSelected
                                      ? "bg-[#c59d5f] text-black border-[#c59d5f] font-bold"
                                      : "bg-[#262626] text-white border-white/10 hover:border-padre-primary/50"
                                }`}
                              >
                                {slot.time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Input
              label={goodLabel("booking_phone_label")}
              type="tel"
              placeholder="06 00 00 00 00"
              value={form.phone}
              onChange={setField("phone")}
              classNames={inputClass}
            />

            <Input
              label={goodLabel("booking_email_label")}
              type="email"
              value={form.email}
              onChange={setField("email")}
              classNames={inputClass}
            />

            {error && (
              <p className="text-red-400 text-sm font-lato">{error}</p>
            )}

            <Button
              type="submit"
              className="mt-1 h-12 bg-[#c59d5f] text-black font-bold uppercase tracking-[0.2em] text-sm rounded-sm hover:bg-white transition-colors"
              isLoading={submitting}
            >
              {submitting
                ? goodLabel("booking_loading")
                : goodLabel("booking_submit")}
            </Button>
          </motion.form>
        )}

        {step === "preorder" && (
          <motion.div
            key="preorder"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-8 text-center py-4"
          >
            <div className="w-16 h-16 rounded-full bg-padre-primary/10 border border-padre-primary/30 flex items-center justify-center text-padre-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-cormorant text-3xl text-white">
                {goodLabel("booking_preorder_title")}
              </h3>
              <p className="font-lato text-gray-400 text-base leading-relaxed max-w-xs mx-auto">
                {goodLabel("booking_preorder_desc")}
              </p>
            </div>

            {error && (
              <p className="text-red-400 text-sm font-lato">{error}</p>
            )}

            <div className="flex flex-col gap-3 w-full">
              <Button
                className="h-12 bg-[#c59d5f] text-black font-bold uppercase tracking-[0.2em] text-sm rounded-sm hover:bg-white transition-colors"
                onPress={() => submit(true)}
                isLoading={submitting}
              >
                {goodLabel("booking_preorder_yes")}
              </Button>
              <Button
                variant="bordered"
                className="h-12 border-white/10 text-gray-400 hover:border-white/30 hover:text-white text-sm uppercase tracking-[0.15em] rounded-sm transition-colors"
                onPress={() => submit(false)}
                isDisabled={submitting}
              >
                {goodLabel("booking_preorder_no")}
              </Button>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-8 text-center py-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 180,
                damping: 15,
              }}
              className="w-20 h-20 rounded-full bg-padre-primary/10 border-2 border-padre-primary flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-padre-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <div className="flex flex-col gap-3">
              <h3 className="font-cormorant text-4xl text-white">
                {goodLabel("booking_success_title")}
              </h3>
              <p className="font-lato text-gray-400 text-base leading-relaxed max-w-xs mx-auto">
                {goodLabel("booking_success_message")}
              </p>
            </div>

            <div className="w-full bg-[#262626] border border-white/5 rounded-sm p-6 text-left flex flex-col gap-3">
              <p className="text-padre-primary text-xs uppercase tracking-[0.2em] font-bold font-lato mb-1">
                {goodLabel("booking_success_details")}
              </p>
              {[
                {
                  key: "name",
                  label: goodLabel("booking_name_prefix"),
                  value: form.name,
                },
                {
                  key: "date",
                  label: goodLabel("booking_date_label"),
                  value: formattedDate,
                },
                ...(selectedTime
                  ? [
                      {
                        key: "time",
                        label: goodLabel("booking_time_label"),
                        value: selectedTime,
                      },
                    ]
                  : []),
                {
                  key: "size",
                  label: goodLabel("booking_party_size_label"),
                  value: form.partySize,
                },
                {
                  key: "phone",
                  label: goodLabel("booking_phone_label"),
                  value: form.phone,
                },
              ].map(({ key, label, value }) => (
                <div
                  key={key}
                  className="flex justify-between font-lato text-sm gap-4"
                >
                  <span className="text-gray-500 shrink-0">{label}</span>
                  <span className="text-white font-medium text-right capitalize">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/hooks/useTranslations";
import {
  DISHTRIBUTER_API_BASE,
  dishtributerHeaders,
} from "@/config/dishtributer";

const CONFIG_URL = `${DISHTRIBUTER_API_BASE}/public/config`;
const REVIEWS_URL = `${DISHTRIBUTER_API_BASE}/public/reviews`;

// Ratings at or above this threshold are routed to the public Google page;
// anything below is captured privately.
const POSITIVE_THRESHOLD = 4;

type Step = "rate" | "redirecting" | "feedback" | "thanks";

const inputClass = {
  label: "text-gray-400 text-sm pb-0.5",
  inputWrapper:
    "bg-[#262626] border border-white/10 rounded-sm shadow-none " +
    "data-[hover=true]:border-padre-primary/40 data-[focus=true]:!border-padre-primary",
  input: "placeholder:text-neutral-500",
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-150 ${
        filled ? "text-padre-primary" : "text-white/15"
      }`}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinejoin="round"
    >
      <path d="M12 2.5l2.9 6.18 6.6.79-4.9 4.6 1.3 6.73L12 17.77l-5.9 3.03 1.3-6.73-4.9-4.6 6.6-.79z" />
    </svg>
  );
}

export default function ReviewsPage() {
  const { goodLabel } = useI18n();
  const [step, setStep] = useState<Step>("rate");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [googleUrl, setGoogleUrl] = useState<string | null>(null);

  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fetch the Google review link on mount so a positive rating redirects instantly.
  useEffect(() => {
    fetch(CONFIG_URL, { headers: dishtributerHeaders })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const url = data?.reviewsConfig?.googleReviewUrl;
        if (url) setGoogleUrl(url);
      })
      .catch(() => {
        /* non-fatal: handled at redirect time */
      });
  }, []);

  const selectRating = (value: number) => {
    setRating(value);
    if (value >= POSITIVE_THRESHOLD) {
      if (googleUrl) {
        setStep("redirecting");
        setTimeout(() => window.location.assign(googleUrl), 900);
      } else {
        // No Google link configured — fall back to a graceful thank-you.
        setStep("thanks");
      }
    } else {
      setStep("feedback");
    }
  };

  const submitFeedback = async () => {
    if (!text.trim()) {
      setError(goodLabel("review_error_required"));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(REVIEWS_URL, {
        method: "POST",
        headers: dishtributerHeaders,
        body: JSON.stringify({
          starCount: rating,
          text: text.trim(),
          ...(email.trim() && { customerEmail: email.trim() }),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || goodLabel("booking_error_generic"));
      }
      setStep("thanks");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : goodLabel("booking_error_generic")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-padre-background flex items-center justify-center px-5 py-12 bg-[url('/bg.png')] bg-cover bg-center bg-fixed">
      <SEO
        title={goodLabel("seo_reviews_title")}
        description={goodLabel("seo_reviews_description")}
      />
      <div className="absolute inset-0 bg-black/80" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-sm shadow-2xl px-7 py-10 sm:px-10"
      >
        <div className="flex justify-center mb-8 scale-90">
          <Logo color="#c59d5f" />
        </div>

        <AnimatePresence mode="wait">
          {step === "rate" && (
            <motion.div
              key="rate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <h1 className="font-cormorant text-3xl sm:text-4xl text-white">
                {goodLabel("review_prompt_title")}
              </h1>
              <p className="font-lato text-gray-400 text-base mb-4">
                {goodLabel("review_prompt_subtitle")}
              </p>
              <div
                className="flex gap-2"
                onMouseLeave={() => setHovered(0)}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`${value} / 5`}
                    onMouseEnter={() => setHovered(value)}
                    onClick={() => selectRating(value)}
                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star filled={value <= (hovered || rating)} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "redirecting" && (
            <motion.div
              key="redirecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-5 text-center py-6"
            >
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Star key={v} filled={v <= rating} />
                ))}
              </div>
              <p className="font-lato text-gray-300 text-lg">
                {goodLabel("review_redirecting")}
              </p>
            </motion.div>
          )}

          {step === "feedback" && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-5"
            >
              <div className="text-center flex flex-col gap-2">
                <h1 className="font-cormorant text-3xl text-white">
                  {goodLabel("review_feedback_title")}
                </h1>
                <p className="font-lato text-gray-400 text-sm">
                  {goodLabel("review_feedback_subtitle")}
                </p>
              </div>

              <Textarea
                aria-label={goodLabel("review_feedback_title")}
                placeholder={goodLabel("review_feedback_placeholder")}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError(null);
                }}
                minRows={4}
                classNames={inputClass}
                autoFocus
              />

              <Input
                label={goodLabel("review_feedback_email")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                classNames={inputClass}
              />

              {error && (
                <p className="text-red-400 text-sm font-lato">{error}</p>
              )}

              <Button
                className="h-12 bg-[#c59d5f] text-black font-bold uppercase tracking-[0.2em] text-sm rounded-sm hover:bg-white transition-colors"
                onPress={submitFeedback}
                isLoading={submitting}
              >
                {submitting
                  ? goodLabel("review_feedback_sending")
                  : goodLabel("review_feedback_submit")}
              </Button>
            </motion.div>
          )}

          {step === "thanks" && (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-6 text-center py-4"
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
                <h1 className="font-cormorant text-3xl sm:text-4xl text-white">
                  {goodLabel("review_thanks_title")}
                </h1>
                <p className="font-lato text-gray-400 text-base leading-relaxed max-w-xs mx-auto">
                  {goodLabel("review_thanks_message")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

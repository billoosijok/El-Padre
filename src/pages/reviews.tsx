import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
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
const POSITIVE_THRESHOLD = 5;

type Step = "rate" | "redirecting" | "feedback" | "thanks";

const inputClass = {
  label: "text-gray-400 text-sm pb-0.5",
  inputWrapper:
    "bg-[#262626] border border-white/10 rounded-sm shadow-none " +
    "data-[hover=true]:border-padre-primary/40 data-[focus=true]:!border-padre-primary",
  input: "placeholder:text-neutral-500",
};

function Star({ filled, isFiveStar }: { filled: boolean; isFiveStar?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-12 h-12 sm:w-14 sm:h-14 transition-all duration-150 ${
        filled
          ? isFiveStar
            ? "text-padre-primary drop-shadow-[0_0_10px_rgba(197,157,95,0.7)] scale-105"
            : "text-padre-primary"
          : "text-white/15"
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
  const [googleUrl, setGoogleUrl] = useState<string>("https://g.page/r/CfG_i_X8_g2JEBM/review");
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStar = hovered || rating;

  // Pre-fetch the Google review link on mount so a positive rating redirects instantly.
  useEffect(() => {
    fetch(CONFIG_URL, { headers: dishtributerHeaders })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const url = data?.reviewsConfig?.googleReviewUrl;
        if (url) setGoogleUrl(url);
      })
      .catch((err) => {
        console.error("Failed to load config, using default redirect:", err);
      })
      .finally(() => {
        setIsConfigLoading(false);
      });
  }, []);

  const selectRating = (value: number) => {
    setRating(value);
    if (value >= POSITIVE_THRESHOLD) {
      const urlToUse = googleUrl || "https://g.page/r/CfG_i_X8_g2JEBM/review";
      setStep("redirecting");
      setTimeout(() => window.location.assign(urlToUse), 900);
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
        noindex={true}
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
          {isConfigLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <Spinner color="warning" size="lg" />
            </motion.div>
          )}

          {!isConfigLoading && step === "rate" && (
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
              <p className="font-lato text-gray-400 text-base mb-2">
                {goodLabel("review_prompt_subtitle")}
              </p>
              <div
                className="w-full max-w-sm flex flex-col items-center mt-2"
                onMouseLeave={() => setHovered(0)}
              >
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-label={`${value} / 5`}
                      onMouseEnter={() => setHovered(value)}
                      onClick={() => selectRating(value)}
                      className="p-1 flex justify-center items-center hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        filled={value <= currentStar}
                        isFiveStar={value === 5 && currentStar === 5}
                      />
                    </button>
                  ))}
                </div>

                {/* Labels directly under the stars */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full text-center font-lato text-[11px] sm:text-xs mt-2.5">
                  <div className="col-span-3 flex flex-col items-center justify-center px-1">
                    <div className="w-full flex items-center gap-1.5 text-rose-400/90 font-medium">
                      <div className="h-[1px] flex-1 bg-rose-400/40 relative">
                        <div className="absolute left-0 -top-1 w-[1px] h-2.5 bg-rose-400/60" />
                      </div>
                      <span className="shrink-0 leading-none">
                        {goodLabel("review_label_1to3star")}
                      </span>
                      <div className="h-[1px] flex-1 bg-rose-400/40 relative">
                        <div className="absolute right-0 -top-1 w-[1px] h-2.5 bg-rose-400/60" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 text-amber-400/90 font-medium px-0.5 flex items-center justify-center">
                    {goodLabel("review_label_4star")}
                  </div>
                  <div className="col-span-1 text-emerald-400 font-semibold px-0.5 flex items-center justify-center">
                    {goodLabel("review_label_5star")}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!isConfigLoading && step === "redirecting" && (
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
                  <Star key={v} filled={v <= rating} isFiveStar={v === 5} />
                ))}
              </div>
              <p className="font-lato text-gray-300 text-lg">
                {goodLabel("review_redirecting")}
              </p>
            </motion.div>
          )}

          {!isConfigLoading && step === "feedback" && (
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
                  {rating === 4
                    ? goodLabel("review_feedback_subtitle_4star")
                    : goodLabel("review_feedback_subtitle_1to3star")}
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

              <button
                type="button"
                onClick={() => setStep("rate")}
                className="self-center text-sm font-bold uppercase tracking-[0.2em] font-lato text-gray-400 hover:text-white transition-colors focus:outline-none flex items-center justify-center gap-2 py-1 mt-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-padre-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span>{goodLabel("review_feedback_back")}</span>
              </button>
            </motion.div>
          )}

          {!isConfigLoading && step === "thanks" && (
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

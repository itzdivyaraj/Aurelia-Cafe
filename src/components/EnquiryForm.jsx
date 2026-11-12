import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function EnquiryForm({ selectedEnquiryType }) {
  const { enquiry, contact } = useSiteConfig();
  const today = useMemo(() => getTodayDateString(), []);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    enquiryType: enquiry.types[0] || 'Table Reservation',
    preferredDate: today,
    guests: '2',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    state: 'idle', // 'idle' | 'submitting' | 'success' | 'demo' | 'error'
    message: '',
  });

  useEffect(() => {
    if (selectedEnquiryType && enquiry.types.includes(selectedEnquiryType)) {
      setFormData((prev) => ({ ...prev, enquiryType: selectedEnquiryType }));
    }
  }, [selectedEnquiryType, enquiry.types]);

  const validate = (values) => {
    const nextErrors = {};

    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const digitsOnly = values.phone.replace(/[\s\-().+]/g, '');
    if (!digitsOnly) {
      nextErrors.phone = 'Please enter a valid phone number.';
    } else if (!/^\d{10,15}$/.test(digitsOnly)) {
      nextErrors.phone = 'Phone number must contain 10 to 15 digits.';
    }

    const emailTrimmed = values.email.trim();
    if (enquiry.requireEmail && !emailTrimmed) {
      nextErrors.email = 'Please enter your email address.';
    } else if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!values.preferredDate) {
      nextErrors.preferredDate = 'Please choose a preferred date.';
    } else if (values.preferredDate < today) {
      nextErrors.preferredDate = 'Preferred date cannot be in the past.';
    }

    const guestNum = Number(values.guests);
    if (!values.guests || Number.isNaN(guestNum) || guestNum < 1 || guestNum > 100) {
      nextErrors.guests = 'Please enter between 1 and 100 guests.';
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    if (status.state !== 'idle') {
      setStatus({ state: 'idle', message: '' });
    }
  };

  const buildWhatsappSummaryUrl = () => {
    const cleanNumber = contact.whatsappNumber.replace(/[^\d]/g, '');
    const summary = [
      `Hello ${contact.shortName || 'Team'}! I would like to submit an enquiry:`,
      `• Name: ${formData.fullName}`,
      `• Type: ${formData.enquiryType}`,
      `• Date: ${formData.preferredDate}`,
      `• Guests: ${formData.guests}`,
      `• Phone: ${formData.phone}`,
      formData.email ? `• Email: ${formData.email}` : null,
      formData.message ? `• Notes: ${formData.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(summary)}`;
  };

  const buildMailtoUrl = () => {
    const subject = `${formData.enquiryType} — ${formData.fullName} (${formData.preferredDate})`;
    const body = [
      `Name: ${formData.fullName}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email || 'Not provided'}`,
      `Enquiry Type: ${formData.enquiryType}`,
      `Preferred Date: ${formData.preferredDate}`,
      `Number of Guests: ${formData.guests}`,
      `Message: ${formData.message || 'None'}`,
    ].join('\n');

    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Honest demo mode when no backend endpoint is configured
    if (!enquiry.apiEndpoint) {
      setStatus({
        state: 'demo',
        message:
          'Frontend Demo Mode: No backend endpoint is configured yet, so this enquiry has NOT actually been sent. Configure siteConfig.enquiry.apiEndpoint (e.g., your FastAPI endpoint) to enable live submissions, or send your details directly via WhatsApp or Email below.',
      });
      return;
    }

    setStatus({ state: 'submitting', message: '' });

    try {
      const response = await fetch(enquiry.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          enquiry_type: formData.enquiryType,
          preferred_date: formData.preferredDate,
          guests: Number(formData.guests),
          message: formData.message.trim() || null,
        }),
      });

      if (!response.ok) {
        let errorDetail = `Server responded with status ${response.status}.`;
        try {
          const payload = await response.json();
          if (payload?.detail) {
            errorDetail =
              typeof payload.detail === 'string'
                ? payload.detail
                : 'Please verify your details and try again.';
          }
        } catch {
          // Ignore non-JSON error body
        }
        throw new Error(errorDetail);
      }

      setStatus({
        state: 'success',
        message:
          'Thank you! Your enquiry has been received by our team. We will confirm your reservation shortly.',
      });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        enquiryType: enquiry.types[0] || 'Table Reservation',
        preferredDate: today,
        guests: '2',
        message: '',
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message:
          error?.message ||
          'We could not submit your request right now. Please try again or reach us directly on WhatsApp or phone.',
      });
    }
  };

  const inputBaseClass = (hasError) =>
    `mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)] transition-colors placeholder:text-[var(--color-text-secondary)]/60 ${
      hasError
        ? 'border-rose-600 focus:border-rose-700'
        : 'border-[#2C211B]/15 focus:border-[var(--color-accent)]'
    }`;

  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      className="bg-[var(--color-bg-primary)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Context Column */}
          <Reveal className="lg:col-span-5">
            <div id="enquiry-heading">
              <SectionHeader
                eyebrow={enquiry.eyebrow}
                title={enquiry.title}
                description={enquiry.description}
                align="left"
              />
            </div>

            <div className="mt-8 space-y-4 rounded-2xl border border-[#2C211B]/10 bg-[var(--color-bg-secondary)] p-6">
              <h3 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
                Ideal for Every Gathering
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--color-text-secondary)]">
                <li>• Cozy morning coffee tables &amp; sunlit brunch seating</li>
                <li>• Intimate birthday dinners &amp; custom celebration cakes</li>
                <li>• Private acoustic evenings &amp; creative team offsites</li>
                <li>• Corporate pastry boxes &amp; bulk artisanal coffee orders</li>
              </ul>
              <p className="border-t border-[#2C211B]/10 pt-4 text-xs text-[var(--color-text-secondary)]">
                For same-day seating for 6+ guests, call us directly at{' '}
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="font-semibold text-[var(--color-accent)] underline underline-offset-2"
                >
                  {contact.phone}
                </a>
                .
              </p>
            </div>
          </Reveal>

          {/* Form Card */}
          <Reveal delay={90} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-[#2C211B]/10 bg-[var(--color-bg-secondary)] p-6 shadow-sm sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="enquiry-full-name"
                    className="block text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    Full Name <span className="text-rose-700">*</span>
                  </label>
                  <input
                    id="enquiry-full-name"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ananya Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                    className={inputBaseClass(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p id="error-fullName" role="alert" className="mt-1.5 text-xs text-rose-700">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    Phone Number <span className="text-rose-700">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    className={inputBaseClass(errors.phone)}
                  />
                  {errors.phone && (
                    <p id="error-phone" role="alert" className="mt-1.5 text-xs text-rose-700">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="block text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    Email Address{' '}
                    {enquiry.requireEmail ? (
                      <span className="text-rose-700">*</span>
                    ) : (
                      <span className="text-xs font-normal text-[var(--color-text-secondary)]">
                        (Optional)
                      </span>
                    )}
                  </label>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    required={enquiry.requireEmail}
                    autoComplete="email"
                    placeholder="ananya@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className={inputBaseClass(errors.email)}
                  />
                  {errors.email && (
                    <p id="error-email" role="alert" className="mt-1.5 text-xs text-rose-700">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Enquiry Type */}
                <div>
                  <label
                    htmlFor="enquiry-type"
                    className="block text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    Enquiry Type <span className="text-rose-700">*</span>
                  </label>
                  <select
                    id="enquiry-type"
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className={inputBaseClass(false)}
                  >
                    {enquiry.types.map((typeOption) => (
                      <option key={typeOption} value={typeOption}>
                        {typeOption}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label
                    htmlFor="enquiry-date"
                    className="block text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    Preferred Date <span className="text-rose-700">*</span>
                  </label>
                  <input
                    id="enquiry-date"
                    name="preferredDate"
                    type="date"
                    required
                    min={today}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.preferredDate)}
                    aria-describedby={errors.preferredDate ? 'error-date' : undefined}
                    className={inputBaseClass(errors.preferredDate)}
                  />
                  {errors.preferredDate && (
                    <p id="error-date" role="alert" className="mt-1.5 text-xs text-rose-700">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                {/* Number of Guests */}
                <div>
                  <label
                    htmlFor="enquiry-guests"
                    className="block text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    Number of Guests <span className="text-rose-700">*</span>
                  </label>
                  <input
                    id="enquiry-guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.guests)}
                    aria-describedby={errors.guests ? 'error-guests' : undefined}
                    className={inputBaseClass(errors.guests)}
                  />
                  {errors.guests && (
                    <p id="error-guests" role="alert" className="mt-1.5 text-xs text-rose-700">
                      {errors.guests}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mt-5">
                <label
                  htmlFor="enquiry-message"
                  className="block text-sm font-medium text-[var(--color-text-primary)]"
                >
                  Message / Special Requests
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows="4"
                  placeholder="Preferred seating (patio or indoor), preferred time slot, dietary allergies, or celebration notes..."
                  value={formData.message}
                  onChange={handleChange}
                  className={inputBaseClass(false)}
                />
              </div>

              {/* Status Feedback Regions */}
              {status.state === 'success' && (
                <div
                  role="status"
                  className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-700/25 bg-emerald-50 p-4 text-sm text-emerald-900"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  <p>{status.message}</p>
                </div>
              )}

              {status.state === 'error' && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-700/25 bg-rose-50 p-4 text-sm text-rose-900"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" />
                  <p>{status.message}</p>
                </div>
              )}

              {status.state === 'demo' && (
                <div
                  role="status"
                  className="mt-5 rounded-2xl border border-amber-700/25 bg-amber-50/90 p-4 text-sm text-amber-950"
                >
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                    <div>
                      <p className="font-semibold">Enquiry Not Sent (Demo Mode)</p>
                      <p className="mt-1 text-xs leading-relaxed text-amber-900">
                        {status.message}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        <a
                          href={buildWhatsappSummaryUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Send via WhatsApp
                        </a>
                        <a
                          href={buildMailtoUrl()}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#2C211B]/20 bg-white px-4 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[#F8F3EA]"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Send via Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status.state === 'submitting'}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status.state === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>{enquiry.submitLabel || 'Request Reservation'}</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-[var(--color-text-secondary)]">
                  {enquiry.apiEndpoint
                    ? 'Connected to live reservation API.'
                    : 'Demo mode active — connect FastAPI endpoint in siteConfig.js.'}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

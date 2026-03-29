"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Clock,
  Send,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";
import { LocationMap } from "@/components/ui/location-map";

const LinkedinIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FiverrIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h1.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.937-.517l1.41.585c-.43.858-1.195 1.353-2.347 1.353-1.748 0-2.637-1.21-2.637-2.61 0-1.4.89-2.61 2.637-2.61 1.673 0 2.466 1.21 2.466 2.61 0 .176-.03.35-.088.527zm-1.699-1.032c-.088-.487-.44-.8-.996-.8-.557 0-.908.313-.996.8h1.992zM6.65 8.817h1.527v6.036H6.65V8.817zm-3.24 2.697c.487 0 .878.264 1.054.673l1.4-.614c-.41-.976-1.327-1.553-2.453-1.553-1.635 0-2.8 1.21-2.8 2.61 0 1.4 1.165 2.61 2.8 2.61 1.126 0 2.043-.576 2.453-1.553l-1.4-.614c-.176.41-.567.673-1.054.673-.732 0-1.238-.527-1.238-1.116 0-.59.506-1.116 1.238-1.116z" />
  </svg>
);

const WhatsAppIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MailIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <Mail className={className} style={style} />
);

interface ContactMethod {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  value: string;
  href: string;
  description: string;
  color: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: MailIcon,
    title: "Email",
    value: "rennylifts@gmail.com",
    href: "mailto:rennylifts@gmail.com",
    description: "For project inquiries and collaborations",
    color: "#e07a5f",
  },
  {
    icon: LinkedinIcon,
    title: "LinkedIn",
    value: "rehandevs",
    href: "https://www.linkedin.com/in/rehandevs/",
    description: "Let's connect professionally",
    color: "#0A66C2",
  },
  {
    icon: FiverrIcon,
    title: "Fiverr",
    value: "View Profile",
    href: "https://www.fiverr.com/s/pdQZmzo",
    description: "Hire me for your next project",
    color: "#1DBF73",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    value: "+92 310 7322554",
    href: "https://wa.me/923107322554",
    description: "Quick response, direct chat",
    color: "#25D366",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.open(
      `mailto:rennylifts@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        badge="Get In Touch"
        title="Let's Work"
        titleAccent="Together"
        description="Have a project in mind? Let's discuss how I can help bring your ideas to life."
      />

      <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left - Contact Methods */}
        <div className="space-y-6">
          {/* Response time badge only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <Clock className="w-4 h-4 text-accent-secondary" />
              <span className="text-sm text-foreground-secondary">
                Response: 2-4 hours
              </span>
            </div>
          </motion.div>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card-hover p-5 group block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="p-2.5 rounded-xl transition-colors duration-300"
                      style={{ backgroundColor: `${method.color}15` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: method.color }}
                      />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-foreground-muted opacity-0 group-hover:opacity-100 group-hover:text-accent-primary transition-all duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm text-accent-primary font-medium mb-1">
                    {method.value}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {method.description}
                  </p>
                </motion.a>
              );
            })}
          </div>

          {/* Location Map with UTC+5 instead of coordinates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-4 pt-4"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-foreground-muted uppercase">
              Current Location
            </p>
            <LocationMap
              location="Gujranwala, Pakistan"
              coordinates="UTC+5"
            />
          </motion.div>
        </div>

        {/* Right - Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <form
            onSubmit={handleSubmit}
            className="glass-card p-6 md:p-8 space-y-6"
          >
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-foreground-muted">
                Fill out the form below and I&apos;ll get back to you promptly.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground-secondary mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background-elevated border border-border-subtle text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground-secondary mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background-elevated border border-border-subtle text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground-secondary mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background-elevated border border-border-subtle text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full group"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Opening Email Client...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
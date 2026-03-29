"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Paintbrush,
  Code2,
  Smartphone,
  Rocket,
  Globe,
  Wand2,
  Server,
  Database,
  Shield,
  Cloud,
  ShoppingCart,
  Bug,
} from "lucide-react";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";

const frontendServices = [
  {
    icon: Paintbrush,
    title: "Figma / PSD to Code",
    description:
      "Pixel-perfect responsive websites from any design file",
    stack: ["Figma", "PSD", "XD", "Sketch"],
  },
  {
    icon: Code2,
    title: "React / Next.js Development",
    description:
      "Interactive SPAs and server-rendered apps with modern React",
    stack: ["React", "Next.js", "TypeScript", "Redux"],
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Websites that work perfectly on every device and browser",
    stack: ["Tailwind", "Bootstrap", "CSS3", "SASS"],
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "High-converting pages optimized for speed, SEO, and results",
    stack: ["GSAP", "Framer Motion", "SEO"],
  },
  {
    icon: Globe,
    title: "WordPress / CMS",
    description:
      "Custom themes and sites your clients can manage themselves",
    stack: ["WordPress", "Elementor", "WooCommerce"],
  },
  {
    icon: Wand2,
    title: "Animations",
    description:
      "Smooth scroll effects, micro-interactions, page transitions",
    stack: ["GSAP", "Framer Motion", "Lottie"],
  },
];

const backendServices = [
  {
    icon: Server,
    title: "API Development",
    description:
      "Robust RESTful APIs and GraphQL endpoints that scale",
    stack: ["Node.js", "Express", "Python", "Django"],
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Schema design, optimization, and data management",
    stack: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
  },
  {
    icon: Shield,
    title: "Auth & Security",
    description:
      "JWT, OAuth, role-based access control, social logins",
    stack: ["Passport.js", "JWT", "OAuth 2.0", "2FA"],
  },
  {
    icon: Cloud,
    title: "Deployment",
    description:
      "CI/CD pipelines, Docker, cloud deployment, SSL setup",
    stack: ["Vercel", "AWS", "Docker", "Nginx"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "Full shopping experiences with payments and admin panels",
    stack: ["Stripe", "PayPal", "Shopify"],
  },
  {
    icon: Bug,
    title: "Bug Fixes",
    description:
      "Debugging, performance optimization, legacy code refactoring",
    stack: ["Lighthouse", "Core Web Vitals"],
  },
];

function ServiceCard({
  service,
  index,
  isInView,
  delay,
}: {
  service: (typeof frontendServices)[0];
  index: number;
  isInView: boolean;
  delay: number;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay + index * 0.08 }}
      className="glass-card-hover p-6 group cursor-default"
    >
      <div className="mb-4 p-3 w-fit rounded-xl bg-accent-primary/10 group-hover:bg-accent-primary/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-accent-primary" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-accent-primary transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
        {service.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {service.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-[11px] rounded-md bg-background-elevated/80 text-foreground-muted border border-border-subtle/50"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="services" className="bg-background-secondary/30">
      <SectionHeading
        badge="Services"
        title="What I"
        titleAccent="Offer"
        description="From concept to deployment — end-to-end development services tailored to bring your vision to life."
      />

      <div ref={ref} className="space-y-16">
        {/* Frontend */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="line-accent" />
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Front-End
            </h3>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {frontendServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isInView={isInView}
                delay={0.1}
              />
            ))}
          </div>
        </div>

        {/* Backend */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-gradient-to-r from-accent-tertiary to-accent-secondary" />
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Back-End
            </h3>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {backendServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isInView={isInView}
                delay={0.6}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
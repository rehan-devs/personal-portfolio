"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

interface SocialIconsProps {
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

// Custom SVG Icons (Lucide renamed these)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FiverrIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h1.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.937-.517l1.41.585c-.43.858-1.195 1.353-2.347 1.353-1.748 0-2.637-1.21-2.637-2.61 0-1.4.89-2.61 2.637-2.61 1.673 0 2.466 1.21 2.466 2.61 0 .176-.03.35-.088.527zm-1.699-1.032c-.088-.487-.44-.8-.996-.8-.557 0-.908.313-.996.8h1.992zM6.65 8.817h1.527v6.036H6.65V8.817zm-3.24 2.697c.487 0 .878.264 1.054.673l1.4-.614c-.41-.976-1.327-1.553-2.453-1.553-1.635 0-2.8 1.21-2.8 2.61 0 1.4 1.165 2.61 2.8 2.61 1.126 0 2.043-.576 2.453-1.553l-1.4-.614c-.176.41-.567.673-1.054.673-.732 0-1.238-.527-1.238-1.116 0-.59.506-1.116 1.238-1.116z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function SocialIcons({
  size = "md",
  showLabels = false,
}: SocialIconsProps) {
  const sizeClasses = {
    sm: "h-9 w-9",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const links = [
    {
      href: "https://github.com/rehan-devs",
      icon: GithubIcon,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/rehandevs/",
      icon: LinkedinIcon,
      label: "LinkedIn",
    },
    {
      href: "mailto:rennylifts@gmail.com",
      icon: Mail,
      label: "Email",
    },
    {
      href: "https://www.fiverr.com/s/pdQZmzo",
      icon: FiverrIcon,
      label: "Fiverr",
    },
    {
      href: "https://wa.me/923107322554",
      icon: WhatsAppIcon,
      label: "WhatsApp",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {links.map((link, index) => (
        <motion.div
          key={link.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              asChild
              className={`${sizeClasses[size]} rounded-xl border-border-subtle bg-background-card hover:bg-background-elevated hover:border-accent-primary hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/10`}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <link.icon className={iconSizes[size]} />
              </a>
            </Button>
            {showLabels && (
              <span className="text-xs text-foreground-muted">
                {link.label}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
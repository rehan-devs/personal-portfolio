"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";

interface TechItem {
  name: string;
  color: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    title: "Languages",
    items: [
      { name: "HTML5", color: "#E34F26" },
      { name: "CSS3", color: "#1572B6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Python", color: "#3776AB" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#ffffff" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Bootstrap", color: "#7952B3" },
      { name: "Django", color: "#092E20" },
      { name: "Flask", color: "#ffffff" },
      { name: "Express.js", color: "#ffffff" },
    ],
  },
  {
    title: "Databases & Backend",
    items: [
      { name: "MongoDB", color: "#47A248" },
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "MySQL", color: "#4479A1" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "Node.js", color: "#339933" },
      { name: "Prisma", color: "#2D3748" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git", color: "#F05032" },
      { name: "GitHub", color: "#ffffff" },
      { name: "VS Code", color: "#007ACC" },
      { name: "Figma", color: "#F24E1E" },
      { name: "WordPress", color: "#21759B" },
      { name: "Vercel", color: "#ffffff" },
      { name: "Docker", color: "#2496ED" },
    ],
  },
  {
    title: "DevOps & Deployment",
    items: [
      { name: "Docker", color: "#2496ED" },
      { name: "Nginx", color: "#009639" },
      { name: "AWS", color: "#FF9900" },
      { name: "GitHub Actions", color: "#2088FF" },
      { name: "Netlify", color: "#00C7B7" },
      { name: "CI/CD", color: "#e07a5f" },
    ],
  },
  {
    title: "Animation Libraries",
    items: [
      { name: "GSAP", color: "#88CE02" },
      { name: "Framer Motion", color: "#FF0055" },
      { name: "Lottie", color: "#00DDB3" },
      { name: "CSS Animations", color: "#1572B6" },
    ],
  },
];

function TechPill({
  item,
  index,
  isInView,
  categoryIndex,
}: {
  item: TechItem;
  index: number;
  isInView: boolean;
  categoryIndex: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.4,
        delay: categoryIndex * 0.1 + index * 0.05,
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background-card border border-border-subtle hover:border-border-accent transition-all duration-300 cursor-default"
    >
      <div
        className="w-3 h-3 rounded-full shrink-0 group-hover:scale-125 transition-transform duration-300"
        style={{ backgroundColor: item.color, opacity: 0.8 }}
      />
      <span className="text-sm font-medium text-foreground-secondary group-hover:text-foreground transition-colors duration-300">
        {item.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="techstack">
      <SectionHeading
        badge="Tech Stack"
        title="Tools &"
        titleAccent="Technologies"
        description="The technologies I use to bring ideas to life — carefully chosen for performance, scalability, and developer experience."
      />

      <div ref={ref} className="space-y-10">
        {techCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          >
            <h3 className="font-heading text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.items.map((item, index) => (
                <TechPill
                  key={item.name + categoryIndex}
                  item={item}
                  index={index}
                  isInView={isInView}
                  categoryIndex={categoryIndex}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
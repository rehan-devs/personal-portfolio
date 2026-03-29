"use client";

import SectionWrapper from "@/components/ui/section-wrapper";
import SectionHeading from "@/components/ui/section-heading";
import ProjectCardStack from "@/components/ui/project-card-stack";

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="bg-background-secondary/30">
      <SectionHeading
        badge="Portfolio"
        title="Featured"
        titleAccent="Projects"
        description="A curated selection of projects that showcase my skills in design, development, and problem-solving."
      />

      <ProjectCardStack />
    </SectionWrapper>
  );
}
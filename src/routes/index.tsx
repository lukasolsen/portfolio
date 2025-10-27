import { motion } from "framer-motion";
import { Projects } from "@/core/components/projects";
import {
  WorkExperience,
  type ExperienceItem,
} from "@/core/components/work-experience";
import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Header3, LeadText, Paragraph } from "@/components/typography";
import { dyplinkAiProject } from "@/data/dyplink-ai";
import type { Project } from "@/data";
import { backrandProject } from "@/data/backrand";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const workExperiences: Array<ExperienceItem> = [
    {
      title: "Lærling Fullstack Utvikler",
      details: "Fulltid • Hamar",
      period: "August 2024 - Pågående",
      company: "Dyplink",
      logo: "https://dyplink.no/wp-content/uploads/2022/06/dyplink-top-white-text-outlined.svg",
      description:
        "Utvikler og vedlikeholder tjenester ved hjelp av moderne teknologier som React, Node.js og PHP. Fokuserer på å forbedre eksisterende løsninger og levere verdi til kundene gjennom god kode og struktur.",
      seeMoreLabel: "Les mer om min tid hos Dyplink",
      seeMoreLink: "https://dyplink.no",
    },
  ];

  const projects: Array<Project> = [dyplinkAiProject, backrandProject];

  return (
    <div className="content mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* --- Hero Section --- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-16 md:pt-20"
      >
        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-semibold tracking-tight mb-3">
          Lukas Olsen <span className="text-primary">👋</span>
        </h1>
        <LeadText>
          Norsk utvikler som bygger produkter og tjenester — fra små idéer til
          skalerbare systemer.
        </LeadText>
      </motion.section>
      <Separator className="my-10 opacity-60" />
      {/* --- About Section --- */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Header3 className="mb-1">Om meg</Header3>
        <Paragraph>
          Mitt navn er <strong>Lukas Moe Olsen</strong>, og jeg er en norsk
          utvikler som liker å bygge alt av produkter og tjenester. Jeg startet
          karrieren min i slutten av 2022, da jeg begynte på{" "}
          <a
            href="https://www.hamar-katedral.vgs.no/hovedmeny/utdanningstilbud/informasjonsteknologi-og-medieproduksjon/"
            className="underline underline-offset-2 hover:text-primary transition-colors"
            target="_blank"
          >
            2INF
          </a>{" "}
          ved Hamar Katedralskole. Nå jobber jeg som lærling i{" "}
          <a
            href="https://dyplink.no"
            className="underline underline-offset-2 hover:text-primary transition-colors"
            target="_blank"
          >
            Dyplink AS
          </a>
          , hvor jeg lærer faget i praksis – fra prosjektledelse til fullstack
          utvikling av kritiske systemer.
        </Paragraph>
      </motion.section>
      <Separator className="my-10 opacity-60" />
      {/* --- Work Experience --- */}
      <motion.section
        id="work-experience"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Header3 className="mb-1">Jobberfaring</Header3>
        <WorkExperience experience={workExperiences} />
      </motion.section>
      <Separator className="my-10 opacity-60" />
      {/* --- Projects Section --- */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Header3 className="mb-1">Prosjekter</Header3>
        <Projects projects={projects} />
      </motion.section>

      {/* --- Contact Section --- */}
      <Separator className="my-10 opacity-60" />
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <Header3 className="mb-1">Kontakt</Header3>
        <Paragraph>
          Jeg er alltid åpen for nye muligheter og samarbeid. Ta gjerne kontakt
          med meg hvis du har et spennende prosjekt eller bare vil si hei!
        </Paragraph>
        <a
          href="mailto:lukmarwil@gmail.com"
          className="inline-block mt-2 text-sm font-medium text-primary underline"
        >
          Send meg en e-post
        </a>
      </motion.section>
    </div>
  );
}

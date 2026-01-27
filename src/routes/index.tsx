import { motion } from "framer-motion";
import { Projects } from "@/core/components/projects";
import { WorkExperience } from "@/core/components/work-experience";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import {
  Header3,
  LeadText,
  Paragraph,
} from "@/components/typography/typography";
import { useTranslation } from "@/hooks/use-translation";
import { getWorkExperience } from "@/data/work-experience.server";

export const Route = createFileRoute("/")({
  loader: async () => {
    const workExperiences = await getWorkExperience();
    return { workExperiences };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const { workExperiences } = useLoaderData({
    from: Route.id,
  });

  return (
    <div className="content mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-16 md:pt-20"
      >
        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-semibold tracking-tight mb-3">
          Lukas Olsen <span className="text-primary">👋</span>
        </h1>
        <LeadText>{t("common.subtitle")}</LeadText>
      </motion.section>
      <Separator className="my-10 opacity-60" />

      <motion.section
        id="about"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Header3 className="mb-1">{t("pages.index.about.title")}</Header3>
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

      <motion.section
        id="work-experience"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Header3 className="mb-1">{t("pages.experience.title")}</Header3>
        <WorkExperience experience={workExperiences} />
      </motion.section>
      <Separator className="my-10 opacity-60" />

      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Header3 className="mb-1">{t("pages.projects.title")}</Header3>
        <Projects />
      </motion.section>

      <Separator className="my-10 opacity-60" />
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <Header3 className="mb-1">{t("pages.contact.title")}</Header3>
        <Paragraph>{t("pages.contact.description")}</Paragraph>
        <a
          href="mailto:lukmarwil@gmail.com"
          className="inline-block mt-2 text-sm font-medium text-primary underline"
        >
          {t("pages.contact.email")}
        </a>
      </motion.section>
    </div>
  );
}

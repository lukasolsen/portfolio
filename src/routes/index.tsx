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
import { m } from "@/paraglide/messages";
import { getWorkExperience } from "@/data/work-experience.server";

export const Route = createFileRoute("/")({
  loader: async () => {
    const workExperiences = await getWorkExperience();
    return { workExperiences };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { workExperiences } = useLoaderData({
    from: Route.id,
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5, ease: "easeOut" },
  } as const;

  return (
    <div className="content mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-16 md:pt-24"
      >
        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight mb-4">
          Lukas Olsen{" "}
          <span className="text-primary inline-block animate-wave origin-bottom-right">
            👋
          </span>
        </h1>
        <div className="max-w-2xl">
          <LeadText>{m["common.subtitle"]()}</LeadText>
        </div>
      </motion.section>

      <Separator className="my-12 opacity-40" />

      <motion.section id="about" {...fadeInUp}>
        <Header3 className="mb-4">{m["pages.index.about.title"]()}</Header3>
        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
          <Paragraph>
            Mitt navn er <strong>Lukas Moe Olsen</strong>, og jeg er en norsk
            utvikler som liker å bygge alt av produkter og tjenester. Jeg
            startet karrieren min i slutten av 2022, da jeg begynte på{" "}
            <a
              href="https://www.hamar-katedral.vgs.no/hovedmeny/utdanningstilbud/informasjonsteknologi-og-medieproduksjon/"
              className="text-foreground underline decoration-primary/50 underline-offset-4 hover:decoration-primary transition-all"
              target="_blank"
            >
              2INF
            </a>{" "}
            ved Hamar Katedralskole. Nå jobber jeg som lærling i{" "}
            <a
              href="https://dyplink.no"
              className="text-foreground underline decoration-primary/50 underline-offset-4 hover:decoration-primary transition-all"
              target="_blank"
            >
              Dyplink AS
            </a>
            , hvor jeg lærer faget i praksis – fra prosjektledelse til fullstack
            utvikling av kritiske systemer.
          </Paragraph>
        </div>
      </motion.section>

      <Separator className="my-12 opacity-40" />

      <motion.section id="work-experience" {...fadeInUp}>
        <Header3 className="mb-6">{m["pages.experience.title"]()}</Header3>
        <WorkExperience experience={workExperiences} />
      </motion.section>

      <Separator className="my-12 opacity-40" />

      <motion.section id="projects" {...fadeInUp}>
        <div className="flex items-center justify-between mb-2">
          <Header3>{m["pages.projects.title"]()}</Header3>
          <span className="text-sm text-muted-foreground hidden sm:block">
            Utvalgte prosjekter
          </span>
        </div>
        <Projects />
      </motion.section>

      <Separator className="my-12 opacity-40" />

      <motion.section id="contact" {...fadeInUp} className="mb-16">
        <div className="bg-muted/30 rounded-2xl p-6 md:p-8 border border-border/50">
          <Header3 className="mb-3">{m["pages.contact.title"]()}</Header3>
          <Paragraph className="text-muted-foreground mb-4 max-w-2xl">
            {m["pages.contact.description"]()}
          </Paragraph>
          <a
            href="mailto:lukmarwil@gmail.com"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            {m["pages.contact.email"]()}
          </a>
        </div>
      </motion.section>
    </div>
  );
}

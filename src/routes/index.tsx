import { motion } from "framer-motion";
import { Projects } from "@/core/components/projects";
import { WorkExperience } from "@/core/components/work-experience";
import { WarmParticles } from "@/core/components/warm-particles";
import { Timeline } from "@/core/components/timeline";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Header1, Paragraph, SmallText } from "@/components/typography/typography";
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

  const fadeIn = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  } as const;

  return (
    <>
      <WarmParticles />

      <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-0">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="min-h-[85vh] flex flex-col justify-center relative"
        >
          {/* Subtle radial glow behind text */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none -z-10 opacity-[0.12]"
            style={{
              background:
                "radial-gradient(ellipse at center, #d97757 0%, transparent 70%)",
            }}
          />
          <div className="space-y-6">
            <Header1 className="font-medium tracking-tight leading-[1.08]">
              Norsk utvikler som bygger
              <br />
              <span className="text-muted-foreground/60">
                prosjekter fra idé til virkelighet.
              </span>
            </Header1>
          </div>
        </motion.section>

        {/* Who am I */}
        <motion.section id="about" {...fadeIn} className="pb-24 md:pb-32">
          <h2
            className="text-muted-foreground/50 font-medium tracking-wide uppercase mb-8"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
          >
            Hvem er jeg
          </h2>
          <div className="text-foreground leading-[1.7]">
            <Paragraph>
              Mitt navn er <span className="text-foreground font-medium">Lukas Moe Olsen</span>. Jeg er en norsk
              utvikler som liker å bygge prosjekter og verktøy. Nå
              jobber jeg som lærling i{" "}
              <a
                href="https://dyplink.no"
                className="text-foreground underline decoration-border/40 underline-[0.2em] underline-offset-[0.2em] hover:decoration-primary/60 transition-colors"
                target="_blank"
              >
                Dyplink AS
              </a>
              , hvor jeg jobber med fullstack utvikling av kritiske systemer.
            </Paragraph>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section id="timeline" {...fadeIn} className="pb-24 md:pb-32">
          <h2
            className="text-muted-foreground/50 font-medium tracking-wide uppercase mb-10"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
          >
            Veien hit
          </h2>
          <Timeline />
        </motion.section>

        {/* Projects */}
        <motion.section id="projects" {...fadeIn} className="pb-24 md:pb-32">
          <h2
            className="text-muted-foreground/50 font-medium tracking-wide uppercase mb-10"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
          >
            {m["pages.projects.title"]()}
          </h2>
          <Projects />
        </motion.section>

        {/* Work Experience */}
        <motion.section id="work-experience" {...fadeIn} className="pb-24 md:pb-32">
          <h2
            className="text-muted-foreground/50 font-medium tracking-wide uppercase mb-10"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
          >
            {m["pages.experience.title"]()}
          </h2>
          <WorkExperience experience={workExperiences} />
        </motion.section>

        {/* Stats */}
        <motion.section id="stats" {...fadeIn} className="pb-24 md:pb-32">
          <h2
            className="text-muted-foreground/50 font-medium tracking-wide uppercase mb-10"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
          >
            Tall
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2+", label: "years building" },
              { value: "2", label: "projects built" },
              { value: "1", label: "company" },
              { value: "∞", label: "curiosity" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div
                  className="font-medium text-foreground tracking-tight"
                  style={{
                    fontSize: "clamp(1.75rem, 1.6rem + 0.57vw, 2.25rem)",
                  }}
                >
                  {stat.value}
                </div>
                <SmallText className="text-[11px] text-muted-foreground/60 mt-1 tracking-wide">
                  {stat.label}
                </SmallText>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section id="contact" {...fadeIn} className="pb-32 md:pb-40">
          <h2
            className="text-muted-foreground/50 font-medium tracking-wide uppercase mb-8"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
          >
            {m["pages.contact.title"]()}
          </h2>
          <Paragraph className="text-muted-foreground mb-8">
            {m["pages.contact.description"]()}
          </Paragraph>
          <a
            href="mailto:lukmarwil@gmail.com"
            className="group inline-flex items-center gap-2.5 text-foreground font-medium transition-colors"
            style={{
              fontSize: "clamp(1rem, 0.97rem + 0.16vw, 1.125rem)",
            }}
          >
            <span className="underline decoration-border/40 underline-[0.12em] underline-offset-[0.2em] group-hover:decoration-primary/60 transition-colors">
              {m["pages.contact.email"]()}
            </span>
            <span className="text-muted-foreground/40 group-hover:text-primary/60 transition-colors translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200">
              →
            </span>
          </a>
        </motion.section>
      </div>
    </>
  );
}

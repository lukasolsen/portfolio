import { Header1, Header6, Paragraph, SmallText } from "@/components/typography/typography";
import { WarmParticles } from "@/core/components/warm-particles";
import { canonicalLink, seo } from "@/utils/seo";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, MapPin, MessageSquareText } from "lucide-react";

const contactLinks = [
  {
    title: "Email",
    description: "For project ideas, collaboration, or direct questions.",
    value: "lukmarwil@gmail.com",
    href: "mailto:lukmarwil@gmail.com",
    icon: Mail,
  },
  {
    title: "GitHub",
    description: "Code, experiments, and public project work.",
    value: "@lukasolsen",
    href: "https://github.com/lukasolsen",
    icon: Github,
  },
] as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seo({
      title: "Contact Lukas Olsen | Full-stack developer",
      description:
        "Contact Lukas Olsen by email or find his projects and experiments on GitHub.",
      keywords: "Lukas Olsen, contact, GitHub, email, full-stack developer",
      path: "/contact",
    }),
    links: [canonicalLink("/contact")],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const easing = [0.25, 0.1, 0.25, 1] as const;

  return (
    <>
      <WarmParticles />

      <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden">
        <section className="mx-auto max-w-5xl px-2 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          >
            <div className="space-y-8">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: easing }}
              >
                <h2
                  className="mb-8 text-muted-foreground/50 font-medium tracking-wide uppercase"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
                >
                  Contact
                </h2>
                <div className="space-y-6">
                  <Header1 className="max-w-3xl font-medium leading-[1.08] tracking-tight">
                    Send a clear note. I will take it from there.
                  </Header1>
                  <Paragraph className="max-w-2xl text-muted-foreground">
                    I am most useful in focused conversations about full-stack
                    projects, developer tools, and practical AI systems. Email
                    is the best place to start.
                  </Paragraph>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: easing }}
                className="grid gap-3 sm:grid-cols-3"
              >
                {[
                  { label: "Best channel", value: "Email" },
                  { label: "Typical topics", value: "Builds" },
                  { label: "Location", value: "Norway" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-t border-border/30 pt-3"
                  >
                    <SmallText className="text-[11px] text-muted-foreground/50">
                      {item.label}
                    </SmallText>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.65, ease: easing }}
              className="relative"
            >
              <div className="absolute -inset-4 -z-10 rounded-lg border border-border/10 bg-muted/10" />
              <div className="overflow-hidden rounded-lg border border-border/30 bg-background/80 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-border/20 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    <SmallText className="text-sm font-medium text-foreground">
                      Available for focused conversations
                    </SmallText>
                  </div>
                  <MessageSquareText
                    className="size-4 text-muted-foreground/40"
                    aria-hidden="true"
                  />
                </div>

                <div className="divide-y divide-border/20">
                  {contactLinks.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.a
                        key={item.title}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.18 + index * 0.08,
                          ease: easing,
                        }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                      >
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-border/20 bg-muted/40 text-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <Header6 className="font-medium">{item.title}</Header6>
                          <SmallText className="text-sm text-muted-foreground">
                            {item.description}
                          </SmallText>
                          <span className="mt-2 block truncate font-mono text-[13px] text-foreground underline decoration-border/40 underline-[0.2em] underline-offset-[0.2em] transition-colors group-hover:decoration-primary/60">
                            {item.value}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="size-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </motion.a>
                    );
                  })}
                </div>

                <div className="border-t border-border/20 bg-muted/20 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground/50"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <SmallText className="text-sm font-medium text-foreground">
                        Based in Hamar / Oslo
                      </SmallText>
                      <SmallText className="max-w-xl text-sm text-muted-foreground">
                        Open to project conversations around React, type-safe
                        systems, integrations, and useful AI tooling.
                      </SmallText>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing }}
            viewport={{ once: true }}
            className="mt-16 border-t border-border/30 pt-8"
          >
            <SmallText className="max-w-2xl text-sm text-muted-foreground">
              Short messages are easiest to act on: context, goal, timeline, and
              the best way to reply.
            </SmallText>
          </motion.div>
        </section>
      </div>
    </>
  );
}

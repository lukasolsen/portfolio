import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectHero } from "@/core/components/project-view/project-hero";
import { ProjectMeta } from "@/core/components/project-view/project-meta";
import { ProjectSection } from "@/core/components/project-view/project-section";
import { ProjectGallery } from "@/core/components/project-view/project-gallery";
import { backrandProject } from "@/data/backrand";
import { Header3, Paragraph } from "@/components/typography";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Terminal } from "lucide-react";

import type { BundledLanguage } from "@/components/kibo-ui/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/kibo-ui/code-block";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/kibo-ui/snippet";
import { useState } from "react";

export const Route = createFileRoute("/projects/backrand/")({
  component: RouteComponent,
});

const commands = [
  {
    label: "npx",
    icon: Terminal,
    code: "npx backrand generate --style abstract --colors #ff0000 #00ff00 #0000ff --resolution 1920x1080",
  },
  {
    label: "pnpm",
    icon: Terminal,
    code: "pnpm backrand generate --style abstract --colors #ff0000 #00ff00 #0000ff --resolution 1920x1080",
  },
];

const code = {
  language: "javascript",
  filename: "generate-background.js",
  code: `fetch('https://api.backrand.com/v1/generate', {
  method: 'POST',
  body: JSON.stringify({
    style: 'abstract',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    resolution: '1920x1080'
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('Background image URL:', data.imageUrl);
})
.catch(error => {
  console.error('Error generating background:', error);
});`,
};

function RouteComponent() {
  const [value, setValue] = useState(commands[0].label);
  const activeCommand = commands.find((command) => command.label === value);

  const project = backrandProject;

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <ProjectHero project={project} />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {project.stats && <ProjectMeta project={project} />}

        <ProjectSection
          title="Om prosjektet"
          content={project.overview}
          highlights={project.highlights}
        />

        {/* --- CLI + Live Test CTA --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="my-12 rounded-2xl border border-border/40 bg-muted/5 p-8 backdrop-blur-sm text-center"
        >
          <Header3 className="mb-4">Kom i gang med Backrand</Header3>
          <Paragraph className="max-w-2xl mx-auto mb-6 text-muted-foreground">
            Backrand er et raskt og fleksibelt verktøy for å generere gradient-
            og mønsterbakgrunner. Du kan enten bruke CLI-verktøyet lokalt eller
            teste API-et direkte i nettleseren.
          </Paragraph>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="text-base font-medium px-6"
              variant="default"
            >
              <a
                href="https://www.npmjs.com/package/backrand"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Last ned CLI
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className="text-base font-medium px-6"
              variant="secondary"
            >
              <Link
                to="/projects/backrand/playground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Test i nettleser
              </Link>
            </Button>
          </div>
        </motion.section>

        {/* --- Example Code --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="my-16"
        >
          <Header3>Eksempelkode</Header3>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 mt-4">
            <div className="space-y-4">
              <Paragraph>
                Generer bakgrunnsbilder basert på brukerdefinerte stiler og
                fargevalg ved hjelp av Backrand API-et. Koden under viser
                hvordan du kan sende en forespørsel for å lage et abstrakt
                bakgrunnsbilde med spesifikke farger og oppløsning.
              </Paragraph>

              <Paragraph>
                Bytt ut stil, farger og oppløsning i forespørselen for å
                tilpasse bakgrunnen etter dine behov. Backrand håndterer
                bildebehandlingen og returnerer en URL eller base64-streng til
                det genererte bildet.
              </Paragraph>

              <Paragraph>
                CLI-verktøyet gir rask tilgang fra terminalen. Installer via npm
                og generer bakgrunner med kommandoen:
              </Paragraph>

              <Snippet onValueChange={setValue} value={value}>
                <SnippetHeader>
                  <SnippetTabsList>
                    {commands.map((command) => (
                      <SnippetTabsTrigger
                        key={command.label}
                        value={command.label}
                      >
                        <command.icon size={14} />
                        <span>{command.label}</span>
                      </SnippetTabsTrigger>
                    ))}
                  </SnippetTabsList>
                  {activeCommand && (
                    <SnippetCopyButton
                      onCopy={() =>
                        console.log(
                          `Copied "${activeCommand.code}" to clipboard`
                        )
                      }
                      onError={() =>
                        console.error(
                          `Failed to copy "${activeCommand.code}" to clipboard`
                        )
                      }
                      value={activeCommand.code}
                    />
                  )}
                </SnippetHeader>
                {commands.map((command) => (
                  <SnippetTabsContent key={command.label} value={command.label}>
                    {command.code}
                  </SnippetTabsContent>
                ))}
              </Snippet>
            </div>

            <div className="flex w-full flex-col gap-1 overflow-hidden">
              <CodeBlock data={[code]} value={"javascript"} className="w-full">
                <CodeBlockHeader>
                  <CodeBlockFiles>
                    {(item) => (
                      <CodeBlockFilename
                        key={item.language}
                        value={item.language}
                      >
                        {item.filename}
                      </CodeBlockFilename>
                    )}
                  </CodeBlockFiles>
                  <CodeBlockCopyButton
                    onCopy={() => console.log("Copied code to clipboard")}
                    onError={() =>
                      console.error("Failed to copy code to clipboard")
                    }
                  />
                </CodeBlockHeader>
                <ScrollArea className="w-full">
                  <CodeBlockBody>
                    {(item) => (
                      <CodeBlockItem
                        key={item.language}
                        value={item.language}
                        className="max-h-96 w-full"
                      >
                        <CodeBlockContent
                          language={item.language as BundledLanguage}
                        >
                          {item.code}
                        </CodeBlockContent>
                      </CodeBlockItem>
                    )}
                  </CodeBlockBody>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CodeBlock>
            </div>
          </div>
        </motion.section>

        {/* --- Gallery --- */}
        <ProjectGallery images={project.gallery?.images ?? []} />

        {/* --- Tech Section --- */}
        <ProjectSection
          title="Teknologier"
          content="Backrand er bygget med Node.js, Express og moderne bildebehandlingsteknikker. API-et kjører på en høyytelses backend og CLI-verktøyet er tilgjengelig via npm for enkel installasjon og bruk."
        />
      </div>
    </div>
  );
}

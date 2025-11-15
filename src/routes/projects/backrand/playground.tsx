import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { LeadText, Paragraph, Title } from "@/components/typography/typography";
import { PlaygroundControls } from "@/core/components/backrand/playground-controls";
import { BackrandProvider, useBackrand } from "@/context/backrand-context";

export const Route = createFileRoute("/projects/backrand/playground")({
  component: () => (
    <BackrandProvider>
      <BackrandPlayground />
    </BackrandProvider>
  ),
});

export default function BackrandPlayground() {
  const { image, loading } = useBackrand();

  return (
    <div className="bg-background text-foreground px-6 py-10">
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-10"
      >
        <Title>Backrand Playground</Title>
        <LeadText className="mt-4 text-muted-foreground">
          Eksperimenter med å generere unike mesh gradient-bakgrunner ved hjelp
          av Backrand APIet. Juster parametrene og se resultatene i sanntid!
        </LeadText>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start max-h-[80vh]"
      >
        {/* Preview */}
        <div className="lg:col-span-3 space-y-8 max-h-[80vh] ">
          <Card className="overflow-hidden min-h-[520px]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Forhåndsvisning
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center max-h-[512px]">
              {loading ? (
                <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
              ) : image ? (
                <motion.img
                  key={image}
                  src={image}
                  alt="Generated gradient"
                  className="rounded-lg shadow-md max-h-[512px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  Ingen bakgrunn generert enda. Juster innstillingene og klikk
                  på "Generer" for å lage en ny bakgrunn.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Generasjonshistorikk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Paragraph className="text-sm text-muted-foreground">
                Historikkfunksjonen er ikke tilgjengelig, vi anbefaler å lagre
                bildene lokalt når de er generert.
              </Paragraph>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <PlaygroundControls />
      </motion.div>
    </div>
  );
}

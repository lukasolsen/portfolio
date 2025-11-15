import { useState, useEffect, useRef, type FC } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { ExternalLink, Loader2 } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

const previewCache = new Map<string, PreviewData>();

type PreviewData = {
  title: string;
  description: string;
  domain: string;
  favicon?: string;
};

type Props = {
  url: string;
  children: React.ReactNode;
};

export const InternalSiteCard: FC<Props> = ({ url, children }) => {
  const { pathname } = useLocation();

  const [data, setData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);

  const mounted = useRef(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!url) return;

    if (previewCache.has(url)) {
      setData(previewCache.get(url)!);
      return;
    }

    const loadPreview = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/internal-metadata?url=${encodeURIComponent(url)}`
        );

        const preview = await res.json();

        if (res.ok) {
          previewCache.set(url, preview);
          if (mounted.current) setData(preview);
        }
      } catch (err) {
        console.error("Preview fetch failed:", err);
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    loadPreview();
  }, [url]);

  // Avoid showing preview for the current page
  if (pathname === url) {
    console.warn(
      "Not showing InternalSiteCard for current page to avoid recursion"
    );

    return <>{children}</>;
  }

  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>

      <HoverCardContent className="w-80 p-4 rounded-xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-xl">
        {!data && loading && (
          <div className="flex items-center gap-3 py-4">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Laster forhåndsvisning…
            </span>
          </div>
        )}

        {data && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {data.favicon && (
                <img
                  src={
                    data.favicon.startsWith("http")
                      ? data.favicon
                      : `${url}${data.favicon}`
                  }
                  className="h-5 w-5 rounded-sm"
                  alt=""
                />
              )}
              <h4 className="font-semibold text-sm">{data.title}</h4>
            </div>

            <p className="text-muted-foreground text-sm line-clamp-3">
              {data.description}
            </p>

            <div className="flex items-center gap-2 text-muted-foreground text-xs pt-1">
              <ExternalLink className="h-3 w-3" />
              {data.domain}
            </div>
          </div>
        )}

        {!data && !loading && (
          <div className="text-muted-foreground text-sm">
            Kunne ikke hente forhåndsvisning.
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

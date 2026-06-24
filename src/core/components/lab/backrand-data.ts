export const backrandLabData = {
  links: {
    github: "https://github.com/codevault-llc/manager",
    playground: "/projects/backrand/playground",
    npm: "https://www.npmjs.com/package/backrand",
  },

  research: {
    title: "Backrand",
    subtitle: "Gradient Generation Through Constrained Randomness",
    period: "July 2024 — March 2025",
    status: "Completed" as const,

    abstract: `Backrand explores whether visually coherent backgrounds can be generated from text descriptions without design expertise or manual configuration. The project developed a constrained randomness approach that produces consistently usable outputs in under 200 milliseconds, resulting in an open-source tool with 12 style categories and support for resolutions up to 4K.`,

    question: `Can you generate visually coherent backgrounds from text descriptions without requiring design expertise or manual configuration?`,

    context: {
      problem: `Digital products need backgrounds constantly — landing pages, presentations, app interfaces, social media. The demand is universal and growing. Yet the process of creating them remains surprisingly manual and slow.`,
      gap: `Existing tools fall into two categories: fully customizable (Figma, Photoshop) which require skill and time, or instant templates which produce generic, uninspired results. There is no middle ground — nothing that is both fast and consistently good.`,
      goal: `This project set out to find that middle ground. Not a design tool, not a template library — a generation system that produces backgrounds from text input, where every output looks intentional by construction.`,
    },

    approach: {
      summary: `Rather than building a fully open-ended generation system, we developed a constrained approach. The engine works within defined style boundaries where outputs are guaranteed to meet a quality baseline. This trades creative freedom for consistent results — a tradeoff that proved correct for the use case.`,
      pipeline: [
        {
          stage: "Input",
          description: "Text description parsed into mood keywords, color preferences, and style indicators.",
          detail: "Natural language → structured parameters",
        },
        {
          stage: "Mapping",
          description: "Keywords mapped to constrained parameter ranges within the selected style category.",
          detail: "12 styles × constrained parameter space",
        },
        {
          stage: "Generation",
          description: "Random parameters sampled within constraints, gradient/pattern computed.",
          detail: "Deterministic seed → reproducible output",
        },
        {
          stage: "Output",
          description: "Final image rendered at requested resolution. PNG, JPEG, or SVG.",
          detail: "< 200ms total pipeline time",
        },
      ],
    },

    experiments: [
      {
        id: "exp-01",
        title: "Open-ended generation",
        hypothesis: "Unconstrained random generation will produce diverse, interesting backgrounds.",
        method: "Randomly sample gradient parameters (colors, positions, angles) without constraints. Generate 1,000 outputs across multiple color spaces.",
        result: "Failed",
        score: 0.12,
        finding: "Only 12% of outputs were visually acceptable. Without constraints, gradients tend toward muddy colors, harsh transitions, and unbalanced compositions. The space of 'ugly' gradients is vastly larger than the space of 'good' ones.",
        image: "/images/backrand/backrand_1.png",
      },
      {
        id: "exp-02",
        title: "Fixed palette approach",
        hypothesis: "Predefined color palettes will guarantee acceptable outputs by eliminating bad color combinations.",
        method: "Create 50 curated palettes based on color theory (complementary, analogous, triadic). Generate 1,000 outputs using only these palettes.",
        result: "Partial success",
        score: 0.67,
        finding: "Quality improved dramatically — 67% acceptance rate. But users reported outputs feeling 'samey' and limited. Fixed palettes solve the color problem but introduce a creative constraint that feels restrictive. The approach works but doesn't scale.",
        image: "/images/backrand/aurora_glow_example.png",
      },
      {
        id: "exp-03",
        title: "Constrained randomness",
        hypothesis: "Style-specific parameter constraints will maintain quality while allowing sufficient variation.",
        method: "Define 12 style categories, each with constrained parameter ranges (angle limits, color distance thresholds, gradient stop distribution). Generate 5,000 outputs across all styles.",
        result: "Success",
        score: 0.94,
        finding: "94% acceptance rate across all styles. The key insight: constraints don't reduce quality — they define it. By limiting the solution space per style, random outputs consistently look designed. Each style has its own 'safe zone' where everything looks intentional.",
        image: "/images/backrand/sky_and_sand.png",
      },
      {
        id: "exp-04",
        title: "Text-to-style mapping",
        hypothesis: "Simple keyword matching can reliably map natural language descriptions to style parameters without ML.",
        method: "Build keyword dictionaries for mood (warm, cool, vibrant, muted), context (professional, creative, minimal), and color preference. Test mapping accuracy with 200 text descriptions.",
        result: "Success",
        score: 0.89,
        finding: "89% mapping accuracy. Simple keyword matching proved sufficient — no ML required. Words like 'warm' map to specific color temperature ranges, 'vibrant' to saturation thresholds, 'minimal' to reduced complexity. The vocabulary is small enough that hand-crafted rules outperform learned models.",
        image: "/images/backrand/v1_global_normalization_8796.png",
      },
    ],

    findings: [
      {
        title: "Constraints produce quality",
        text: "The space of 'ugly' gradients is exponentially larger than the space of 'good' ones. Without constraints, random generation fails. With constraints, it succeeds. The lesson: define the safe zone, then randomize within it.",
        metric: { before: "12%", after: "94%", label: "acceptance rate improvement" },
      },
      {
        title: "Speed is a feature",
        text: "A 200ms render that's 90% good beats a 10s render that's 95% good. Real-time feedback changes how people work — they iterate faster, try more options, and settle on results they actually like.",
        metric: { before: "3.2s", after: "< 200ms", label: "render time reduction" },
      },
      {
        title: "Determinism builds trust",
        text: "Same input should produce same output. When users understand what to expect, they use the tool more confidently. Deterministic generation with optional variation (seed parameter) gives both predictability and exploration.",
        metric: { before: "Variable", after: "Deterministic", label: "output consistency" },
      },
      {
        title: "Simple beats complex",
        text: "Text-to-style mapping works with keyword matching. No ML needed. The vocabulary of design is small enough that hand-crafted rules outperform learned models for this specific task.",
        metric: { before: "ML pipeline", after: "Rule-based", label: "complexity reduction" },
      },
    ],

    performance: {
      benchmarks: [
        { resolution: "720p", style: "Abstract", time: "89ms", quality: 0.91 },
        { resolution: "1080p", style: "Abstract", time: "134ms", quality: 0.93 },
        { resolution: "1440p", style: "Aurora", time: "167ms", quality: 0.95 },
        { resolution: "4K", style: "Ocean", time: "198ms", quality: 0.94 },
        { resolution: "1080p", style: "Minimal", time: "76ms", quality: 0.96 },
        { resolution: "4K", style: "Neon", time: "191ms", quality: 0.92 },
      ],
      improvements: [
        { metric: "Render time", before: "3.2s", after: "< 200ms", change: "94%" },
        { metric: "Acceptance rate", before: "12%", after: "94%", change: "783%" },
        { metric: "Style variety", before: "3 styles", after: "12 styles", change: "4x" },
        { metric: "Max resolution", before: "1080p", after: "4K", change: "4x" },
        { metric: "Batch capacity", before: "1 at a time", after: "100+ batch", change: "100x" },
        { metric: "Output formats", before: "PNG only", after: "PNG, JPEG, SVG", change: "3x" },
      ],
    },

    styles: [
      { name: "Abstract", description: "Freeform gradients with organic flow", count: 847 },
      { name: "Aurora", description: "Northern lights inspired color bands", count: 623 },
      { name: "Sunset", description: "Warm horizontal color transitions", count: 1204 },
      { name: "Ocean", description: "Deep blue wave-like patterns", count: 956 },
      { name: "Forest", description: "Green organic earth tones", count: 534 },
      { name: "Sand", description: "Warm neutral desert gradients", count: 712 },
      { name: "Neon", description: "High saturation electric colors", count: 489 },
      { name: "Minimal", description: "Subtle single-color shifts", count: 1567 },
      { name: "Geometric", description: "Angular sharp-edged patterns", count: 378 },
      { name: "Organic", description: "Soft flowing natural shapes", count: 645 },
      { name: "Metallic", description: "Chrome and steel reflections", count: 298 },
      { name: "Matte", description: "Flat desaturated color fields", count: 1594 },
    ],

    result: {
      summary: `Backrand is the outcome of this research — an open-source gradient and pattern background generator that takes text descriptions and produces production-ready images.`,
      capabilities: [
        "12 constrained style categories with guaranteed quality baselines",
        "Text-to-background generation in under 200 milliseconds",
        "Resolutions from 320px to 3840px (4K)",
        "Batch generation for design systems (100+ per request)",
        "CLI, REST API, and interactive playground",
        "Deterministic output with optional variation via seed parameter",
      ],
      impact: `The constrained randomness approach proved that you don't need ML or complex AI to generate good visual output. Sometimes the best algorithm is a well-defined set of rules with carefully tuned boundaries. The project is open source and available on npm.`,
    },

    extends: [
      {
        title: "AI style suggestions",
        description: "Using the constrained parameter space as training data for a natural language → style recommendation model. The 12 style categories with their constraint boundaries provide structured labels for supervised learning.",
        status: "in-progress" as const,
      },
      {
        title: "Design system integration",
        description: "Extending the generation pipeline to accept brand constraints (primary colors, typography, tone) and produce consistent background sets that match existing design systems.",
        status: "planned" as const,
      },
      {
        title: "Real-time API",
        description: "WebSocket-based streaming generation for live previews. Generate backgrounds as users adjust parameters, with sub-50ms response times.",
        status: "planned" as const,
      },
    ],
  },
};

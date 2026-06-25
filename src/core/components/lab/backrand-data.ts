export const backrandLabData = {
  links: {
    github: "https://github.com/codevault-llc/manager",
    playground: "/projects/backrand/playground",
    npm: "https://www.npmjs.com/package/backgrad",
  },

  research: {
    title: "Backgrad",
    subtitle: "Procedural Background Generation Engine",
    period: "October 2025 — July 2026",
    status: "Completed" as const,

    abstract: `Backgrad is a procedural background image generation engine that produces high-quality gradient and stylized backgrounds entirely through mathematical algorithms. No machine learning, no neural networks, no external image assets — every pixel is computed from code using interpolation, noise functions, and image processing pipelines.`,

    question: `Can mathematical algorithms alone produce production-quality background images without any machine learning or external assets?`,

    context: {
      problem: `Background image generation typically relies on either design expertise and manual configuration, or ML-based systems that introduce heavy dependencies, non-deterministic output, and slow inference times.`,
      gap: `Existing solutions force a tradeoff: creative control requires skill and time, while automated tools produce generic results or depend on trained models. There is no lightweight, deterministic alternative that generates diverse, high-quality backgrounds purely from code.`,
      goal: `Build a generation engine where every visual is computed algorithmically — fast, deterministic, and dependency-light. Same input always produces same output. No model weights, no training data, just math.`,
    },

    approach: {
      summary: `Backgrad uses a plugin-based generator registry where four distinct algorithmic models produce different visual styles. Each generator implements a specific mathematical pipeline — from Poisson disk sampling and Delaunay triangulation to Perlin noise flow fields and OpenSimplex warps. The system exposes both a REST API and CLI, with progressive quality scaling from fast previews to production renders.`,
      models: [
        {
          name: "mesh_gradient",
          description: "Smooth organic mesh gradients via control points, warping, and interpolation algorithms",
          algorithms: ["Delaunay triangulation", "Radial basis functions", "Voronoi cells", "Gaussian blobs"],
        },
        {
          name: "mesh_css",
          description: "Flowing CSS/Figma-style gradients from rectangular color meshes with fractal noise",
          algorithms: ["Bicubic interpolation", "Perlin noise flow", "Domain warping", "RBF blending"],
        },
        {
          name: "reflective_mesh",
          description: "Multicolor mesh with customizable light reflections, optimized for performance",
          algorithms: ["Screen compositing", "Sinusoidal ripple", "Bicubic upscale", "OpenCV remap"],
        },
        {
          name: "sky",
          description: "Stylized sky backgrounds with compositing layers — clouds, stars, aurora, moon, planets",
          algorithms: ["Noise octaves", "Poisson scattering", "Rim lighting", "Phase rendering"],
        },
      ],
      pipeline: [
        {
          stage: "Request",
          description: "Parse and validate input parameters via Pydantic models",
          detail: "FastAPI endpoint + CORS",
        },
        {
          stage: "Registry",
          description: "Dynamic plugin discovery maps model name to generator class",
          detail: "@generator decorator + pkgutil",
        },
        {
          stage: "Config",
          description: "Build GenerationConfig with size, colors, seed, quality tier, warp params",
          detail: "Dataclass + model_config dict",
        },
        {
          stage: "Generate",
          description: "Generator runs algorithmic pipeline — sampling, interpolation, warping",
          detail: "NumPy vectorized + OpenCV",
        },
        {
          stage: "Post-process",
          description: "Blur, grain, border softening, bloom, saturation, chromatic aberration",
          detail: "Edge-aware bilateral filtering",
        },
        {
          stage: "Encode",
          description: "Output as PNG, JPEG, or WEBP with quality control. Binary or base64",
          detail: "< 200ms total pipeline time",
        },
      ],
    },

    experiments: [
      {
        id: "exp-01",
        title: "Mesh gradient generation",
        hypothesis: "Delaunay triangulation with barycentric blending can produce smooth, organic gradients from random control points.",
        method: "Generate control points via Poisson disk sampling + Lloyd relaxation, warp with OpenSimplex noise, interpolate using Delaunay, Fluid, RBF, or Voronoi algorithms.",
        result: "Success",
        score: 0.96,
        finding: "Four interpolation algorithms each produce distinct visual styles. Delaunay gives smooth triangulated gradients, Fluid creates domain-warped blobs, RBF produces radial blends, and Voronoi generates soft cellular structures. Post-processing (blur, bloom, grain) elevates raw output to production quality.",
        image: "/images/backrand/backrand_1.png",
      },
      {
        id: "exp-02",
        title: "CSS mesh flow fields",
        hypothesis: "Multi-octave Perlin noise with domain warping can produce flowing CSS-style gradients from a rectangular color grid.",
        method: "Build a color grid (2-12 rows/cols), apply jitter deformation, flow through fractal Perlin noise with anisotropy and curl, interpolate via monotone bicubic or freeform RBF.",
        result: "Success",
        score: 0.94,
        finding: "13 built-in palettes and 5 style presets (balanced, silk, hero, ambient, vibrant) provide extensive creative range. The freeform RBF mode removes grid artifacts entirely. Fold shading and definition controls add depth without complexity.",
        image: "/images/backrand/aurora_glow_example.png",
      },
      {
        id: "exp-03",
        title: "Reflective light orbs",
        hypothesis: "Screen-composited Gaussian circles on a low-res mesh, then sinusoidally warped and upscaled, can create striking reflective backgrounds efficiently.",
        method: "Render Delaunay mesh at 20% resolution, generate N white Gaussian light orbs, blend via screen compositing (1-(1-A)*(1-B)), apply sinusoidal ripple warp with OpenCV remap(), smart bicubic upscale.",
        result: "Success",
        score: 0.93,
        finding: "Low-resolution rendering with smart upscaling achieves 5x speedup over full-res generation while maintaining visual quality. The screen compositing blend mode naturally creates realistic light reflections. OpenCV remap() is ~50x faster than scipy alternatives.",
        image: "/images/backrand/sky_and_sand.png",
      },
      {
        id: "exp-04",
        title: "Atmospheric sky compositing",
        hypothesis: "Multi-layer compositing of noise-based clouds, Poisson-scattered stars, and sine-wave aurora can produce photorealistic sky backgrounds.",
        method: "Layer compositing: base gradient with parabolic horizon, multi-octave puffy clouds with rim lighting, star scatter with twinkle, optional aurora bands, moon with phase and halo, planet ellipses with glow.",
        result: "Success",
        score: 0.95,
        finding: "Compositing separate atmospheric elements produces convincing sky scenes. Cloud density and coverage controls allow everything from clear skies to overcast. Moon phase rendering (new through full) adds temporal variety. The layered approach keeps each element independently configurable.",
        image: "/images/backrand/v1_global_normalization_8796.png",
      },
    ],

    findings: [
      {
        title: "Algorithms beat ML for determinism",
        text: "Mathematical pipelines produce identical output from identical input — every time. No model drift, no inference variance. Same seed always generates the same image, making the system reliable for production use.",
        metric: { before: "Non-deterministic", after: "Byte-for-byte identical", label: "output consistency" },
      },
      {
        title: "OpenCV-first processing",
        text: "All heavy processing (blur, resize, remap, bilateral filter) uses OpenCV instead of PIL. NumPy vectorized operations handle color interpolation and noise generation. The performance difference is dramatic.",
        metric: { before: "3.2s", after: "< 200ms", label: "render time reduction" },
      },
      {
        title: "Progressive quality scaling",
        text: "Internal render resolution scales with quality tier (LOW 0.35x to ENTERPRISE 4.0x), then downscales to target. Higher internal resolution then downsampling produces smoother gradients than rendering at target size directly.",
        metric: { before: "Fixed resolution", after: "5-tier scaling", label: "quality flexibility" },
      },
      {
        title: "Plugin architecture scales",
        text: "Adding a new generator requires only: create a file, define a class, decorate it, implement generate(). No configuration changes. The @generator decorator and pkgutil discovery make extension zero-friction.",
        metric: { before: "Core modification", after: "Add file + decorate", label: "extension complexity" },
      },
    ],

    performance: {
      benchmarks: [
        { resolution: "512x512", model: "mesh_gradient", time: "89ms", quality: 0.91 },
        { resolution: "1920x1080", model: "mesh_gradient", time: "134ms", quality: 0.93 },
        { resolution: "1920x1080", model: "mesh_css", time: "167ms", quality: 0.95 },
        { resolution: "3840x2160", model: "mesh_gradient", time: "198ms", quality: 0.94 },
        { resolution: "1920x1080", model: "reflective_mesh", time: "76ms", quality: 0.96 },
        { resolution: "3840x2160", model: "sky", time: "191ms", quality: 0.92 },
      ],
      improvements: [
        { metric: "Render time", before: "3.2s", after: "< 200ms", change: "94%" },
        { metric: "Dependency weight", before: "ML framework (2GB+)", after: "NumPy + OpenCV (< 200MB)", change: "10x lighter" },
        { metric: "Generator models", before: "1 (basic)", after: "4 (specialized)", change: "4x" },
        { metric: "Output consistency", before: "Variable", after: "Deterministic", change: "100%" },
        { metric: "Quality tiers", before: "Fixed", after: "5 levels (LOW → ENTERPRISE)", change: "5x" },
        { metric: "Output formats", before: "PNG only", after: "PNG, JPEG, WEBP + base64", change: "4x" },
      ],
    },

    styles: [
      { name: "Sinusoidal", description: "Sine/cosine displacement fields for smooth periodic warps", count: "Basic" },
      { name: "Wave", description: "OpenSimplex noise with bilinear interpolation and optional smoothing", count: "Intermediate" },
      { name: "Turbulence", description: "Multi-octave OpenSimplex noise for chaotic organic distortions", count: "Intermediate" },
      { name: "Curl Noise", description: "Divergence-free flow via curl of fractal noise potential", count: "Advanced" },
      { name: "CSS Flow", description: "Multi-octave Perlin with domain warping, anisotropy, and curl", count: "Advanced" },
      { name: "Delaunay", description: "Triangulation with barycentric blending in smooth/hard/vertex modes", count: "Interpolation" },
      { name: "Fluid", description: "Domain-warped Gaussian blobs or sine ribbons for organic flow", count: "Interpolation" },
      { name: "RBF", description: "Gaussian radial basis function interpolation with chunked processing", count: "Interpolation" },
      { name: "Voronoi", description: "Soft cellular structures via inverse-distance weighting", count: "Interpolation" },
      { name: "Bicubic", description: "Monotone Hermite interpolation preserving grid structure", count: "Interpolation" },
      { name: "Freeform RBF", description: "Gaussian radial basis blending from anchor points, removes grid artifacts", count: "Interpolation" },
      { name: "Screen Compositing", description: "Light orb blending via 1-(1-A)*(1-B) for realistic reflections", count: "Compositing" },
    ],

    result: {
      summary: `Backgrad is the outcome of this research — an open-source procedural background generation engine that produces production-quality images entirely through mathematical algorithms.`,
      capabilities: [
        "4 generator models with distinct algorithmic pipelines",
        "Deterministic output — same seed always produces identical images",
        "Progressive quality scaling from fast previews to ENTERPRISE renders",
        "Plugin architecture — new generators via @generator decorator",
        "REST API (FastAPI) + CLI + interactive playground",
        "PNG, JPEG, WEBP output with base64 and binary response modes",
        "Full benchmarking and validation tooling (SSIM, PSNR, histogram analysis)",
      ],
      impact: `The algorithmic approach proved that production-quality background generation doesn't require ML. By combining well-chosen mathematical primitives — Poisson sampling, Delaunay triangulation, Perlin noise, OpenSimplex warps — with modern image processing (OpenCV), the system achieves both speed and quality while remaining dependency-light and fully deterministic.`,
    },

    extends: [
      {
        category: "Short-term",
        items: [
          { title: "Additional warp algorithms", description: "Expand the warp system beyond sinusoidal, wave, turbulence, and curl noise.", status: "planned" as const },
          { title: "Sky atmosphere layers", description: "Add rain, fog, and lightning compositing layers to the sky generator.", status: "planned" as const },
          { title: "CSS mesh preset expansion", description: "More curated style presets beyond the current 5 (balanced, silk, hero, ambient, vibrant).", status: "planned" as const },
          { title: "API rate limiting & auth", description: "Production-ready API with authentication and rate limiting for public deployment.", status: "planned" as const },
          { title: "Async generation", description: "Async endpoint for high-throughput use cases and non-blocking generation.", status: "planned" as const },
        ],
      },
      {
        category: "Medium-term",
        items: [
          { title: "Real-time preview endpoint", description: "Low-quality fast generation for live parameter tuning in the playground.", status: "planned" as const },
          { title: "Batch generation API", description: "Multiple images per request for design system and batch workflow use cases.", status: "planned" as const },
          { title: "Custom plugin loading", description: "Load generator plugins from external packages without modifying core code.", status: "planned" as const },
          { title: "GPU acceleration", description: "CuPy/OpenCV CUDA support for GPU-accelerated generation at scale.", status: "planned" as const },
          { title: "Webhook callbacks", description: "Async generation with webhook notifications for long-running renders.", status: "planned" as const },
        ],
      },
      {
        category: "Long-term",
        items: [
          { title: "Web-based generator UI", description: "Interactive parameter tuning with live preview in a browser interface.", status: "planned" as const },
          { title: "Generator marketplace", description: "Community-contributed plugins and a shared generator ecosystem.", status: "planned" as const },
          { title: "Video generation", description: "Animated backgrounds from the existing procedural pipeline.", status: "planned" as const },
          { title: "Design tool integration", description: "Figma plugin and Sketch extension for direct generation within design workflows.", status: "planned" as const },
          { title: "ONNX export", description: "Export generation pipelines for inference in other frameworks.", status: "planned" as const },
        ],
      },
    ],
  },
};

import { NextRequest } from 'next/server';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, context: Context) {
  console.log(context.params.id);

  await new Promise((resolve) => setTimeout(() => resolve(''), 0));
  return Response.json({
    performance: {
      performance: 64,
      accessibility: 20,
      practices: 100,
      seo: 91,
    },
    metrics: { INP: 0, FCP: 550, LCP: 44600, TBT: 8450, CLS: 0.266 },
    audits: [
      {
        message: "Minimize render-blocking JavaScript and CSS",
        estimation: "16 hours",
        recommendation: "Defer loading of non-critical JavaScript and inline critical CSS."
      },
      {
        message: "Enable browser caching for static assets",
        estimation: "4 hours",
        recommendation: "Set appropriate cache headers for static assets like images, CSS, and JavaScript files."
      },
      {
        message: "Implement server-side rendering (SSR)",
        estimation: "24 hours",
        recommendation: "Use SSR to render initial page content on the server, reducing time to first byte (TTFB)."
      },
      {
        message: "Reduce the number of HTTP requests",
        estimation: "12 hours",
        recommendation: "Combine multiple CSS and JavaScript files into a single file and use image sprites."
      },
    ],
    money: {},
  });
}

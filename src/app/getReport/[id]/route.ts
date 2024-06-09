import { NextRequest } from 'next/server';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, context: Context) {
  console.log(context.params.id);

  const data = await fetch(
      process.env.API_URL + '/api/get-report?guid=' +
      context.params.id,
  );
  const lambdaReport = await data.json();

  console.log(lambdaReport);

  return Response.json({
    performanceScores: [
      {
        name: 'performance',
        value: lambdaReport.report.performance,
      },
      {
        name: 'accessibility',
        value: lambdaReport.report.accessibility,
      },
      {
        name: 'best practices',
        value: lambdaReport.report.bestpractices,
      },
      {
        name: 'seo',
        value: lambdaReport.report.seo,
      },
    ],
    vitalsMetrics: [
      {
        name: 'Interaction to Next Paint (INP)',
        value: 0,
        description:
          'Measures the latency of user interactions with the web page. A lower value indicates a more responsive experience.',
        color: 'green', // Assuming 0 is excellent for INP
      },
      {
        name: 'First Contentful Paint (FCP)',
        value: 550,
        description:
          'Represents the time it takes for the first piece of content to be rendered on the screen. It helps gauge the loading speed perceived by users.',
        color: 550 < 1000 ? 'green' : 550 < 3000 ? 'orange' : 'red',
      },
      {
        name: 'Largest Contentful Paint (LCP)',
        value: 44600,
        description:
          'Indicates the render time of the largest image or text block visible within the viewport, measuring how quickly the main content is loaded.',
        color: 44600 < 2500 ? 'green' : 44600 < 4000 ? 'orange' : 'red',
      },
      {
        name: 'Total Blocking Time (TBT)',
        value: 8450,
        description:
          'Calculates the total amount of time that a page is blocked from responding to user input, from First Contentful Paint (FCP) until Time to Interactive (TTI).',
        color: 8450 < 300 ? 'green' : 8450 < 600 ? 'orange' : 'red',
      },
      {
        name: 'Cumulative Layout Shift (CLS)',
        value: 0.266,
        description:
          'Quantifies the amount of unexpected layout shifts that occur during the lifespan of the page. A lower value means a more stable and visually appealing experience.',
        color: 0.266 < 0.1 ? 'green' : 0.266 < 0.25 ? 'orange' : 'red',
      },
    ],
    audits: [
      {
        message: 'Minimize render-blocking JavaScript and CSS',
        estimation: '16 hours',
        recommendation:
          'Defer loading of non-critical JavaScript and inline critical CSS.',
      },
      {
        message: 'Enable browser caching for static assets',
        estimation: '4 hours',
        recommendation:
          'Set appropriate cache headers for static assets like images, CSS, and JavaScript files.',
      },
      {
        message: 'Implement server-side rendering (SSR)',
        estimation: '24 hours',
        recommendation:
          'Use SSR to render initial page content on the server, reducing time to first byte (TTFB).',
      },
      {
        message: 'Reduce the number of HTTP requests',
        estimation: '12 hours',
        recommendation:
          'Combine multiple CSS and JavaScript files into a single file and use image sprites.',
      },
    ],
    money: [
      {
        name: 'Work Cost',
        value: '1000 $',
      },
      {
        name: 'ADS income increase',
        value: '100000 $',
      },
      {
        name: 'Potential Revenue Gain',
        value: '10000 $',
      },
    ],
  });
}

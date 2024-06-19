import { NextRequest } from 'next/server';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, context: Context) {
  console.log(context.params.id);

  await new Promise((resolve) =>
    setTimeout(
      () => resolve(''),
      context.params.id === '3f8a74f6-6b86-4fa9-8075-cc03e5b05cc3'
        ? 2000
        : 7000,
    ),
  );

  const data = await fetch(
    process.env.API_URL + '/api/get-report?guid=' + context.params.id,
  );
  const lambdaReport = await data.json();

  console.log(lambdaReport);

  return Response.json({
    options: {
      url: 'https://store.ee.co.uk',
      visitors: 20000,
      views: 5,
      ads: 3,
      type: 'mobile',
    },
    performanceScores: [
      {
        name: 'performance',
        value: Math.floor(lambdaReport.performance),
      },
      {
        name: 'accessibility',
        value: lambdaReport.accessibility,
      },
      {
        name: 'best practices',
        value: lambdaReport.bestPractices,
      },
      {
        name: 'seo',
        value: lambdaReport.seo,
      },
    ],
    money: [
      {
        name: 'Potential Revenue Gain',
        value: lambdaReport.money.potentialRevenueGain + ' %',
      },
      {
        name: 'Annual ADS income increase',
        value: lambdaReport.money.potentialIncomeIncrease + ' $',
      },
      {
        name: 'Optimisation Cost',
        value: lambdaReport.money.workCost + ' $',
      },
    ],
    vitalsMetrics: [
      {
        name: 'First Contentful Paint (FCP)',
        value: lambdaReport.metrics.FCP || '-',
        description:
          'Represents the time it takes for the first piece of content to be rendered on the screen. It helps gauge the loading speed perceived by users.',
        color:
          lambdaReport.metrics.FCP?.replace(/^\D+/g, '') < 1
            ? 'green'
            : lambdaReport.metrics.FCP?.replace(/^\D+/g, '') < 3
              ? 'orange'
              : 'red',
      },
      {
        name: 'Largest Contentful Paint (LCP)',
        value: lambdaReport.metrics.LCP,
        description:
          'Indicates the render time of the largest image or text block visible within the viewport, measuring how quickly the main content is loaded.',
        color:
          lambdaReport.metrics.LCP?.replace(/^\D+/g, '') < 2500
            ? 'green'
            : lambdaReport.metrics.LCP?.replace(/^\D+/g, '') < 4000
              ? 'orange'
              : 'red',
      },
      {
        name: 'Total Blocking Time (TBT)',
        value: lambdaReport.metrics.TBT || '-',
        description:
          'Calculates the total amount of time that a page is blocked from responding to user input, from First Contentful Paint (FCP) until Time to Interactive (TTI).',
        color:
          lambdaReport.metrics.TBT?.replace(/^\D+/g, '') < 300
            ? 'green'
            : lambdaReport.metrics.TBT?.replace(/^\D+/g, '') < 600
              ? 'orange'
              : 'red',
      },
      {
        name: 'Cumulative Layout Shift (CLS)',
        value: lambdaReport.metrics.CLS || '-',
        description:
          'Quantifies the amount of unexpected layout shifts that occur during the lifespan of the page. A lower value means a more stable and visually appealing experience.',
        color:
          lambdaReport.metrics.CLS?.replace(/^\D+/g, '') < 0.1
            ? 'green'
            : lambdaReport.metrics.CLS?.replace(/^\D+/g, '') < 0.25
              ? 'orange'
              : 'red',
      },
    ],
    audits: [
      ...lambdaReport.tasks.map(
        (task: {
          audit: { title: string };
          gptEstimation: string;
          gptTaskDescription: string;
        }) => {
          return {
            message: task.audit.title,
            estimation: task.gptEstimation + 'h',
            recommendation: task.gptTaskDescription,
          };
        },
      ),
    ],
  });
}

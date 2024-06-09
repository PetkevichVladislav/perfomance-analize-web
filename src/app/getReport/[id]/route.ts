import { NextRequest } from 'next/server';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, context: Context) {
  console.log(context.params.id);

  const data = await fetch(
    process.env.API_URL + '/api/get-report?guid=' + context.params.id,
  );
  const lambdaReport = await data.json();

  console.log(lambdaReport);

  return Response.json({
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
        name: 'Work Cost',
        value: lambdaReport.money.workCost + ' $',
      },
      {
        name: 'ADS income increase',
        value: lambdaReport.money.potentialIncomeIncrease + ' $',
      },
      {
        name: 'Potential Revenue Gain',
        value: lambdaReport.money.potentialRevenueGain + ' %',
      },
    ],
    vitalsMetrics: [
      {
        name: 'First Contentful Paint (FCP)',
        value: lambdaReport.metrics.FCP || '-',
        description:
          'Represents the time it takes for the first piece of content to be rendered on the screen. It helps gauge the loading speed perceived by users.',
        color:
          lambdaReport.metrics.FCP?.replace(/^\D+/g, '') < 1000
            ? 'green'
            : lambdaReport.metrics.FCP?.replace(/^\D+/g, '') < 3000
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

import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  const urlString =
    'url=' +
    encodeURIComponent(data.url) +
    '&guid=' +
    encodeURIComponent(data.id) +
    '&pagePerVisit=' +
    data.views +
    '&adsPerPage=' +
    data.ads +
    '&visitorQuanity=' +
    data.visitors;
  console.log('url string', urlString);
  console.log('api url', process.env.API_URL);
  const dataResponse = await fetch(
    process.env.API_URL + `/api/performance-analyze-report?${urlString}`,
  );
  return Response.json(dataResponse);
}

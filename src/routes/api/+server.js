import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const params = url.searchParams;
  const paramUrl = params.get('tgt');
  if (!paramUrl) {
    throw error(400, { message: 'tgt param not find' });
  }
  const paramParam = params.get('prm');
  if (!paramParam) {
    throw error(400, { message: 'prm param not find' });
  }
  const paramKey = params.get('key');
  if (!paramKey) {
    throw error(400, { message: 'key param not find' });
  }
  const targetUrl = decodeURIComponent(paramUrl);
  const targetParam = decodeURIComponent(paramParam);
  const urlBase = targetUrl.endsWith("/") ? targetUrl : `${targetUrl}/`;
  const sep = targetParam.includes('?') ? '&' : '?';
  const callUrl = `${urlBase}${targetParam}${sep}key=${paramKey}`;
  // console.log(callUrl);
  const res = await fetch(callUrl);
  if (!res.ok) {
    throw error(res.status, { message: `status: ${res.status}, ${res.statusText} : url: ${url}` });
  }
  const json = await res.json();
  // console.dir(json);
  return new Response(JSON.stringify(json));
}
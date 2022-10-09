const API_URL: string = 'http://backend.rideandshare.me/api/';
const APP_URL: string = 'http://rideandshare.me';

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(API_URL + input, init);
  return res.json();
}

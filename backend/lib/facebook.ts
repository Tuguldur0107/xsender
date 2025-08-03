// lib/facebook.ts
import axios from "axios";

const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

export async function fetchUserProfile(fb_id: string) {
  const url = `https://graph.facebook.com/${fb_id}?fields=first_name,last_name&access_token=${PAGE_ACCESS_TOKEN}`;
  const res = await axios.get(url);
  const profile = res.data;
  return `${profile.first_name} ${profile.last_name}`;
}

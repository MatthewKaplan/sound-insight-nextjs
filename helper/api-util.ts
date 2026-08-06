import { PageData, CompletePageData } from '../types/completePageData.type';

const DB_URL = process.env.firebasedb_link || 'https://sound-insight-default-rtdb.firebaseio.com/PAGE_DATA.json';

// Rebuild pages in the background at most once an hour, so content edits in
// Firebase show up without a redeploy.
export const REVALIDATE_SECONDS = 3600;

export async function getAllPageData(): Promise<PageData[]> {
  const response = await fetch(DB_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch page data: ${response.status} ${response.statusText}`);
  }
  const data = await response.json() as CompletePageData;

  return Object.keys(data).map((key) => ({ ...data[key as keyof typeof data], id: key }));
}

export async function getPageById(id: string): Promise<PageData> {
  const page = (await getAllPageData()).find((p: PageData) => p.DocumentID === id);
  if (!page) {
    throw new Error(`No page data found for DocumentID "${id}"`);
  }
  return page;
}

/** Fetch several documents with a single database read. */
export async function getPagesById(ids: string[]): Promise<PageData[]> {
  const allPages = await getAllPageData();
  return ids.map((id) => {
    const page = allPages.find((p: PageData) => p.DocumentID === id);
    if (!page) {
      throw new Error(`No page data found for DocumentID "${id}"`);
    }
    return page;
  });
}

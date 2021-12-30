import { PageData, CompletePageData } from '../types/completePageData.type';

export async function getAllPageData(): Promise<PageData[]> {
  const response = await fetch(process.env.firebasedb_link || '');
  const data = await response.json() as CompletePageData;

  const pageData: PageData[] = [];

  Object.keys(data).forEach((key) => pageData.push({ ...data[key as keyof typeof data], id: key }));
  return pageData;
}

export async function getPageById(id: string): Promise<PageData> {
  const allPages = await getAllPageData();
  return allPages.find((page: PageData) => page.DocumentID === id) as PageData;
}

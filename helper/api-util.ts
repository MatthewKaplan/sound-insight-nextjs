export async function getAllPageData() {
  const response = await fetch('https://sound-insight-default-rtdb.firebaseio.com/PAGE_DATA.json');
  const data = await response.json();

  const pageData = [];

  for (const key in data) {
    pageData.push({
      id: key, 
      ...data[key]
    })
  }

  return pageData;
}

export async function getFeaturedPageData() {
  const allPages = await getAllPageData();
  return allPages.filter((page) => page.isFeatured)
}

export async function getPageById(id: string) {
  const allPages = await getAllPageData();
  return allPages.find((page) => page.id === id);
}
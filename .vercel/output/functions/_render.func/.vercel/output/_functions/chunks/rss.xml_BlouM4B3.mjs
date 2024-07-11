import rss from '@astrojs/rss';
import { g as getCollection, H as HOME } from './consts_DAgLmvBM.mjs';

async function GET(context) {
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft);
  const items = [...projects].sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`
    }))
  });
}

export { GET };

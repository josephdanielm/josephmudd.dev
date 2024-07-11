/* empty css                         */
import { m as createAstro, n as createComponent, o as renderTemplate, p as maybeRenderHead, q as addAttribute, u as renderSlot, t as renderComponent } from './astro/server_Bs8d6JLF.mjs';
import 'kleur/colors';
import { g as getCollection } from './consts_aI_Azcuc.mjs';
import { a as $$PageLayout, $ as $$Container, r as readingTime, b as $$Link } from './PageLayout_CkD1XOMr.mjs';
import 'clsx';

const $$Astro$2 = createAstro("https://astro-nano-demo.vercel.app");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })} </time>`;
}, "/Users/josephmudd/repos/josephmudd.dev/src/components/FormattedDate.astro", void 0);

const $$Astro$1 = createAstro("https://astro-nano-demo.vercel.app");
const $$BackToPrev = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BackToPrev;
  const { href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="relative group w-fit flex pl-7 pr-3 py-1.5 flex-nowrap rounded border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-1/2 left-2 -translate-y-1/2 size-4 stroke-2 fill-none stroke-current"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-2 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></line> <polyline points="12 5 5 12 12 19" class="translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></polyline> </svg> <div class="text-sm"> ${renderSlot($$result, $$slots["default"])} </div> </a>`;
}, "/Users/josephmudd/repos/josephmudd.dev/src/components/BackToPrev.astro", void 0);

const $$Astro = createAstro("https://astro-nano-demo.vercel.app");
async function getStaticPaths() {
  const projects = (await getCollection("projects")).filter((post) => !post.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: project
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const project = Astro2.props;
  const { Content } = await project.render();
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": project.data.title, "description": project.data.description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate"> ${renderComponent($$result3, "BackToPrev", $$BackToPrev, { "href": "/projects" }, { "default": ($$result4) => renderTemplate` Back to projects ` })} </div> <div class="space-y-1 my-10"> <div class="animate flex items-center gap-1.5"> <div class="font-base text-sm"> ${renderComponent($$result3, "FormattedDate", $$FormattedDate, { "date": project.data.date })} </div>
&bull;
<div class="font-base text-sm"> ${readingTime(project.body)} </div> </div> <div class="animate text-2xl font-semibold text-black dark:text-white"> ${project.data.title} </div> ${(project.data.demoURL || project.data.repoURL) && renderTemplate`<nav class="animate flex gap-1"> ${project.data.demoURL && renderTemplate`${renderComponent($$result3, "Link", $$Link, { "href": project.data.demoURL, "external": true }, { "default": ($$result4) => renderTemplate`
demo
` })}`} ${project.data.demoURL && project.data.repoURL && renderTemplate`<span>/</span>`} ${project.data.repoURL && renderTemplate`${renderComponent($$result3, "Link", $$Link, { "href": project.data.repoURL, "external": true }, { "default": ($$result4) => renderTemplate`
repo
` })}`} </nav>`} </div> <article class="animate"> ${renderComponent($$result3, "Content", Content, {})} </article> ` })} ` })}`;
}, "/Users/josephmudd/repos/josephmudd.dev/src/pages/projects/[...slug].astro", void 0);

const $$file = "/Users/josephmudd/repos/josephmudd.dev/src/pages/projects/[...slug].astro";
const $$url = "/projects/[...slug]";

export { $$ as default, $$file as file, getStaticPaths, $$url as url };

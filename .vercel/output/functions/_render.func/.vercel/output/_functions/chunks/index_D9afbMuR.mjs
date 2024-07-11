/* empty css                         */
import { n as createComponent, o as renderTemplate, t as renderComponent, p as maybeRenderHead } from './astro/server_Bs8d6JLF.mjs';
import 'kleur/colors';
import { g as getCollection, S as SITE, a as SOCIALS, H as HOME } from './consts_DAgLmvBM.mjs';
import { $ as $$Container, b as $$Link, d as dateRange, a as $$PageLayout } from './PageLayout_D7s8mK8a.mjs';
import { $ as $$ArrowCard } from './ArrowCard_DGB8ZtVm.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()).slice(0, SITE.NUM_PROJECTS_ON_HOMEPAGE);
  const allwork = (await getCollection("work")).sort(
    (a, b) => new Date(b.data.dateStart).valueOf() - new Date(a.data.dateStart).valueOf()
  ).slice(0, SITE.NUM_WORKS_ON_HOMEPAGE);
  const work = await Promise.all(
    allwork.map(async (item) => {
      const { Content } = await item.render();
      return { ...item, Content };
    })
  );
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": HOME.TITLE, "description": HOME.DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<section> <article class="space-y-8"> <p class="animate font-semibold text-black dark:text-white">
Front-end developer based in Lafayette, Louisiana.
</p> <p class="animate">
In 2023, I was waiting tables when I decided to start ${renderComponent($$result3, "Link", $$Link, { "href": "https://www.theodinproject.com/", "aria-label": "Link to The Odin Project's Homepage", "external": true }, { "default": ($$result4) => renderTemplate`The Odin Project` })}'s full-stack Javascript curriculum. I was attracted to the program's
          demanding, project-heavy, and self-directed approach.
</p> <p class="animate">
Much like ${renderComponent($$result3, "Link", $$Link, { "href": "https://historiska.se/norse-mythology/odin-en/#:~:text=But%20he%20wanted%20to%20know,him", "aria-label": "Link to a page detailing the Norse God Odin's thirst for knowledge", "external": true }, { "default": ($$result4) => renderTemplate`The Odin Project's mascot` })}, I recognized that, although I have access to a wealth of knowledge
          at a whim, it is precisely within the cozy confines of this abundance
          that one stagnates. The highly intimidating volume of concepts before
          me traced a long, arduous path that I <i>knew</i> was worth trekking. 5+
          courses, 140+ lessons, and 20+ projects later, I posses <b>strong</b> fundamentals
          in HTML, CSS, and JavaScript, and a solid grasp of Version Control (Git),
          Test-Driven-Development (Jest), and UI/UX Libraries (React).
</p> <p class="animate">
I've come a long way, but my journey in web development is just
          beginning. I'm eager for opportunities to continue honing my technical
          skills and creativity to contribute, innovate, and grow in
          environments with like-minded developers.
</p> </article> </section> <div class="space-y-16 pt-8"> <section class="animate space-y-6"> <div class="flex flex-wrap gap-y-2 items-center justify-between pt-8"> <h5 class="font-semibold text-black dark:text-white space-y-16">
Work Experience
</h5> ${renderComponent($$result3, "Link", $$Link, { "href": "/work" }, { "default": ($$result4) => renderTemplate` See all work ` })} </div> <ul class="flex flex-col space-y-4"> ${work.map((entry) => renderTemplate`<li> <div class="text-sm opacity-75"> ${dateRange(entry.data.dateStart, entry.data.dateEnd)} </div> <div class="font-semibold text-black dark:text-white"> ${entry.data.company} </div> <div class="text-sm opacity-75">${entry.data.role}</div> <article> ${renderComponent($$result3, "entry.Content", entry.Content, {})} </article> </li>`)} </ul> </section> <section class="animate space-y-6"> <div class="flex flex-wrap gap-y-2 items-center justify-between"> <h5 class="font-semibold text-black dark:text-white">
Recent projects
</h5> ${renderComponent($$result3, "Link", $$Link, { "href": "/projects" }, { "default": ($$result4) => renderTemplate` See all projects ` })} </div> <ul class="flex flex-col gap-4"> ${projects.map((project) => renderTemplate`<li> ${renderComponent($$result3, "ArrowCard", $$ArrowCard, { "entry": project })} </li>`)} </ul> </section> <section class="animate space-y-4"> <h5 class="font-semibold text-black dark:text-white">Let's Connect</h5> <article> <p>If you'd like to get in touch, send me an email.</p> </article> <ul class="flex flex-wrap gap-2"> ${SOCIALS.map((SOCIAL) => renderTemplate`<li class="flex gap-x-2 text-nowrap"> ${renderComponent($$result3, "Link", $$Link, { "href": SOCIAL.HREF, "external": true, "aria-label": `${SITE.NAME} on ${SOCIAL.NAME}` }, { "default": ($$result4) => renderTemplate`${SOCIAL.NAME}` })} ${"/"} </li>`)} <li class="line-clamp-1"> ${renderComponent($$result3, "Link", $$Link, { "href": `mailto:${SITE.EMAIL}`, "aria-label": `Email ${SITE.NAME}` }, { "default": ($$result4) => renderTemplate`${SITE.EMAIL}` })} </li> </ul> </section> </div> ` })} ` })}`;
}, "/Users/josephmudd/repos/josephmudd.dev/src/pages/index.astro", void 0);

const $$file = "/Users/josephmudd/repos/josephmudd.dev/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };

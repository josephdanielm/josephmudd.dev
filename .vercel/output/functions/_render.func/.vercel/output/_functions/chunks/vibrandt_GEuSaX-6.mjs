import { n as createComponent, o as renderTemplate, p as maybeRenderHead, z as unescapeHTML } from './astro/server_Bs8d6JLF.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Develop and maintain 50+ custom web solutions, optimizing front-end code for performance and client satisfaction.</p>\n<ul>\n<li>Promoted rapidly to full-time with 2 salary increases in 5 months for improving UI performance and swiftly tackling complex problems using JavaScript and CSS.</li>\n<li>Integrate generative AI tools to refine content and manipulate data, reducing task-completion time by 40%.</li>\n<li>Led rebuild and migration of 20+ websites, achieving a 38% reduction in annual hosting costs.</li>\n<li>Drove the adoption of Figma after gaining leadership approval, enhancing team collaboration and workflow efficiency.</li>\n</ul>";

				const frontmatter = {"company":"Vibrandt","role":"Web Developer","dateStart":"Jan 2024","dateEnd":"Present"};
				const file = "/Users/josephmudd/repos/josephmudd.dev/src/content/work/vibrandt.md";
				const url = undefined;
				function rawContent() {
					return "\nDevelop and maintain 50+ custom web solutions, optimizing front-end code for performance and client satisfaction.\n\n- Promoted rapidly to full-time with 2 salary increases in 5 months for improving UI performance and swiftly tackling complex problems using JavaScript and CSS.\n- Integrate generative AI tools to refine content and manipulate data, reducing task-completion time by 40%.\n- Led rebuild and migration of 20+ websites, achieving a 38% reduction in annual hosting costs.\n- Drove the adoption of Figma after gaining leadership approval, enhancing team collaboration and workflow efficiency.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };

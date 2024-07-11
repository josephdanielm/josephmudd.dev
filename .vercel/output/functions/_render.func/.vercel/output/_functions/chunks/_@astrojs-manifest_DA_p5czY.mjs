import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './astro/server_Bs8d6JLF.mjs';
import 'clsx';
import 'html-escaper';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CDfJZ5Hq.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.CjwA7Oho.css"}],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CDfJZ5Hq.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.CjwA7Oho.css"}],"routeData":{"route":"/work","isIndex":true,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/index.astro","pathname":"/work","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CDfJZ5Hq.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.CjwA7Oho.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://astro-nano-demo.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/josephmudd/repos/josephmudd.dev/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/josephmudd/repos/josephmudd.dev/src/pages/projects/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/josephmudd/repos/josephmudd.dev/src/pages/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/josephmudd/repos/josephmudd.dev/src/pages/work/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/josephmudd/repos/josephmudd.dev/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/work/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/projects/index@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/projects/[...slug]@_@astro":"pages/projects/_---slug_.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/work/index@_@astro":"pages/work.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","/Users/josephmudd/repos/josephmudd.dev/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_DCkSBiYO.mjs","/src/pages/projects/index.astro":"chunks/index_BDoTXg1n.mjs","/src/pages/projects/[...slug].astro":"chunks/_...slug__BjtDTqHW.mjs","/src/pages/robots.txt.ts":"chunks/robots.txt_DRHYD5u_.mjs","/src/pages/rss.xml.ts":"chunks/rss.xml_BlouM4B3.mjs","/src/pages/work/index.astro":"chunks/index_DzoIiSV-.mjs","/src/pages/index.astro":"chunks/index_D9afbMuR.mjs","/Users/josephmudd/repos/josephmudd.dev/src/content/projects/resume-wizard/index.md?astroContentCollectionEntry=true":"chunks/index_BpeGnAVK.mjs","/Users/josephmudd/repos/josephmudd.dev/src/content/projects/weather-app/index.md?astroContentCollectionEntry=true":"chunks/index_Cq7KqLD5.mjs","/Users/josephmudd/repos/josephmudd.dev/src/content/work/vibrandt.md?astroContentCollectionEntry=true":"chunks/vibrandt_ChV58ikP.mjs","/Users/josephmudd/repos/josephmudd.dev/src/content/projects/resume-wizard/index.md?astroPropagatedAssets":"chunks/index_DjmKvSTB.mjs","/Users/josephmudd/repos/josephmudd.dev/src/content/projects/weather-app/index.md?astroPropagatedAssets":"chunks/index___xGI2CS.mjs","/Users/josephmudd/repos/josephmudd.dev/src/content/work/vibrandt.md?astroPropagatedAssets":"chunks/vibrandt_CxptNIJp.mjs","/Users/josephmudd/repos/josephmudd.dev/src/content/projects/resume-wizard/index.md":"chunks/index_xfrob1Zz.mjs","/Users/josephmudd/repos/josephmudd.dev/src/content/projects/weather-app/index.md":"chunks/index_BdvxjRQW.mjs","/Users/josephmudd/repos/josephmudd.dev/src/content/work/vibrandt.md":"chunks/vibrandt_GEuSaX-6.mjs","\u0000@astrojs-manifest":"manifest_gAFxy5lr.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CDfJZ5Hq.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/lora-latin-400-normal.CvHVDnm4.woff2","/_astro/lora-latin-600-normal.DUWh3m6k.woff2","/_astro/inter-latin-600-normal.B2Ssfs8e.woff2","/_astro/inter-latin-400-normal.BT1H-PT_.woff2","/_astro/lora-math-400-normal.QoQvadwx.woff2","/_astro/lora-cyrillic-ext-400-normal.CXkJfJTd.woff2","/_astro/lora-cyrillic-400-normal.DXyCOuTk.woff2","/_astro/lora-vietnamese-400-normal.vaWCr7o2.woff2","/_astro/lora-latin-400-normal.BGMs03OI.woff","/_astro/lora-symbols-400-normal.DmcY0X7a.woff2","/_astro/lora-latin-ext-400-normal.Zaohh3s8.woff2","/_astro/lora-cyrillic-600-normal.GE5bhziV.woff2","/_astro/inter-latin-600-normal.Dbvh0wvx.woff","/_astro/inter-latin-400-normal.Cdi8t5Mu.woff","/_astro/lora-symbols-600-normal.DaMEG5Dn.woff2","/_astro/lora-cyrillic-ext-600-normal.C7TDeNoj.woff2","/_astro/lora-vietnamese-600-normal.BVdSWJ2U.woff2","/_astro/lora-math-600-normal.CU8J3siK.woff2","/_astro/lora-latin-600-normal.31JvEFhQ.woff","/_astro/lora-latin-ext-600-normal.D_NIiHfu.woff2","/_astro/lora-cyrillic-400-normal.D1XS6rs-.woff","/_astro/lora-vietnamese-400-normal.DhDIvpTE.woff","/_astro/lora-cyrillic-ext-400-normal.CFh4TfQj.woff","/_astro/lora-cyrillic-600-normal.D9Zbnu3d.woff","/_astro/lora-math-400-normal.Gsx8lQXW.woff","/_astro/lora-latin-ext-400-normal.C_gIiBKz.woff","/_astro/lora-symbols-400-normal.BQXsqyo4.woff","/_astro/lora-vietnamese-600-normal.BNxtpOks.woff","/_astro/lora-symbols-600-normal.BBvEw2tW.woff","/_astro/lora-cyrillic-ext-600-normal.DJ36qKL9.woff","/_astro/lora-math-600-normal.Bpm_vvix.woff","/_astro/lora-latin-ext-600-normal.CIEFHufk.woff","/_astro/index.CjwA7Oho.css","/android-chrome-192x192.png","/android-chrome-384x384.png","/apple-touch-icon.png","/browserconfig.xml","/favicon-16x16.png","/favicon-32x32.png","/favicon-dark.svg","/favicon-light.svg","/favicon.ico","/mstile-150x150.png","/resume-wizard-screenshot.png","/safari-pinned-tab.svg","/site.webmanifest","/weather-app-screenshot.png","/_astro/hoisted.CDfJZ5Hq.js","/fonts/MonaSans-Light.woff2","/fonts/MonaSans-Regular.woff2","/fonts/MonaSans-SemiBold.woff2","/fonts/atkinson-bold.woff","/fonts/atkinson-regular.woff"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };

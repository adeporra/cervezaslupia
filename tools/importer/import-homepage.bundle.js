/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-brand.js
  function parse(element, { document }) {
    const heading = element.querySelector("p.titulo_hero, .titulo_hero, p.rama");
    const productImage = element.querySelector(".img_latas img, .col_latas img");
    const hopImage = element.querySelector(".img_lupulo img");
    const leafImage = element.querySelector(".img_hoja img");
    const heartImage = element.querySelector(".img_corazon img");
    const wolfImage = element.querySelector(".img_lobo img");
    const cells = [];
    if (hopImage) {
      cells.push([hopImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (leafImage) contentCell.push(leafImage);
    if (heartImage) contentCell.push(heartImage);
    if (wolfImage) contentCell.push(wolfImage);
    if (productImage) contentCell.push(productImage);
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-brand", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-ticker.js
  function parse2(element, { document }) {
    const marqueeContainer = element.querySelector(".marquesina");
    const container = marqueeContainer || element;
    const figures = Array.from(container.querySelectorAll("figure.wp-block-image"));
    const cells = [];
    const seenSrcs = /* @__PURE__ */ new Set();
    for (const figure of figures) {
      const img = figure.querySelector("img");
      if (img) {
        const src = img.getAttribute("src") || "";
        if (!seenSrcs.has(src)) {
          seenSrcs.add(src);
          cells.push([img]);
        }
      }
    }
    if (cells.length === 0) {
      const imgs = Array.from(container.querySelectorAll("img"));
      const fallbackSeen = /* @__PURE__ */ new Set();
      for (const img of imgs) {
        const src = img.getAttribute("src") || "";
        if (!fallbackSeen.has(src)) {
          fallbackSeen.add(src);
          cells.push([img]);
        }
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-ticker", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/embed-video.js
  function parse3(element, { document }) {
    var _a, _b;
    const posterImg = element.querySelector('img#loadVideoImg, img[alt*="Video"], img[alt*="video"], img');
    const videoLink = element.querySelector('a[href*="youtube"], a[href*="youtu.be"], a[href*="vimeo"], iframe[src]');
    const dataVideoUrl = element.getAttribute("data-video-url") || element.getAttribute("data-src") || ((_a = element.querySelector("[data-video-url], [data-src]")) == null ? void 0 : _a.getAttribute("data-video-url")) || ((_b = element.querySelector("[data-video-url], [data-src]")) == null ? void 0 : _b.getAttribute("data-src"));
    const contentCell = [];
    if (posterImg) {
      contentCell.push(posterImg);
    }
    if (videoLink) {
      const link = videoLink.tagName === "IFRAME" ? document.createElement("a") : videoLink;
      if (videoLink.tagName === "IFRAME") {
        link.href = videoLink.src;
        link.textContent = videoLink.src;
      }
      contentCell.push(link);
    } else if (dataVideoUrl) {
      const link = document.createElement("a");
      link.href = dataVideoUrl;
      link.textContent = dataVideoUrl;
      contentCell.push(link);
    }
    const cells = [];
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "embed-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-product.js
  function parse4(element, { document }) {
    const slides = element.querySelectorAll(".keen-slider__slide");
    const cells = [];
    slides.forEach((slide) => {
      const productImage = slide.querySelector(".slide_pc img") || slide.querySelector(".img_producto_banner img");
      const heading = slide.querySelector(".txt_producto_banner h2") || slide.querySelector("h2");
      const ctaLinks = Array.from(
        slide.querySelectorAll(".txt_producto_banner a")
      );
      const links = ctaLinks.length > 0 ? ctaLinks : Array.from(slide.querySelectorAll("a.btn"));
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (links.length > 0) contentCell.push(...links);
      const imageCell = productImage ? [productImage] : [];
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-video.js
  function parse5(element, { document }) {
    const desktopVideo = element.querySelector("figure.hidden-mobile video, figure#video-home video");
    const mobileVideo = element.querySelector("figure.hidden-desktop video, figure#video-home-mobile video");
    const contentWrapper = element.querySelector(":scope > .wp-block-hacce-wrapper");
    const heading = contentWrapper ? contentWrapper.querySelector('h2, h1, [class*="heading"]') : element.querySelector('h2, h1, [class*="heading"]');
    const description = contentWrapper ? contentWrapper.querySelector("p.rama, p:not(.wp-block-button__link)") : element.querySelector("p.rama, p");
    const ctaLink = contentWrapper ? contentWrapper.querySelector("a.wp-block-button__link, a.wp-element-button, .wp-block-buttons a") : element.querySelector("a.wp-block-button__link, a.wp-element-button, .wp-block-buttons a");
    const cells = [];
    if (desktopVideo) {
      const videoSrc = desktopVideo.getAttribute("src");
      if (videoSrc) {
        const videoLink = document.createElement("a");
        videoLink.href = videoSrc;
        videoLink.textContent = videoSrc;
        cells.push([videoLink]);
      } else {
        cells.push([desktopVideo]);
      }
    } else if (mobileVideo) {
      const videoSrc = mobileVideo.getAttribute("src");
      if (videoSrc) {
        const videoLink = document.createElement("a");
        videoLink.href = videoSrc;
        videoLink.textContent = videoSrc;
        cells.push([videoLink]);
      } else {
        cells.push([mobileVideo]);
      }
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (ctaLink) contentCell.push(ctaLink);
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-blog.js
  function parse6(element, { document }) {
    const slides = element.querySelectorAll(".keen-slider__slide");
    const cells = [];
    slides.forEach((slide) => {
      const link = slide.querySelector("a.entrada_item") || slide.querySelector(".bloque_entradas_item a");
      if (!link) return;
      const image = slide.querySelector("img.wp-post-image") || slide.querySelector(".bloque_entradas_item img") || slide.querySelector("img");
      const heading = slide.querySelector("h3") || slide.querySelector("h2, h4");
      const contentCell = [];
      if (heading && link.href) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = heading.textContent;
        const h = document.createElement("h3");
        h.appendChild(a);
        contentCell.push(h);
      } else if (heading) {
        contentCell.push(heading);
      }
      const imageCell = image ? [image] : [];
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-blog", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/cervezaslupia-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["#CybotCookiebotDialog"]);
      WebImporter.DOMUtils.remove(element, ['[class*="SplashScreen_splashContainer"]']);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, ["header"]);
      WebImporter.DOMUtils.remove(element, ["footer"]);
      WebImporter.DOMUtils.remove(element, ["iframe"]);
    }
  }

  // tools/importer/transformers/cervezaslupia-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const cells = { style: section.style };
          const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells
          });
          if (sectionEl.nextSibling) {
            sectionEl.parentNode.insertBefore(sectionMetadataBlock, sectionEl.nextSibling);
          } else {
            sectionEl.parentNode.appendChild(sectionMetadataBlock);
          }
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-brand": parse,
    "carousel-ticker": parse2,
    "embed-video": parse3,
    "carousel-product": parse4,
    "hero-video": parse5,
    "cards-blog": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Craft beer brand homepage with hero, product showcase, and brand story",
    urls: ["https://cervezaslupia.es/"],
    blocks: [
      {
        name: "hero-brand",
        instances: [".bloque_hero_home"]
      },
      {
        name: "carousel-ticker",
        instances: [".marquesina_wrap"]
      },
      {
        name: "embed-video",
        instances: [".video-container"]
      },
      {
        name: "carousel-product",
        instances: [".Carrusel_navigation_wrapper__x8lu_"]
      },
      {
        name: "hero-video",
        instances: [".cosecha_home_video"]
      },
      {
        name: "cards-blog",
        instances: [".CarruselEntradas_navigation_wrapper__pztDh"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".bloque_hero_home",
        style: null,
        blocks: ["hero-brand"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Marquee Ticker",
        selector: ".marquesina_wrap",
        style: null,
        blocks: ["carousel-ticker"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Video Embed",
        selector: ".video-container",
        style: null,
        blocks: ["embed-video"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Full-width Image",
        selector: ".wrapper_img_100",
        style: null,
        blocks: [],
        defaultContent: [".wrapper_img_100 figure"]
      },
      {
        id: "section-5",
        name: "Product Carousel",
        selector: ".Carrusel_navigation_wrapper__x8lu_",
        style: null,
        blocks: ["carousel-product"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "La Cosecha Video",
        selector: ".cosecha_home_video",
        style: null,
        blocks: ["hero-video"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Blog Posts",
        selector: ".entradas_wrap",
        style: null,
        blocks: ["cards-blog"],
        defaultContent: [".entradas_wrap h2.titulo_big"]
      },
      {
        id: "section-8",
        name: "Newsletter Signup",
        selector: ".homenews",
        style: "dark",
        blocks: [],
        defaultContent: [".homenews img", ".homenews .Newsletter_oveja__8I2_7"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();

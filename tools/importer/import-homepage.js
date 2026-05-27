/* eslint-disable */
/* global WebImporter */

import heroBrandParser from './parsers/hero-brand.js';
import carouselTickerParser from './parsers/carousel-ticker.js';
import embedVideoParser from './parsers/embed-video.js';
import carouselProductParser from './parsers/carousel-product.js';
import heroVideoParser from './parsers/hero-video.js';
import cardsBlogParser from './parsers/cards-blog.js';

import cleanupTransformer from './transformers/cervezaslupia-cleanup.js';
import sectionsTransformer from './transformers/cervezaslupia-sections.js';

const parsers = {
  'hero-brand': heroBrandParser,
  'carousel-ticker': carouselTickerParser,
  'embed-video': embedVideoParser,
  'carousel-product': carouselProductParser,
  'hero-video': heroVideoParser,
  'cards-blog': cardsBlogParser,
};

const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Craft beer brand homepage with hero, product showcase, and brand story',
  urls: ['https://cervezaslupia.es/'],
  blocks: [
    {
      name: 'hero-brand',
      instances: ['.bloque_hero_home'],
    },
    {
      name: 'carousel-ticker',
      instances: ['.marquesina_wrap'],
    },
    {
      name: 'embed-video',
      instances: ['.video-container'],
    },
    {
      name: 'carousel-product',
      instances: ['.Carrusel_navigation_wrapper__x8lu_'],
    },
    {
      name: 'hero-video',
      instances: ['.cosecha_home_video'],
    },
    {
      name: 'cards-blog',
      instances: ['.CarruselEntradas_navigation_wrapper__pztDh'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '.bloque_hero_home',
      style: null,
      blocks: ['hero-brand'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Marquee Ticker',
      selector: '.marquesina_wrap',
      style: null,
      blocks: ['carousel-ticker'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Video Embed',
      selector: '.video-container',
      style: null,
      blocks: ['embed-video'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Full-width Image',
      selector: '.wrapper_img_100',
      style: null,
      blocks: [],
      defaultContent: ['.wrapper_img_100 figure'],
    },
    {
      id: 'section-5',
      name: 'Product Carousel',
      selector: '.Carrusel_navigation_wrapper__x8lu_',
      style: null,
      blocks: ['carousel-product'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'La Cosecha Video',
      selector: '.cosecha_home_video',
      style: null,
      blocks: ['hero-video'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'Blog Posts',
      selector: '.entradas_wrap',
      style: null,
      blocks: ['cards-blog'],
      defaultContent: ['.entradas_wrap h2.titulo_big'],
    },
    {
      id: 'section-8',
      name: 'Newsletter Signup',
      selector: '.homenews',
      style: 'dark',
      blocks: [],
      defaultContent: ['.homenews img', '.homenews .Newsletter_oveja__8I2_7'],
    },
  ],
};

const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

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
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

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

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};

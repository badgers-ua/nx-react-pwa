/* eslint-disable @typescript-eslint/no-var-requires */
import { readFileIfExisting } from '@nrwl/workspace/src/core/file-utils';

export const updateIndexHtml = (htmlStringFilePath: string) => {
  const htmlStr = readFileIfExisting(htmlStringFilePath);

  const prettier = require('prettier');
  const fs = require('fs');

  const formattedHtmlString = prettier.format(
    getUpdatedIndexHtmlString(htmlStr),
    {
      parser: 'html',
    }
  );

  fs.writeFileSync(htmlStringFilePath, formattedHtmlString);
};

const getUpdatedIndexHtmlString = (htmlStr: string) => {
  const {
    createNode,
    append,
    setAttribute,
    parse,
    serialize,
    replace,
    setText,
  } = require('parse5-utils');

  const doc: any = parse(htmlStr);

  const html: any = Array.from(doc.childNodes).find(
    ({ tagName }) => tagName === 'html'
  );

  const body = Array.from(html?.childNodes).find(
    ({ tagName }) => tagName === 'body'
  );

  const head: any = Array.from(html?.childNodes).find(
    ({ tagName }) => tagName === 'head'
  );

  const existingViewportMetaTag = Array.from(head.childNodes).find(
    ({ tagName, attrs }) =>
      tagName === 'meta' &&
      attrs.some(({ value }) => value.includes('viewport'))
  );

  if (existingViewportMetaTag) {
    const viewPortPWAMetaTag = createNode('meta');
    setAttribute(viewPortPWAMetaTag, 'name', 'viewport');
    setAttribute(
      viewPortPWAMetaTag,
      'content',
      'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no'
    );

    replace(existingViewportMetaTag, viewPortPWAMetaTag);
  }

  const existingFaviconLinkTag = Array.from(head.childNodes).find(
    ({ tagName, attrs }) =>
      tagName === 'link' &&
      attrs.some(({ value }) => value.includes('favicon.ico'))
  );

  if (existingFaviconLinkTag) {
    const faviconPWALinkTag = createNode('link');
    setAttribute(faviconPWALinkTag, 'rel', 'icon');
    setAttribute(faviconPWALinkTag, 'type', 'width=image/x-icon');
    setAttribute(faviconPWALinkTag, 'href', 'favicon.ico');

    replace(existingFaviconLinkTag, faviconPWALinkTag);
  }

  const manifestPWALinkTag = createNode('link');
  setAttribute(manifestPWALinkTag, 'rel', 'manifest');
  setAttribute(manifestPWALinkTag, 'href', 'manifest.json');

  const themeColorPwaMetaTag = createNode('meta');
  setAttribute(themeColorPwaMetaTag, 'name', 'theme-color');
  setAttribute(themeColorPwaMetaTag, 'content', '#000000');

  const appleMobileWebAppCapableMetaTag = createNode('meta');
  setAttribute(
    appleMobileWebAppCapableMetaTag,
    'name',
    'apple-mobile-web-app-capable'
  );
  setAttribute(appleMobileWebAppCapableMetaTag, 'content', 'yes');

  const appleMobileWebStatusBarStyleMetaTag = createNode('meta');
  setAttribute(
    appleMobileWebStatusBarStyleMetaTag,
    'name',
    'apple-mobile-web-app-status-bar-style'
  );
  setAttribute(
    appleMobileWebStatusBarStyleMetaTag,
    'content',
    'black-translucent'
  );

  const appleTouchIconLink = createNode('link');
  setAttribute(appleTouchIconLink, 'rel', 'apple-touch-icon');
  setAttribute(appleTouchIconLink, 'sizes', '180x180');
  setAttribute(appleTouchIconLink, 'href', 'assets/icons/apple-touch-icon.png');

  const appleSplashIconsData = [
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2048-2732.jpg',
      media:
        '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2732-2048.jpg',
      media:
        '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1668-2388.jpg',
      media:
        '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2388-1668.jpg',
      media:
        '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1536-2048.jpg',
      media:
        '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2048-1536.jpg',
      media:
        '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1668-2224.jpg',
      media:
        '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2224-1668.jpg',
      media:
        '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1620-2160.jpg',
      media:
        '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2160-1620.jpg',
      media:
        '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1284-2778.jpg',
      media:
        '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2778-1284.jpg',
      media:
        '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1170-2532.jpg',
      media:
        '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2532-1170.jpg',
      media:
        '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1125-2436.jpg',
      media:
        '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2436-1125.jpg',
      media:
        '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1242-2688.jpg',
      media:
        '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2688-1242.jpg',
      media:
        '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-828-1792.jpg',
      media:
        '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1792-828.jpg',
      media:
        '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1242-2208.jpg',
      media:
        '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-2208-1242.jpg',
      media:
        '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-750-1334.jpg',
      media:
        '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1334-750.jpg',
      media:
        '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-640-1136.jpg',
      media:
        '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      rel: 'apple-touch-startup-image',
      href: 'assets/icons/apple-splash-1136-640.jpg',
      media:
        '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    },
  ];

  const appleSplashIcons = appleSplashIconsData.map(({ rel, href, media }) => {
    const link = createNode('link');
    setAttribute(link, 'rel', rel);
    setAttribute(link, 'href', href);
    setAttribute(link, 'media', media);
    return link;
  });

  [
    manifestPWALinkTag,
    themeColorPwaMetaTag,
    appleMobileWebAppCapableMetaTag,
    appleMobileWebStatusBarStyleMetaTag,
    appleTouchIconLink,
    ...appleSplashIcons,
  ].forEach((el) => append(head, el));

  const noScriptTag = createNode('noscript');
  setText(noScriptTag, 'You need to enable JavaScript to run this app.');

  append(body, noScriptTag);

  return serialize(doc);
};

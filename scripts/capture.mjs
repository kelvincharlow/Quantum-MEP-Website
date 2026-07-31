import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});

const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await desktop.goto("http://localhost:3100", { waitUntil: "networkidle" });
await desktop.screenshot({ path: "desktop-preview.png" });
await desktop.locator(".site-header").screenshot({ path: "desktop-navigation-preview.png" });
await desktop.locator(".services-preview").screenshot({ path: "desktop-services-preview.png" });
await desktop.locator(".featured").screenshot({ path: "desktop-featured-preview.png" });
await desktop.locator(".industries").screenshot({ path: "desktop-industries-preview.png" });
await desktop.locator(".why").screenshot({ path: "desktop-why-preview.png" });
await desktop.locator(".cta-section").screenshot({ path: "desktop-cta-preview.png" });
await desktop.locator(".footer").screenshot({ path: "desktop-footer-preview.png" });
const desktopCtaBox = await desktop.locator(".cta-section").boundingBox();
if (desktopCtaBox) {
  await desktop.screenshot({
    path: "desktop-cta-footer-preview.png",
    clip: {
      x: 0,
      y: Math.max(0, desktopCtaBox.y - 80),
      width: 1440,
      height: desktopCtaBox.height + 300,
    },
  });
}

const aboutDesktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await aboutDesktop.goto("http://localhost:3100/about", { waitUntil: "networkidle" });
await aboutDesktop.screenshot({ path: "desktop-about-preview.png", fullPage: true });

const servicesDesktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await servicesDesktop.goto("http://localhost:3100/services", { waitUntil: "networkidle" });
await servicesDesktop.screenshot({ path: "desktop-services-page-preview.png", fullPage: true });

const projectsDesktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await projectsDesktop.goto("http://localhost:3100/projects", { waitUntil: "networkidle" });
await projectsDesktop.screenshot({ path: "desktop-projects-page-preview.png", fullPage: true });

const contactDesktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await contactDesktop.goto("http://localhost:3100/contact", { waitUntil: "networkidle" });
await contactDesktop.screenshot({ path: "desktop-contact-page-preview.png", fullPage: true });

const tablet = await browser.newPage({ viewport: { width: 820, height: 900 } });
await tablet.goto("http://localhost:3100", { waitUntil: "networkidle" });
await tablet.locator(".footer").screenshot({ path: "tablet-footer-preview.png" });
await tablet.getByRole("button", { name: "Open menu" }).click();
await tablet.waitForTimeout(450);
await tablet.screenshot({ path: "tablet-navigation-preview.png" });

const narrow = await browser.newPage({ viewport: { width: 256, height: 720 }, isMobile: true, hasTouch: true });
await narrow.goto("http://localhost:3100", { waitUntil: "networkidle" });
await narrow.getByRole("button", { name: "Open menu" }).click();
await narrow.waitForTimeout(450);
await narrow.screenshot({ path: "narrow-navigation-preview.png" });

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});
await mobile.goto("http://localhost:3100", { waitUntil: "networkidle" });
await mobile.screenshot({ path: "mobile-preview.png" });
await mobile.locator(".services-preview").screenshot({ path: "mobile-services-preview.png" });
await mobile.locator(".featured").screenshot({ path: "mobile-featured-preview.png" });
await mobile.locator(".industries").screenshot({ path: "mobile-industries-preview.png" });
await mobile.locator(".why").screenshot({ path: "mobile-why-preview.png" });
await mobile.locator(".cta-section").screenshot({ path: "mobile-cta-preview.png" });
await mobile.locator(".footer").screenshot({ path: "mobile-footer-preview.png" });

const aboutMobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});
await aboutMobile.goto("http://localhost:3100/about", { waitUntil: "networkidle" });
await aboutMobile.screenshot({ path: "mobile-about-preview.png", fullPage: true });

const servicesMobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});
await servicesMobile.goto("http://localhost:3100/services", { waitUntil: "networkidle" });
await servicesMobile.screenshot({ path: "mobile-services-page-preview.png", fullPage: true });

const projectsMobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});
await projectsMobile.goto("http://localhost:3100/projects", { waitUntil: "networkidle" });
await projectsMobile.screenshot({ path: "mobile-projects-page-preview.png", fullPage: true });

const routes = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/projects/agc-tenwek-hospital-karen-clinic",
  "/contact",
  "/privacy",
];

for (const route of routes) {
  await mobile.goto(`http://localhost:3100${route}`, { waitUntil: "networkidle" });
  const dimensions = await mobile.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  if (dimensions.scrollWidth > dimensions.clientWidth) {
    const offenders = await mobile.evaluate(() =>
      [...document.querySelectorAll("*")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { tag: element.tagName, className: element.className, left: rect.left, right: rect.right };
        })
        .filter(({ left, right }) => left < -0.5 || right > document.documentElement.clientWidth + 0.5)
        .slice(0, 10),
    );
    throw new Error(`Horizontal overflow on ${route}: ${JSON.stringify({ dimensions, offenders })}`);
  }
  console.log(`${route}: ${dimensions.clientWidth}px viewport, no horizontal overflow`);
}

await mobile.goto("http://localhost:3100", { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Open menu" }).click();
await mobile.getByRole("navigation", { name: "Mobile navigation" }).waitFor();
await mobile.waitForTimeout(450);
await mobile.screenshot({ path: "mobile-navigation-preview.png" });
console.log("Mobile navigation opens successfully");

await mobile.goto("http://localhost:3100/contact", { waitUntil: "networkidle" });
await mobile.screenshot({ path: "mobile-contact-preview.png", fullPage: true });

await browser.close();

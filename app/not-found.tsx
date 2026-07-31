import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <span>404</span>
        <p className="eyebrow eyebrow--yellow">Page not found</p>
        <h1>This page could not be found.</h1>
        <p>The page may have moved, or the address may be incorrect.</p>
        <div className="button-row">
          <Link className="button button--primary" href="/">Return home</Link>
          <Link className="button button--light-outline" href="/projects">View projects</Link>
        </div>
      </div>
    </section>
  );
}

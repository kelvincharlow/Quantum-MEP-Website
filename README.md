# Quantum MEP Website

Premium corporate website for Quantum MEP Consultants.

## Project documentation

- [Design system](docs/DESIGN_SYSTEM.md)

## Local development

```bash
npm install
npm run dev
```

The current release uses the approved Quantum logo and supplied photography for
the featured projects. Clearly branded placeholders remain only where final
project or team photography has not yet been supplied.

The contact form is intentionally in preview mode until its recipient, secure
backup storage, and delivery service are confirmed.

## Sanity project management

The website includes an embedded Sanity Studio at `/studio`. Project pages,
portfolio filters, project counts, homepage featured work, project images,
galleries and SEO metadata are connected to the project schema. Until Sanity is
configured, the approved local project content remains active as a safe fallback.

1. Create or select a Sanity project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy `.env.example` to `.env.local` and add the project ID and dataset.
3. Create an Editor token and add it as `SANITY_API_WRITE_TOKEN` for the initial import only.
4. Run `npm run sanity:seed` once to upload the current five projects and available images.
5. Run `npm run dev`, then open `http://localhost:3000/studio` and sign in.
6. Add the local and deployed website origins to the Sanity project's CORS settings, with credentials allowed.

For immediate publishing updates, create a Sanity webhook pointing to
`https://your-domain.com/api/revalidate` with:

- Filter: `_type in ["project", "sector"]`
- Projection: `{_type, "slug": slug.current}`
- Events: create, update and delete
- Secret: the same value used for `SANITY_REVALIDATE_SECRET`

The write token is not required by the public website and should be removed from
the production environment after the initial seed.

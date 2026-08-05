import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  slug?: string;
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ message: "Missing SANITY_REVALIDATE_SECRET" }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret, true);

  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  if (body?._type !== "project" && body?._type !== "sector") {
    return NextResponse.json({ message: "No relevant content to revalidate" });
  }

  revalidatePath("/");
  revalidatePath("/projects");
  if (body._type === "project" && body.slug) revalidatePath(`/projects/${body.slug}`);

  return NextResponse.json({ revalidated: true, type: body._type, slug: body.slug });
}

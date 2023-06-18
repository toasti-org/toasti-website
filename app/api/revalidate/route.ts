import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

interface ReqRevalidate {
  secret: string;
  tag: string;
}

export const POST = async (req: NextRequest) => {
  // Bad Method
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  // Get request body
  const { secret, tag }: ReqRevalidate = await req.json();

  // Not authorized
  if (secret !== process.env.NEXT_DATOCMS_REVALIDATE_TOKEN) {
    return NextResponse.json(
      { error: "Unauthorized Request" },
      { status: 401 }
    );
  }

  // Doesnt specify tag to revalidate
  if (!tag) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  // Handle revalidate
  revalidateTag(tag);

  // Success response
  return NextResponse.json(
    { message: "Success Revalidating" },
    { status: 200 }
  );
};

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { Event } from "@/types/component";

export const POST = async (req: NextRequest) => {
  // Only allow POSTS
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  // Get event data (from body)
  const reqEvent = (await req.json()) as Event;

  // Secret
  const secret = process.env.NEXTAUTH_SECRET;

  // Get JWT Token
  const token = await getToken({ req, secret });

  // If no token, return error 401
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized Request" },
      { status: 401 }
    );
  }

  // Get Google Provider Access Token
  const access_token = token.access_token as string;

  // Input date in UTC Format
  // An Event is assumed to be all day
  // reqEvent.date has a format "year-month-day" so defaults to 12 am (00:00:00)
  const timeZoneCorrection = 7 * 3600 * 1000;
  const dateStartNumberLocal =
    new Date(reqEvent.date).getTime() - timeZoneCorrection;
  const dateEndNumberLocal = dateStartNumberLocal + 24 * 3600 * 1000;
  const dateTimeStartISO = new Date(dateStartNumberLocal).toISOString();
  const dateTimeEndISO = new Date(dateEndNumberLocal).toISOString();

  // Event details
  const event = {
    summary: reqEvent.title,
    description: reqEvent.description,
    start: {
      dateTime: dateTimeStartISO,
      timeZone: "Asia/Jakarta",
    },
    end: {
      dateTime: dateTimeEndISO,
      timeZone: "Asia/Jakarta",
    },
  };

  // Fetch request to Google Calendar API
  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}` },
      body: JSON.stringify(event),
    }
  );
  const resJSON = await res.json();

  if (res.ok) {
    // Success 2xx
    return NextResponse.json(
      { message: "Success add event to Calendar" },
      { status: res.status }
    );
  } else {
    // Error 4xx or 5xx
    return NextResponse.json(
      { error: resJSON.error.message },
      { status: res.status }
    );
  }
};

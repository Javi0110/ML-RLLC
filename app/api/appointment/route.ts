import { NextResponse } from "next/server";

type AppointmentPayload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  preferredDate?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as AppointmentPayload;

  if (!body.name || !body.phone || !body.email || !body.service || !body.message) {
    return NextResponse.json(
      { ok: false, message: "Missing required fields." },
      { status: 400 }
    );
  }

  // Placeholder endpoint. Integrate email/CRM provider here.
  return NextResponse.json({
    ok: true,
    receivedAt: new Date().toISOString()
  });
}

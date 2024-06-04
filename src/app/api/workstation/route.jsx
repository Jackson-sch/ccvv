import getSystemInfo from "@/models/Workstation/Workstation";

export async function GET() {
  const systemInfo = await getSystemInfo();
  return NextResponse.json(systemInfo);
}
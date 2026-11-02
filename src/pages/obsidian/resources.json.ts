import { getObsidianResources } from "@/utils/getObsidianResources";

export async function GET(): Promise<Response> {
  return Response.json(await getObsidianResources());
}

import { getObsidianResources } from "@/utils/get-obsidian-resources";

export async function GET(): Promise<Response> {
  return Response.json(await getObsidianResources());
}

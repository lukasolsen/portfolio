export async function fetchMarkdown(path: string): Promise<string> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch markdown from ${path}: ${response.statusText}`
    );
  }

  return await response.text();
}

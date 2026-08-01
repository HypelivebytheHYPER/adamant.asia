/**
 * github-repo.ts — read/write a single file in this repo via the GitHub
 * Contents API.
 *
 * The Vercel runtime filesystem is read-only, so the cron job cannot write a
 * post to disk. It commits it back to the repo instead, which triggers a fresh
 * Vercel build and re-prerenders /blog/[slug].
 *
 * Requires GITHUB_TOKEN with `contents: write` on HypelivebytheHYPER/adamant.asia.
 */

const API = "https://api.github.com";

export const REPO_OWNER = process.env.GITHUB_REPO_OWNER || "HypelivebytheHYPER";
export const REPO_NAME = process.env.GITHUB_REPO_NAME || "adamant.asia";
export const REPO_BRANCH = process.env.GITHUB_REPO_BRANCH || "main";

export class GitHubError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: string
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

function headers(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "adamant.asia-blog-cron",
  };
}

export interface RepoFile {
  /** Decoded UTF-8 file contents. */
  text: string;
  /** Blob SHA — required to update the file without clobbering a newer commit. */
  sha: string;
}

/** Read a file from the branch. Throws GitHubError on any non-200. */
export async function getRepoFile(
  path: string,
  token: string
): Promise<RepoFile> {
  const url = `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${REPO_BRANCH}`;
  const res = await fetch(url, { headers: headers(token), cache: "no-store" });

  if (!res.ok) {
    const body = await res.text();
    throw new GitHubError(`GET ${path} failed (${res.status})`, res.status, body);
  }

  const data = (await res.json()) as { content?: string; sha: string };
  if (typeof data.content !== "string") {
    throw new GitHubError(`${path} is not a file`, res.status, "");
  }

  return {
    text: Buffer.from(data.content, "base64").toString("utf8"),
    sha: data.sha,
  };
}

/**
 * Update a file. `sha` must be the blob SHA read immediately beforehand;
 * GitHub rejects the write with 409 if the file moved underneath us, which is
 * exactly the concurrency guard we want.
 */
export async function putRepoFile(
  path: string,
  text: string,
  sha: string,
  message: string,
  token: string
): Promise<{ commitSha: string; commitUrl: string }> {
  const url = `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(text, "utf8").toString("base64"),
      sha,
      branch: REPO_BRANCH,
      committer: {
        name: "adamant-blog-bot",
        email: "217405621+HypelivebytheHYPER@users.noreply.github.com",
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new GitHubError(`PUT ${path} failed (${res.status})`, res.status, body);
  }

  const data = (await res.json()) as {
    commit: { sha: string; html_url: string };
  };
  return { commitSha: data.commit.sha, commitUrl: data.commit.html_url };
}

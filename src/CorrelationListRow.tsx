import { useEffect, useState } from "react";

type corr_type = {
    species: string,
    correlation: number,
    cancer_type: string
}

const imageCache = new Map<string, string>();

const API = "https://api.phylopic.org";

/** Fetch a thumbnail URL for one node href. Tries primaryImage first;
 *  falls back to any image tagged to that node via filter_node. */
async function thumbnailForNode(nodeHref: string, build: number): Promise<string | null> {
    const nodeRes = await fetch(`${API}${nodeHref}`);
    if (!nodeRes.ok) return null;
    const nodeJson = await nodeRes.json();

    let imgHref: string | undefined = nodeJson?._links?.primaryImage?.href;

    if (!imgHref) {
        // No primary image — try any image tagged to this node.
        const uuid = nodeHref.match(/\/nodes\/([^?/]+)/)?.[1];
        if (uuid) {
            const listRes = await fetch(`${API}/images?build=${build}&filter_node=${uuid}&page=0`);
            if (listRes.ok) {
                const listJson = await listRes.json();
                imgHref = listJson?._links?.items?.[0]?.href;
            }
        }
    }

    if (!imgHref) return null;

    const imgRes = await fetch(`${API}${imgHref}`);
    if (!imgRes.ok) return null;
    const imgJson = await imgRes.json();
    // thumbnailFiles are full https://images.phylopic.org/… URLs; prefer 192×192 ([0]).
    return imgJson?._links?.thumbnailFiles?.[0]?.href
        ?? imgJson?._links?.thumbnailFiles?.[1]?.href
        ?? null;
}

/** Try up to `limit` autocomplete matches for `query`, returning the first
 *  thumbnail we can resolve, or null. */
async function lookupByName(query: string, limit = 3): Promise<string | null> {
    const autoRes = await fetch(`${API}/autocomplete?query=${encodeURIComponent(query)}`);
    if (!autoRes.ok) return null;
    const matches: string[] = (await autoRes.json())?.matches ?? [];

    for (const match of matches.slice(0, limit)) {
        // Nodes meta (no &page) — API redirect includes build number.
        const metaRes = await fetch(`${API}/nodes?filter_name=${encodeURIComponent(match)}`);
        if (!metaRes.ok) continue;
        const meta = await metaRes.json();
        if (!meta?.totalItems || !meta?._links?.firstPage?.href) continue;

        // Paginated page → item list.
        const pageRes = await fetch(`${API}${meta._links.firstPage.href}`);
        if (!pageRes.ok) continue;
        const items: Array<{ href: string }> = (await pageRes.json())?._links?.items ?? [];

        for (const item of items.slice(0, 2)) {
            const src = await thumbnailForNode(item.href, meta.build);
            if (src) return src;
        }
    }
    return null;
}

async function getPhylopicSilhouette(species: string): Promise<string> {
    if (imageCache.has(species)) return imageCache.get(species)!;

    const normalized = species.replace(/_/g, " ").trim().toLowerCase();
    const genus = normalized.split(" ")[0];

    try {
        // Try full species name first, fall back to genus if that yields nothing.
        const src =
            await lookupByName(normalized)
            ?? (genus !== normalized ? await lookupByName(genus) : null)
            ?? "";

        imageCache.set(species, src);
        return src;
    } catch {
        imageCache.set(species, "");
        return "";
    }
}

export default function CorrelationListRow({ d, i }: { d: corr_type, i: number }) {
    const [src, setSrc] = useState(() => imageCache.get(d.species) ?? "");

    useEffect(() => {
        let cancelled = false;
        if (imageCache.has(d.species)) {
            setSrc(imageCache.get(d.species)!);
            return;
        }
        getPhylopicSilhouette(d.species).then(url => {
            if (!cancelled) setSrc(url);
        });
        return () => { cancelled = true; };
    }, [d.species]);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "7px 10px",
                marginBottom: "4px",
                border: "1px solid #d0d7e2",
                borderRadius: "8px",
                background: "#f7f9fc",
            }}
        >
            <div style={{ fontWeight: "bold", fontSize: "0.95rem", width: "30px", textAlign: "center", color: "#6b7a99" }}>
                #{i + 1}
            </div>

            <div style={{ background: "#e6edff", padding: "3px 8px", borderRadius: "6px", fontWeight: 600, minWidth: "60px", textAlign: "center", fontSize: "0.88rem" }}>
                {d.correlation.toFixed(3)}
            </div>

            {src && (
                <img
                    src={src}
                    alt=""
                    width={38}
                    height={38}
                    style={{ objectFit: "contain", flexShrink: 0 }}
                />
            )}
            {!src && <div style={{ width: 38, height: 38, flexShrink: 0 }} />}

            <div style={{ flex: 1, minWidth: 0 }}>
                <a
                    href={"https://en.wikipedia.org/wiki/" + d.species}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1f4fd1", textDecoration: "none", fontWeight: 600 }}
                >
                    <em>{d.species.replace(/_/g, " ")}</em>
                </a>
            </div>
        </div>
    );
}

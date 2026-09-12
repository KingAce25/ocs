"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deletePost } from "@/app/admin/(dashboard)/blog/actions";

const STATUSES = ["All", "Published", "Draft"];

const tagColors = {
  Announcement: "border-[#c9a84c]/40 text-[#c9a84c]",
  Ranks: "border-[#D85A30]/40 text-[#F0997B]",
  Community: "border-[#1D9E75]/40 text-[#5DCAA5]",
  Events: "border-[#534AB7]/40 text-[#AFA9EC]",
  Devotional: "border-[#993556]/40 text-[#ED93B1]",
  Training: "border-[#888780]/40 text-[#D3D1C7]",
};

export default function BlogList({ initialPosts, canEdit }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = posts.filter((p) => {
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  function handleDelete(id) {
    startTransition(async () => {
      const result = await deletePost(id);
      if (result?.error) {
        setError(result.error);
        setDeleteConfirm(null);
        return;
      }
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    });
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
              Content
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
              Blog Posts
            </h1>
            {!canEdit && (
              <p className="text-white/20 text-xs font-['Barlow'] mt-1">
                View only
              </p>
            )}
          </div>
          {canEdit && (
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all duration-200"
            >
              + New Post
            </Link>
          )}
        </div>

        {error && (
          <div className="border border-red-500/30 bg-red-500/[0.05] text-red-400 text-sm font-['Barlow'] px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 border font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase transition-all duration-150 ${
                  statusFilter === s
                    ? "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]"
                    : "border-white/10 text-white/35 hover:text-white/60"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/[0.04] border border-white/15 text-white/80 font-['Barlow'] text-sm placeholder-white/20 px-4 py-1.5 outline-none focus:border-[#c9a84c]/40 transition-colors"
          />
        </div>

        {/* Table */}
        <div className="border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] text-white/25 px-6 py-3">
                    Title
                  </th>
                  <th className="text-left text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] text-white/25 px-4 py-3 hidden md:table-cell">
                    Tag
                  </th>
                  <th className="text-left text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] text-white/25 px-4 py-3 hidden lg:table-cell">
                    Author
                  </th>
                  <th className="text-left text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] text-white/25 px-4 py-3 hidden sm:table-cell">
                    Status
                  </th>
                  <th className="text-left text-[10px] tracking-[0.2em] uppercase font-['Barlow_Condensed'] text-white/25 px-4 py-3 hidden lg:table-cell">
                    Date
                  </th>
                  {canEdit && <th className="px-4 py-3 w-28" />}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={canEdit ? 6 : 5}
                      className="px-6 py-12 text-center text-white/25 font-['Cormorant_Garamond'] italic text-lg"
                    >
                      No posts found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-white/80 text-sm font-['Barlow'] font-500 truncate">
                          {post.title}
                        </p>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span
                          className={`border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase font-['Barlow_Condensed'] ${tagColors[post.tag] ?? "border-white/20 text-white/40"}`}
                        >
                          {post.tag}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <p className="text-white/40 text-xs font-['Barlow'] truncate max-w-[140px]">
                          {post.author}
                        </p>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span
                          className={`text-xs font-['Barlow_Condensed'] tracking-wider px-2 py-0.5 border ${
                            post.status === "Published"
                              ? "border-[#1D9E75]/40 text-[#5DCAA5] bg-[#1D9E75]/10"
                              : "border-white/20 text-white/35"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <p className="text-white/30 text-xs font-['Barlow']">
                          {post.date}
                        </p>
                      </td>
                      {canEdit && (
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                              href={`/admin/blog/${post.id}`}
                              className="text-white/40 hover:text-[#c9a84c] text-xs font-['Barlow_Condensed'] tracking-wider uppercase transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(post.id)}
                              className="text-white/25 hover:text-red-400 text-xs font-['Barlow_Condensed'] tracking-wider uppercase transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-white/10">
            <p className="text-white/20 text-xs font-['Barlow']">
              {filtered.length} post{filtered.length !== 1 ? "s" : ""} shown
            </p>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => !isPending && setDeleteConfirm(null)}
        >
          <div
            className="bg-[#0a0f1e] border border-white/15 p-8 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-['Cormorant_Garamond'] text-white text-2xl font-600 mb-3">
              Delete Post?
            </h3>
            <p className="text-white/50 text-sm font-['Barlow'] font-300 mb-6">
              This action cannot be undone. The post will be permanently
              removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={isPending}
                className="flex-1 bg-red-500/80 hover:bg-red-500 disabled:opacity-50 text-white py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-colors"
              >
                {isPending ? "Deleting…" : "Delete"}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={isPending}
                className="flex-1 border border-white/15 text-white/50 hover:text-white/80 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

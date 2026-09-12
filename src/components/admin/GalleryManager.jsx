"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@@/lib/supabase/client";

const cats = ["Muster", "Ceremony", "Training", "Outreach", "Fellowship"];

export default function GalleryManager({ initialPhotos, canEdit }) {
  const supabase = createClient();
  const fileInputRef = useRef(null);

  const [photos, setPhotos] = useState(initialPhotos);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    year: new Date().getFullYear(),
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  function acceptFile(f) {
    if (!f) return;
    if (!["image/png", "image/jpeg"].includes(f.type)) {
      setError("Only JPG and PNG images are supported.");
      return;
    }
    setError("");
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function handleFileSelect(e) {
    acceptFile(e.target.files?.[0]);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);
    acceptFile(e.dataTransfer.files?.[0]);
  }

  function resetForm() {
    setForm({ title: "", category: "", year: new Date().getFullYear() });
    setFile(null);
    setPreviewUrl(null);
    setAdding(false);
    setError("");
  }

  async function handleAdd() {
    if (!canEdit) return;
    if (!form.title || !form.category || !file) {
      setError("Title, category, and an image are all required.");
      return;
    }

    setUploading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(path, file);

    if (uploadError) {
      setUploading(false);
      console.error("Failed to upload image:", uploadError);
      setError("Failed to upload image. Please try again.");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("gallery").getPublicUrl(path);

    const { data: inserted, error: insertError } = await supabase
      .from("gallery_items")
      .insert({
        title: form.title,
        category: form.category,
        year: form.year,
        image_url: publicUrl,
        storage_path: path,
        uploaded_by: user.id,
        status: "approved",
      })
      .select()
      .single();

    setUploading(false);

    if (insertError) {
      console.error("Failed to save gallery item:", insertError);
      // Clean up the orphaned storage object since the DB row failed
      await supabase.storage.from("gallery").remove([path]);
      setError("Failed to save photo details. Please try again.");
      return;
    }

    setPhotos((prev) => [inserted, ...prev]);
    resetForm();
  }

  async function handleDelete(photo) {
    if (!canEdit) return;
    setDeleting(true);

    if (photo.storage_path) {
      await supabase.storage.from("gallery").remove([photo.storage_path]);
    }

    const { error: deleteError } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", photo.id);

    setDeleting(false);

    if (deleteError) {
      console.error("Failed to delete gallery item:", deleteError);
      return;
    }

    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setDeleteConfirm(null);
  }

  const inputCls =
    "bg-white/[0.04] border border-white/15 text-white/80 font-['Barlow'] text-sm px-3 py-2 outline-none focus:border-[#c9a84c]/40 transition-colors w-full";

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-1">
              Content
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
              Gallery
            </h1>
            {!canEdit && (
              <p className="text-white/20 text-xs font-['Barlow'] mt-1">
                View only
              </p>
            )}
          </div>
          {canEdit && (
            <button
              onClick={() => setAdding(true)}
              className="bg-[#c9a84c] hover:bg-[#b8972e] text-[#0a0f1e] px-5 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
            >
              + Upload Photo
            </button>
          )}
        </div>

        {/* Upload form */}
        {canEdit && adding && (
          <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] p-6 mb-6">
            <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-4">
              Add New Photo
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Photo title…"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className={inputCls}
              />
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className={`${inputCls} cursor-pointer`}
              >
                <option value="">Select category…</option>
                {cats.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                type="number"
                value={form.year}
                onChange={(e) =>
                  setForm((f) => ({ ...f, year: parseInt(e.target.value, 10) }))
                }
                className={inputCls}
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`w-full border-2 border-dashed rounded p-8 text-center mb-4 transition-colors ${
                isDragging
                  ? "border-[#c9a84c]/70 bg-[#c9a84c]/[0.06]"
                  : "border-white/15 hover:border-[#c9a84c]/40"
              }`}
            >
              {previewUrl ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-40 h-28">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <p className="text-white/40 text-xs font-['Barlow']">
                    {file?.name} — click, or drag a new image, to change
                  </p>
                </div>
              ) : (
                <>
                  <p
                    className={`text-sm font-['Barlow'] ${isDragging ? "text-[#c9a84c]" : "text-white/30"}`}
                  >
                    {isDragging
                      ? "Drop to add image"
                      : "Drag & drop an image, or click to browse"}
                  </p>
                  <p className="text-white/15 text-xs font-['Barlow'] mt-1">
                    JPG, PNG up to 10MB — stored in Supabase Storage
                  </p>
                </>
              )}
            </button>

            {error && (
              <p className="text-red-400 text-xs font-['Barlow'] mb-4">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={uploading}
                className="bg-[#c9a84c] hover:bg-[#b8972e] disabled:opacity-50 text-[#0a0f1e] px-5 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase font-700 transition-all"
              >
                {uploading ? "Uploading…" : "Save"}
              </button>
              <button
                onClick={resetForm}
                disabled={uploading}
                className="border border-white/15 text-white/40 hover:text-white/70 px-5 py-2 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {photos.length === 0 ? (
          <p className="text-white/30 text-sm font-['Barlow'] text-center py-12">
            No photos yet{canEdit ? " — upload the first one above." : "."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((p) => (
              <div
                key={p.id}
                className="border border-white/10 bg-white/[0.02] group"
              >
                <div className="relative aspect-[4/3] bg-white/[0.04] border-b border-white/10">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-white/15 text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
                        No image
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-4 flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-sm font-['Barlow'] truncate">
                      {p.title}
                    </p>
                    <p className="text-white/25 text-xs font-['Barlow'] mt-0.5">
                      {p.category} · {p.year}
                    </p>
                  </div>
                  {canEdit && (
                    <button
                      onClick={() => setDeleteConfirm(p)}
                      className="text-white/20 hover:text-red-400 text-xs transition-colors shrink-0"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => !deleting && setDeleteConfirm(null)}
        >
          <div
            className="bg-[#0a0f1e] border border-white/15 p-8 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-['Cormorant_Garamond'] text-white text-2xl font-600 mb-3">
              Delete Photo?
            </h3>
            <p className="text-white/50 text-sm font-['Barlow'] mb-6">
              This will remove the photo permanently.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="flex-1 bg-red-500/80 hover:bg-red-500 disabled:opacity-50 text-white py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="flex-1 border border-white/15 text-white/50 py-2.5 font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase disabled:opacity-50"
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

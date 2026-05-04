"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePortfolioDraftAction } from "@/app/actions/portfolios";

export function DeleteDraftButton({ portfolioId, draftTitle }: { portfolioId: string; draftTitle: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${draftTitle}"? This will permanently remove the saved draft.`);

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    const result = await deletePortfolioDraftAction(portfolioId);

    if (result.status === "error") {
      setIsDeleting(false);
      setErrorMessage(result.message);
      return;
    }

    router.refresh();
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => void handleDelete()}
        disabled={isDeleting}
        className="inline-flex rounded-full border border-black/10 px-4 py-2.5 text-sm font-medium text-black transition-colors duration-150 hover:bg-black/[0.04] disabled:cursor-wait disabled:opacity-70"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {errorMessage ? <p className="text-sm text-[#b42318]">{errorMessage}</p> : null}
    </div>
  );
}

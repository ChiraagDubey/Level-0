import type { User } from "@supabase/supabase-js";
import type { TemplateGalleryEntry } from "@/lib/templates";
import { TemplateGalleryCard } from "@/components/templates/TemplateGalleryCard";

export function TemplateCard({
  template,
  user,
}: {
  template: TemplateGalleryEntry;
  user: User | null;
}) {
  return <TemplateGalleryCard template={template} variant="dashboard" user={user} />;
}

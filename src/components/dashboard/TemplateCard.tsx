import type { TemplateGalleryEntry } from "@/lib/templates";
import { TemplateGalleryCard } from "@/components/templates/TemplateGalleryCard";

export function TemplateCard({ template }: { template: TemplateGalleryEntry }) {
  return <TemplateGalleryCard template={template} variant="dashboard" />;
}

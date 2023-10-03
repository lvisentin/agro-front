import { Document } from "@/shared/models/documents/Documents.model";

export interface NewDocumentModalProps {
  refetch: () => void;
  document?: Document;
}

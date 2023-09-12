"use client";

import { Document } from "@/shared/services/documents/Documents.model";
import { documentsService } from "@/shared/services/documents/DocumentsService";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import styles from "./documents.module.scss";

function DocumentsPage() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentsService.fetchDocuments(),
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="documents__wrapper">
      <div className="prose">
        <h2 className="prose-h2">Documentos</h2>
      </div>

      <div className="documents__list mt-4">
        {data?.map((document: Document) => (
          <div className={`${styles.document} document text-center w-fit cursor-pointer`} key={document._id}>
            <Image
              src={document.src}
              alt={document.name}
              className="mb-2 rounded-md"
              width={150}
              height={150}
            />
            <span className={`document__name`}>{document.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;

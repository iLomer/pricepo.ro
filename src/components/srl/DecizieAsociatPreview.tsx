"use client";

import { useRef } from "react";
import type { DecizieFormData } from "./DecizieAsociatForm";

function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "___________";
  const date = new Date(dateStr);
  return date.toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

interface DecizieAsociatPreviewProps {
  formData: DecizieFormData;
}

export function DecizieAsociatPreview({ formData }: DecizieAsociatPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const grossDividend = parseFloat(formData.grossDividend) || 0;
  const dividendTax = grossDividend * 0.05;
  const netDividend = grossDividend - dividendTax;

  const isComplete =
    formData.companyName &&
    formData.cui &&
    formData.associateName &&
    formData.grossDividend &&
    formData.distributionDate;

  function handlePrint() {
    if (!printRef.current) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const printStyles = `
      body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 14px;
        line-height: 1.6;
        max-width: 700px;
        margin: 40px auto;
        padding: 20px;
        color: #000;
      }
      h1 { font-size: 16px; text-align: center; margin-bottom: 8px; }
      h2 { font-size: 14px; text-align: center; margin-bottom: 24px; font-weight: normal; }
      .header { text-align: center; margin-bottom: 32px; }
      .body { text-align: justify; }
      .signature { margin-top: 48px; }
      .disclaimer {
        margin-top: 48px;
        padding-top: 16px;
        border-top: 1px solid #ccc;
        font-size: 10px;
        color: #666;
        font-style: italic;
      }
      @media print {
        body { margin: 20px; }
        .disclaimer { color: #999; }
      }
    `;

    const doc = printWindow.document;
    doc.open();
    doc.write("<!DOCTYPE html><html><head>");
    doc.write("<title>Decizia Asociatului Unic</title>");
    doc.write("</head><body></body></html>");
    doc.close();

    const style = doc.createElement("style");
    style.textContent = printStyles;
    doc.head.appendChild(style);

    // Clone the preview content into the print window safely (no innerHTML injection)
    const clone = printRef.current.cloneNode(true);
    doc.body.appendChild(doc.adoptNode(clone));
    printWindow.document.close();
    printWindow.print();
  }

  return (
    <div className="space-y-4">
      {/* Print button */}
      <div className="flex justify-end">
        <button
          onClick={handlePrint}
          disabled={!isComplete}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-secondary-300"
        >
          Exporta ca PDF
        </button>
      </div>

      {/* Document preview */}
      <div className="rounded-xl border border-secondary-200 bg-white p-6 sm:p-8">
        <div ref={printRef}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <p style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>{formData.companyName || "_______________"}</strong>
            </p>
            <p style={{ fontSize: "11px", color: "#555" }}>
              CUI: {formData.cui || "_______________"} |{" "}
              {formData.jNumber ? `Nr. Reg. Com.: ${formData.jNumber}` : "Nr. Reg. Com.: _______________"}
            </p>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "16px",
              textAlign: "center",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            DECIZIA ASOCIATULUI UNIC
          </h1>
          <h2
            style={{
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "24px",
              fontWeight: "normal",
            }}
          >
            Nr. {formData.decisionNumber || "___"} / {formatDate(formData.distributionDate)}
          </h2>

          {/* Body */}
          <div style={{ textAlign: "justify", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "16px" }}>
              Subsemnatul/Subsemnata{" "}
              <strong>{formData.associateName || "_______________"}</strong>,
              {formData.associateCNP && (
                <> CNP <strong>{formData.associateCNP}</strong>,</>
              )}
              {" "}in calitate de asociat unic al societatii{" "}
              <strong>{formData.companyName || "_______________"}</strong>,
              cu sediul social in _______________,
              inregistrata la Oficiul Registrului Comertului sub nr.{" "}
              <strong>{formData.jNumber || "_______________"}</strong>,
              avand CUI <strong>{formData.cui || "_______________"}</strong>,
            </p>

            <p style={{ marginBottom: "16px" }}>
              In temeiul Legii nr. 31/1990 privind societatile, republicata,
              cu modificarile si completarile ulterioare, si al actului constitutiv
              al societatii,
            </p>

            <p style={{ marginBottom: "8px", fontWeight: "bold" }}>DECIDE:</p>

            <p style={{ marginBottom: "16px" }}>
              <strong>Art. 1.</strong> Se aproba distribuirea de dividende din
              profitul net realizat in anul fiscal{" "}
              <strong>{formData.fiscalYear || "___"}</strong>, in suma bruta de{" "}
              <strong>
                {grossDividend > 0 ? `${formatLei(grossDividend)} lei` : "___________ lei"}
              </strong>
              , catre asociatul unic{" "}
              <strong>{formData.associateName || "_______________"}</strong>.
            </p>

            <p style={{ marginBottom: "16px" }}>
              <strong>Art. 2.</strong> Din suma bruta a dividendelor se va retine
              impozitul pe dividende in cuantum de 5%, respectiv{" "}
              <strong>
                {grossDividend > 0 ? `${formatLei(dividendTax)} lei` : "___________ lei"}
              </strong>
              . Suma neta de distribuit este de{" "}
              <strong>
                {grossDividend > 0 ? `${formatLei(netDividend)} lei` : "___________ lei"}
              </strong>
              .
            </p>

            <p style={{ marginBottom: "16px" }}>
              <strong>Art. 3.</strong> Plata dividendelor se va efectua la data de{" "}
              <strong>{formatDate(formData.distributionDate)}</strong>{" "}
              sau in cel mai scurt termen posibil dupa adoptarea prezentei decizii.
            </p>

            <p style={{ marginBottom: "16px" }}>
              <strong>Art. 4.</strong> Impozitul pe dividende va fi retinut la sursa
              si virat la bugetul de stat conform prevederilor legale in vigoare,
              prin Declaratia 100 aferenta trimestrului in care s-a efectuat plata.
            </p>

            <p style={{ marginBottom: "16px" }}>
              <strong>Art. 5.</strong> Prezenta decizie a fost adoptata astazi,{" "}
              <strong>{formatDate(formData.distributionDate)}</strong>,
              in conformitate cu dispozitiile legale si ale actului constitutiv.
            </p>
          </div>

          {/* Signature */}
          <div style={{ marginTop: "48px" }}>
            <p style={{ marginBottom: "4px" }}>
              <strong>Asociat Unic,</strong>
            </p>
            <p style={{ marginBottom: "32px" }}>
              {formData.associateName || "_______________"}
            </p>
            <p>Semnatura: _______________</p>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              marginTop: "48px",
              paddingTop: "16px",
              borderTop: "1px solid #ccc",
              fontSize: "10px",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            <p>
              Document generat automat. Verificati conformitatea cu legislatia in vigoare.
            </p>
            <p>Generat cu Prevo -- platforma de educatie fiscala</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { AdminProblemStatement } from '../types/admin';

/**
 * Downloads a Word document for a problem statement.
 * If a custom document was uploaded (as data URL or link), downloads that file directly.
 * Otherwise, generates a formatted Word Document (.doc / .docx compatible) with official letterhead.
 */
export function downloadProblemStatementWordDoc(ps: AdminProblemStatement) {
  const filename = ps.documentName || `PRAGYAN2K26_${ps.id}_${ps.title.slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_')}.docx`;

  // If a custom document exists (e.g. /pragyan/PRAGYAN_2K26_PS_3-01.docx, http, https, or blob), download it directly
  if (ps.documentUrl && (
    ps.documentUrl.startsWith('/') ||
    ps.documentUrl.startsWith('./') ||
    ps.documentUrl.startsWith('http:') ||
    ps.documentUrl.startsWith('https:') ||
    ps.documentUrl.startsWith('blob:') ||
    ps.documentUrl.startsWith('data:')
  )) {
    if (ps.documentUrl.startsWith('/') || ps.documentUrl.startsWith('./')) {
      fetch(ps.documentUrl)
        .then(res => {
          if (!res.ok) throw new Error('File fetch failed');
          return res.blob();
        })
        .then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
        })
        .catch(() => {
          const link = document.createElement('a');
          link.href = ps.documentUrl!;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      return;
    }

    const link = document.createElement('a');
    link.href = ps.documentUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Generate an authentic Microsoft Word compatible document with rich formatting
  const docContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${ps.title}</title>
      <style>
        body {
          font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #1a1a1a;
          margin: 1.5in 1in 1in 1in;
        }
        .header-box {
          border-bottom: 2pt solid #162E28;
          padding-bottom: 12pt;
          margin-bottom: 20pt;
        }
        .institution {
          font-size: 16pt;
          font-weight: bold;
          color: #162E28;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .sub-inst {
          font-size: 10pt;
          color: #A77A1C;
          font-weight: 600;
          text-transform: uppercase;
          margin-top: 2pt;
        }
        .event-badge {
          display: inline-block;
          background-color: #162E28;
          color: #E5BE61;
          padding: 4pt 10pt;
          font-size: 10pt;
          font-weight: bold;
          margin-top: 8pt;
          border-radius: 4pt;
        }
        .title-section {
          margin-top: 15pt;
          margin-bottom: 20pt;
        }
        .track-tag {
          font-size: 10pt;
          font-weight: bold;
          color: #A77A1C;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        h1 {
          font-size: 18pt;
          color: #162E28;
          margin-top: 4pt;
          margin-bottom: 8pt;
          line-height: 1.25;
        }
        .meta-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 18pt;
        }
        .meta-table td {
          padding: 6pt 10pt;
          border: 1pt solid #D2CAB6;
          font-size: 10pt;
        }
        .meta-label {
          background-color: #F3EDE0;
          font-weight: bold;
          width: 28%;
          color: #162E28;
        }
        h2 {
          font-size: 13pt;
          color: #162E28;
          border-left: 3pt solid #A77A1C;
          padding-left: 6pt;
          margin-top: 16pt;
          margin-bottom: 8pt;
          text-transform: uppercase;
        }
        p {
          margin-bottom: 10pt;
          text-align: justify;
        }
        ul {
          margin-top: 4pt;
          margin-bottom: 12pt;
          padding-left: 20pt;
        }
        li {
          margin-bottom: 4pt;
        }
        .footer-note {
          margin-top: 30pt;
          border-top: 1pt solid #ccc;
          padding-top: 8pt;
          font-size: 9pt;
          color: #666;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="header-box">
        <div class="institution">SANJIVANI UNIVERSITY, KOPARGAON</div>
        <div class="sub-inst">Institution's Innovation Council (IIC) & Entrepreneurship Development Cell (EDC)</div>
        <div class="event-badge">PRAGYAN 2K26 NATIONAL HACKATHON GRAND FINALE</div>
      </div>

      <div class="title-section">
        <div class="track-tag">${ps.trackTitle || 'INNOVATION TRACK'} &bull; CODE: ${ps.id}</div>
        <h1>${ps.title}</h1>
      </div>

      <table class="meta-table">
        <tr>
          <td class="meta-label">Problem Statement ID</td>
          <td><strong>${ps.id}</strong></td>
        </tr>
        <tr>
          <td class="meta-label">Track</td>
          <td>${ps.trackTitle} (${ps.trackId})</td>
        </tr>
        <tr>
          <td class="meta-label">Difficulty Level</td>
          <td>${ps.difficulty || 'Intermediate'}</td>
        </tr>
        <tr>
          <td class="meta-label">Document Release</td>
          <td>Official Specification Brief</td>
        </tr>
      </table>

      <h2>1. Overview & Executive Summary</h2>
      <p>${ps.description || 'This problem statement addresses real-world enterprise, economic, and technological bottlenecks requiring novel digital applications and robust execution.'}</p>

      <h2>2. Background & Problem Context</h2>
      <p>${ps.context || 'Participants are tasked with building a demonstrable solution addressing end-to-end operational constraints, scalability concerns, data privacy requirements, and seamless user interaction.'}</p>

      <h2>3. Key Objectives & Expected Outcomes</h2>
      <ul>
        <li>Synthesize and ingest alternate and direct data signals relevant to the domain.</li>
        <li>Architect a robust, modular, and privacy-compliant technical engine or business framework.</li>
        <li>Build a functional prototype, dashboard, or mobile-responsive interface accessible to end stakeholders.</li>
        <li>Demonstrate algorithmic rigor, operational sustainability, and economic impact.</li>
      </ul>

      <h2>4. Deliverables for Grand Finale Jury Evaluation</h2>
      <ul>
        <li>Working software / prototype demonstration or algorithmic workflow.</li>
        <li>Architecture diagram with data flow and security measures.</li>
        <li>Final presentation deck highlighting feasibility, cost structure, and future scaling milestones.</li>
      </ul>

      <h2>5. Hackathon Rules & Guidelines</h2>
      <p>All work must be original and developed within the scope of PRAGYAN 2K26. Open source libraries and frameworks are permitted with proper attribution. Decision of the jury committee will be final.</p>

      <div class="footer-note">
        &copy; 2026 Sanjivani University, Kopargaon | PRAGYAN 2K26 Organizing Committee | All Rights Reserved
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([docContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.docx') || filename.endsWith('.doc') ? filename : `${filename}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

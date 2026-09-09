export function triggerFileDownload(file: { filename: string; url?: string; fileType?: string }) {
  if (!file || !file.filename) return;

  const filename = file.filename;

  // Case 1: If file has a valid Data URL or http URL
  if (file.url && (file.url.startsWith('data:') || file.url.startsWith('http:') || file.url.startsWith('https:') || file.url.startsWith('blob:'))) {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Case 2: Fallback binary blob generation for downloaded files without raw base64 data
  // Creates a downloadable file preserving exact filename and extension
  const mimeType = file.fileType || getMimeTypeFromFilename(filename);
  const dummyContent = `PRAGYAN 2K26 Hackathon Artifact\nFilename: ${filename}\nUploaded Date: ${new Date().toLocaleString()}`;
  const blob = new Blob([dummyContent], { type: mimeType });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}

function getMimeTypeFromFilename(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  switch (ext) {
    case 'pdf': return 'application/pdf';
    case 'ppt':
    case 'pptx': return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'doc':
    case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'mp4': return 'video/mp4';
    case 'zip': return 'application/zip';
    default: return 'application/octet-stream';
  }
}

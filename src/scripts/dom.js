export const ownerDocument = node => {
  return (node && node.ownerDocument) || document;
};

export const ownerWindow = (node, fallback = window) => {
  const doc = ownerDocument(node);
  return doc.defaultView || doc.parentView || fallback;
};

const IMAGE_MAP = {
  // Add your own mappings here when you drop files into public/images/objects/
  // Example:
  // "washing-machine": "/images/objects/washing-machine.png",
  "traffic-lights": "/images/objects/traffic-light-193658_640.jpg",
  "washing-machine": "/images/objects/washing-machine-1786385_640.png",
  "smartphone": "/images/objects/smartphone.png",
  "pencil": "/images/objects/pencil.png",
  "chair": "/images/objects/chair.png",
  "tree": "/images/objects/tree.png",
  "road": "/images/objects/road.png",
  "microphone": "/images/objects/microphone.png",
  "book": "/images/objects/book.png",
  "soap": "/images/objects/soap.png",
};

const normalizeKey = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getImageForItem = (item) => {
  if (!item) return null;
  if (item.image) return item.image;

  const key = item.imageKey
    ? normalizeKey(item.imageKey)
    : item.label
    ? normalizeKey(item.label)
    : null;

  if (!key) return null;
  return IMAGE_MAP[key] || null;
};

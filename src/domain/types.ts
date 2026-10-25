export type ServiceOption = {
  id: string;
  label: string;
  kind: "editing" | "album" | "printing";
  enabled: boolean;
};

export type EventRecord = {
  id: string;
  photographerId: string;
  title: string;
  clientId: string;
  galleryPublished: boolean;
  photoIds: string[];
  serviceOptions: ServiceOption[];
};

export type PhotoSelection = {
  id: string;
  eventId: string;
  clientId: string;
  photoIds: string[];
  requestedServices: string[];
  status: "submitted" | "in_review" | "completed";
  createdAt: string;
};

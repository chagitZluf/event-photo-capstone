import type { EventRecord, PhotoSelection } from "../domain/types.js";

export class MemoryStore {
  events: EventRecord[] = [
    {
      id: "event-100",
      photographerId: "studio-amber",
      title: "Cohen Wedding",
      clientId: "client-100",
      galleryPublished: true,
      photoIds: ["photo-1", "photo-2", "photo-3"],
      serviceOptions: [
        { id: "retouching", label: "Professional retouching", kind: "editing", enabled: true },
        { id: "album-premium", label: "Premium album", kind: "album", enabled: true },
        { id: "print-10x15", label: "10x15 print", kind: "printing", enabled: false }
      ]
    },
    {
      id: "event-200",
      photographerId: "studio-blue",
      title: "Levi Family Portraits",
      clientId: "client-200",
      galleryPublished: true,
      photoIds: ["photo-4", "photo-5"],
      serviceOptions: [
        { id: "basic-edit", label: "Basic editing", kind: "editing", enabled: true }
      ]
    }
  ];

  selections: PhotoSelection[] = [];

  findEventForPhotographer(eventId: string, photographerId: string) {
    return this.events.find(
      event => event.id === eventId && event.photographerId === photographerId
    );
  }

  findClientEvent(eventId: string, clientId: string) {
    return this.events.find(event => event.id === eventId && event.clientId === clientId);
  }
}

export const store = new MemoryStore();

import type { EventRecord, PhotoSelection } from "../domain/types.js";
import type { MemoryStore } from "../data/memory-store.js";

export class EventService {
  constructor(private readonly store: MemoryStore) {}

  listEvents(photographerId: string) {
    return this.store.events
      .filter(event => event.photographerId === photographerId)
      .map(({ id, title, galleryPublished }) => ({ id, title, galleryPublished }));
  }

  getGallery(eventId: string, photographerId: string) {
    const event = this.store.findEventForPhotographer(eventId, photographerId);
    if (!event) return undefined;
    if (!event.galleryPublished) return { id: event.id, title: event.title, photos: [] };
    return { id: event.id, title: event.title, photos: event.photoIds };
  }

  getClientGallery(eventId: string, clientId: string) {
    const event = this.store.findClientEvent(eventId, clientId);
    if (!event || !event.galleryPublished) return undefined;
    return {
      eventId: event.id,
      title: event.title,
      photos: event.photoIds,
      availableServices: event.serviceOptions.filter(option => option.enabled)
    };
  }

  submitSelection(
    eventId: string,
    clientId: string,
    photoIds: string[],
    requestedServices: string[]
  ): PhotoSelection | undefined {
    const event = this.store.findClientEvent(eventId, clientId);
    if (!event || !event.galleryPublished) return undefined;

    // Intentionally incomplete: does not yet validate photoIds or enabled services.
    const selection: PhotoSelection = {
      id: `selection-${this.store.selections.length + 1}`,
      eventId,
      clientId,
      photoIds,
      requestedServices,
      status: "submitted",
      createdAt: new Date().toISOString()
    };
    this.store.selections.push(selection);
    return selection;
  }

  getEventForPhotographer(eventId: string, photographerId: string): EventRecord | undefined {
    return this.store.findEventForPhotographer(eventId, photographerId);
  }
}

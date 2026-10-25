import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/http/app.js";
import { store } from "../src/data/memory-store.js";

const app = createApp();

beforeEach(() => {
  store.selections = [];
});

describe("event photographer API", () => {
  it("requires a demo photographer identity", async () => {
    const response = await request(app).get("/api/events");
    expect(response.status).toBe(401);
  });

  it("lists only events belonging to the requested photographer", async () => {
    const response = await request(app)
      .get("/api/events")
      .set("x-photographer-id", "studio-amber");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe("event-100");
  });

  it("does not return another photographer's event", async () => {
    const response = await request(app)
      .get("/api/events/event-200/gallery")
      .set("x-photographer-id", "studio-amber");

    expect(response.status).toBe(404);
  });

  it("allows a client to submit a selection for their own gallery", async () => {
    const response = await request(app)
      .post("/api/events/event-100/selections")
      .set("x-client-id", "client-100")
      .send({ photoIds: ["photo-1"], requestedServices: ["retouching"] });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("submitted");
  });

  it("does not let a client access a different client's gallery", async () => {
    const response = await request(app)
      .get("/client/events/event-200/gallery")
      .set("x-client-id", "client-100");

    expect(response.status).toBe(404);
  });
});

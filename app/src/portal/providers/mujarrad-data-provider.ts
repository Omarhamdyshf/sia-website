import type { DataProvider } from "@refinedev/core";
import { MujarradClient } from "../lib/mujarrad-client";
import { EntityControlLayer } from "../lib/entity-control-layer";

const API_URL = "/mujarrad-api";
const SPACE = "sia-portal-platform";
const API_KEY = import.meta.env.VITE_MUJARRAD_PUBLIC_KEY ?? "";
const API_SECRET = import.meta.env.VITE_MUJARRAD_PRIVATE_KEY ?? "";

const client = new MujarradClient({
  apiUrl: API_URL,
  spaceSlug: SPACE,
  auth: { type: "apiKey", apiKey: API_KEY, secretKey: API_SECRET },
});

const entityLayer = new EntityControlLayer(client);

/* eslint-disable @typescript-eslint/no-explicit-any */
export const mujarradDataProvider: DataProvider = {
  getApiUrl: () => API_URL,

  async getList({ resource, pagination, filters, sorters }) {
    const result = await entityLayer.listEntities(resource, {
      filters,
      sorters,
      pagination,
    });
    return { data: result.data as any, total: result.total };
  },

  async getOne({ resource, id }) {
    const record = await entityLayer.getEntity(resource, String(id));
    return { data: record as any };
  },

  async create({ resource, variables }) {
    const record = await entityLayer.createEntity(
      resource,
      variables as Record<string, unknown>,
    );
    return { data: record as any };
  },

  async update({ resource, id, variables }) {
    const record = await entityLayer.updateEntity(
      resource,
      String(id),
      variables as Record<string, unknown>,
    );
    return { data: record as any };
  },

  async deleteOne({ resource, id }) {
    await entityLayer.deleteEntity(resource, String(id));
    return { data: { id } as any };
  },

  getMany: undefined,

  async custom({ url, method, payload, query: q, headers: customHeaders }) {
    const qs = q
      ? `?${new URLSearchParams(q as Record<string, string>).toString()}`
      : "";
    const res = await fetch(`${API_URL}${url}${qs}`, {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
        "X-API-Secret": API_SECRET,
        ...(customHeaders as Record<string, string>),
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });
    const data = res.status === 204 ? {} : await res.json();
    return { data: data as any };
  },
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export { client as mujarradClient };

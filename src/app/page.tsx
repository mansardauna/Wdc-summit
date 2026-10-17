import React from "react";
import { getStore } from "@/lib/db";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const store = await getStore();
  return <HomeClient initialCms={store.cms} />;
}

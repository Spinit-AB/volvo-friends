import { redirect } from "next/navigation";

export default function Page() {
  // Always redirect to Swedish if no lang is provided
  redirect("/sv");
}

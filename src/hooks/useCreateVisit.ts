import { supabase } from "@/integrations/supabase/client";

interface VisitPayload {
  lead_id: string;
  property_id: string;
  scheduled_at: string;
  visit_type: "physical" | "virtual";
}

export async function createVisit(payload: VisitPayload) {
  const { data, error } = await supabase
    .from("visits")
    .insert({
      lead_id: payload.lead_id,
      property_id: payload.property_id,
      scheduled_at: payload.scheduled_at,
      visit_type: payload.visit_type,
      status: "scheduled",
    })
    .select()
    .single();

  if (error) {
    console.error("Visit error:", error);
    throw error;
  }

  return data;
}
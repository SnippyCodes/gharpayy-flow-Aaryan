import { supabase } from "@/integrations/supabase/client";

interface SendMessagePayload {
  lead_id: string;
  message: string;
  direction: "inbound" | "outbound";
  channel: string;
}

export async function sendMessage(payload: SendMessagePayload) {
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      lead_id: payload.lead_id,
      message: payload.message,
      direction: payload.direction,
      channel: payload.channel,
    })
    .select()
    .single();

  if (error) {
    console.error("Message error:", error);
    throw error;
  }

  return data;
}
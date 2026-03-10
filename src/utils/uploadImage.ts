import { supabase } from "@/integrations/supabase/client";

export async function uploadImage(file: File) {

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("property-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
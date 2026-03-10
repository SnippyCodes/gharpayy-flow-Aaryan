import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export function useUserRole(userId?: string) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchRole = async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (data) setRole(data.role);
    };

    fetchRole();
  }, [userId]);

  return role;
}
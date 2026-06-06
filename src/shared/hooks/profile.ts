"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getProfileAction } from "@/src/features/user/actions";
import type { UserProfile } from "@/src/features/user/types/user.types";

type UseProfileReturn = {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

/**
 * Giriş yapmış kullanıcının profil bilgilerini (`/api/users/me`) getirir.
 * Access token httpOnly cookie'de olduğu için istek bir server action
 * üzerinden yapılır; 401 durumunda token sessizce yenilenip tekrar denenir.
 */
export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef(true);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getProfileAction();

      if (!isMountedRef.current) {
        return;
      }

      if (!result.success) {
        setProfile(null);
        setError(result.error || "Profil bilgileri alınamadı.");
        return;
      }

      setProfile(result.profile);
    } catch {
      if (!isMountedRef.current) {
        return;
      }
      setProfile(null);
      setError("Profil bilgileri alınırken bir hata oluştu.");
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    void fetchProfile();

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchProfile]);

  return { profile, isLoading, error, refetch: fetchProfile };
}

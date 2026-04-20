"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast"; 

export default function LoginSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const API_BASE = "/api";

  useEffect(() => {
    const code = searchParams.get("code");
    const redirect = searchParams.get("redirect"); 

    
    if (redirect && !code) {
  toast.error("로그인이 필요합니다");

 
  router.replace("/"); 

  return;
}

    if (!code) {
      router.replace("/"); 
      return;
    }

    const verifyLogin = async () => {
      try {
        const res = await fetch(`${API_BASE}/codeLogin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code }),
        });

        const text = await res.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch {
          data = null;
        }

        if (!res.ok) {
          const errorMessage = data?.message || "로그인 실패";
          throw new Error(errorMessage);
        }

        
        if (redirect) {
          router.replace(redirect);
        } else {
          router.replace("/");
        }
      } catch (error) {
        
        toast.error(
          error instanceof Error ? error.message : "로그인 중 오류 발생"
        );
      }
    };

    verifyLogin();
  }, [API_BASE, router, searchParams]);

  return (
  <div className="flex flex-col items-center justify-center h-screen gap-3">
  <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
  <p className="text-sm text-gray-500">카카오 로그인 처리 중...</p>
</div>
);
}
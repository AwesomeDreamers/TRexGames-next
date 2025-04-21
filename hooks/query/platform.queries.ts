"use client";
import { findPlatformAll } from "@/actions/platform.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindPlatformAll = () => {
  const query = useQuery({
    queryKey: ["platforms"],
    queryFn: findPlatformAll,
    retry: false,
    staleTime: 2592000000,
  });
  return query;
};

"use client";
import { findCategoryAll } from "@/actions/category.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindCategoryAll = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: findCategoryAll,
    retry: false,
    staleTime: 2592000000,
  });
  return query;
};

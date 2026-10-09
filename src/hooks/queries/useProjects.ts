import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { FEATURED_PROJECTS, type ProjectItem } from "@/data/projects";

export function useProjectsQuery() {
  return useQuery<ProjectItem[], Error>({
    queryKey: queryKeys.projects.list(),
    queryFn: async () => {
      return FEATURED_PROJECTS;
    },
    staleTime: 60 * 1000,
  });
}

export function useProjectDetailQuery(id: string) {
  return useQuery<ProjectItem | null, Error>({
    queryKey: queryKeys.projects.detail(id),
    queryFn: async () => {
      const found = FEATURED_PROJECTS.find((p) => p.id === id);
      return found || null;
    },
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
}

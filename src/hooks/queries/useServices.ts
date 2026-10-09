import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { SERVICES_DATA, type ServiceItem } from "@/data/services";

export function useServicesQuery() {
  return useQuery<ServiceItem[], Error>({
    queryKey: queryKeys.services.list(),
    queryFn: async () => {
      // Provides consistent client-side cached dataset
      return SERVICES_DATA;
    },
    staleTime: 60 * 1000,
  });
}

export function useServiceDetailQuery(id: string) {
  return useQuery<ServiceItem | null, Error>({
    queryKey: queryKeys.services.detail(id),
    queryFn: async () => {
      const found = SERVICES_DATA.find((s) => s.id === id);
      return found || null;
    },
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
}

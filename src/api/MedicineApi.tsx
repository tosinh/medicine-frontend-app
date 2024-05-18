import { SearchState } from "@/pages/SearchPage";
import { Medicine, MedicineSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMedicine = (medicineId?: string) => {
  const getMedicineByIdRequest = async (): Promise<Medicine> => {
    const response = await fetch(
      `${API_BASE_URL}/api/medicine/${medicineId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get medicine");
    }

    return response.json();
  };

  const { data: medicine, isLoading } = useQuery(
    "fetchMedicine",
    getMedicineByIdRequest,
    {
      enabled: !!medicineId,
    }
  );

  return { medicine, isLoading };
};

export const useSearchMedicines = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<MedicineSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCategories", searchState.selectedCategories.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/medicine/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get medicine");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchMedicines", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

import { Order, Medicine } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyMedicine = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyMedicineRequest = async (): Promise<Medicine> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/medicine`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get medicine");
    }
    return response.json();
  };

  const { data: medicine, isLoading } = useQuery(
    "fetchMyMedicine",
    getMyMedicineRequest
  );

  return { medicine, isLoading };
};

export const useCreateMyMedicine = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyMedicineRequest = async (
    medicineFormData: FormData
  ): Promise<Medicine> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/medicine`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: medicineFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create medicine");
    }

    return response.json();
  };

  const {
    mutate: createMedicine,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyMedicineRequest);

  if (isSuccess) {
    toast.success("Medicine created!");
  }

  if (error) {
    toast.error("Unable to update medicine");
  }

  return { createMedicine, isLoading };
};

export const useUpdateMyMedicine = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMedicineRequest = async (
    medicineFormData: FormData
  ): Promise<Medicine> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/medicine`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: medicineFormData,
    });

    if (!response) {
      throw new Error("Failed to update medicine");
    }

    return response.json();
  };

  const {
    mutate: updateMedicine,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateMedicineRequest);

  if (isSuccess) {
    toast.success("Medicine Updated");
  }

  if (error) {
    toast.error("Unable to update medicine");
  }

  return { updateMedicine, isLoading };
};

export const useGetMyMedicineOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyMedicineOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/medicine/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyMedicineOrders",
    getMyMedicineOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyMedicineOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyMedicineOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/medicine/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateMedicineStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyMedicineOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateMedicineStatus, isLoading };
};

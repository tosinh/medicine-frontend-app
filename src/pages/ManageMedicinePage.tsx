import {
  useCreateMyMedicine,
  useGetMyMedicine,
  useGetMyMedicineOrders,
  useUpdateMyMedicine,
} from "@/api/MyMedicineApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageMedicineForm from "@/forms/manage-medicine-form/ManageMedicineForm";

const ManageMedicinePage = () => {
  const { createMedicine, isLoading: isCreateLoading } = useCreateMyMedicine();
  const { medicine } = useGetMyMedicine();
  const { updateMedicine, isLoading: isUpdateLoading } = useUpdateMyMedicine();

  const { orders } = useGetMyMedicineOrders();

  const isEditing = !!medicine;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-medicine">Manage Medicine</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-medicine">
        <ManageMedicineForm
          medicine={medicine}
          onSave={isEditing ? updateMedicine : createMedicine}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageMedicinePage;

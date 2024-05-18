import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { categoryList } from "@/config/medicine-options-config";
import { useFormContext } from "react-hook-form";
import CategoryCheckbox from "./CategoryCheckbox";

const CategoriesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Loại</h2>
        <FormDescription>
          Chọn các loại thuốc cần cho đơn thuốc của bạn
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="categories"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {categoryList.map((categoryItem) => (
                <CategoryCheckbox key={categoryItem} category={categoryItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CategoriesSection;

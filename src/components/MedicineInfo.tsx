import { Medicine } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  medicine: Medicine;
};

const MedicineInfo = ({ medicine }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {medicine.medicineName}
        </CardTitle>
        <CardDescription>
          {medicine.city}, {medicine.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {medicine.categories.map((item, index) => (
          <span className="flex" key={index}>
            <span>{item}</span>
            {index < medicine.categories.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default MedicineInfo;

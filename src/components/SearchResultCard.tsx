import { Medicine } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  medicine: Medicine;
};

const SearchResultCard = ({ medicine }: Props) => {
  return (
    <Link
      to={`/detail/${medicine._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={medicine.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {medicine.medicineName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {medicine.categories.map((item, index) => (
              <span className="flex" key={index}>
                <span>{item}</span>
                {index < medicine.categories.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {medicine.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Giao hàng từ £{(medicine.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;

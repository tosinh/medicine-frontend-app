import landingImage from "../assets/4.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Thuốc thú y cho bạn cần
        </h1>
        <span className="text-xl">Tìm kiếm tại đây!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div>
        <img src={landingImage} className="w-full max-h-[600px] object-cover" />
      </div>
    </div>
  );
};

export default HomePage;
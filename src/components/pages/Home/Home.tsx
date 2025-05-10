import { useQuery } from "@tanstack/react-query";
import type { IMenu } from "../../../types/menu";
import { environment } from "../../../constants/environment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import type { IReview } from "../../../types/reviews";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden w-75 animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4 shimmer"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 shimmer"></div>
      <div className="h-3 bg-gray-300 rounded w-full shimmer"></div>
    </div>
  </div>
);

const Home = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['dataMenu'],
        queryFn: async () => {
        return await fetch(`${environment.API_URL}/menu`).then(
            (response) => response.json(),
        );
        },
    });

    const { data: dataReview, isLoading: isLoadingReview, isError: isErrorReview, error: errorReview } = useQuery({
      queryKey: ['dataReview'],
      queryFn: async () => {
        return await fetch(`${environment.API_URL}/reviews`).then((response) => response.json());
      },
    });

    return (
      <>
        <Link className="text-xl font-bold text-gray-800 px-6 mb-2 hover:text-2xl hover:transition duration-300" to={"/menu"} >See More Menu <FontAwesomeIcon icon="fa-solid fa-circle-arrow-right" /></Link>
        <div className="overflow-x-auto whitespace-nowrap px-6 pb-4 pt-2">
          <div className="flex space-x-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              data?.data.slice(0, 5).map((item: IMenu) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 hover:shadow-xl transition duration-300 flex-shrink-0">
                  <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">Category: {item.category}</p>
                    <p className="text-sm text-gray-600 break-words line-clamp-3">{item.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 px-6 mb-2 mt-12" >Review Customers</h2>
        <div className="overflow-x-auto whitespace-nowrap px-6 pb-4 pt-2">
          <div className="flex space-x-4 animate-scroll">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              dataReview?.data.map((item: IReview) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg w-64 hover:shadow-xl transition duration-300 flex-shrink-0 p-4">
                  <div className="flex items-center mb-3">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="Avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">{item.reviewer_name}</h3>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) =>
                          i < item.rating ? (
                            <FontAwesomeIcon
                              key={i}
                              icon="fa-solid fa-star"
                              style={{ color: "#FFD43B" }}
                              className="mr-1"
                            />
                          ) : (
                            <FontAwesomeIcon
                              key={i}
                              icon="fa-solid fa-star"
                              className="mr-1 text-gray-300"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 break-words line-clamp-3">{item.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    )
}

export default Home
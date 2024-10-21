// USE CONTAINER
import { useParams, useSearchParams } from "react-router-dom";
import Container from "../components/Container";
// import useFetch from "../hooks/useFetch";

const ListingsPage = () => {
  // //   const { city, state, categoryId } = useParams();
  //   const [searchParams] = useSearchParams();
  //   const searchTerm = searchParams.get("query");

  //   MAKE ONE /search route with serach parameters like yelp!!

  //   const url = urlForFetch();
  //   const { data, loading, error } = useFetch(url);

  //   data && console.log(data);
  return (
    <div className="pt-40">
      <Container>
        <div className="text-2xl tracking-wide leading-10 ml-6  ">
          Header - move to own component folder
        </div>
      </Container>
    </div>
  );
};

export default ListingsPage;

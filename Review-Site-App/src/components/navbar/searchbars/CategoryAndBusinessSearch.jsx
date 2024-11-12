import BusinessSearchLabel from "../BusinessSearchLabel";
import { toast } from "react-hot-toast";
import AsyncSelect from "react-select/async";

const CategoryAndBusinessSearch = ({ customStyles, noOptionsMessage }) => {
  const fetchSearchResults = async (searchParameter) => {
    // setError(null);

    try {
      const res = await fetch(
        // `http://localhost:8080/api/search/businesses_and_categories?query=${searchParameter}`
        `https://api-review-site.onrender.com/api/search/businesses_and_categories?query=${searchParameter}`
      );

      if (res.status !== 200 && res.status !== 400) {
        toast.error("Unable to fetch search results");
      }
      // error on 404 response, 400 could just mean no search results - which will be handled by
      // no Options Message
      let data = await res.json();

      data = [
        ...data.search_results.categories,
        ...data.search_results.businesses,
      ];

      // create set to track rendered businesses
      const renderedBusinesses = new Set();

      // map returned data to match label value object for react select
      // businesses will have a city / state or an indicator of multiple options
      const menuItems = data.map((item) => {
        // check business conditionals first
        if (item.type === "business") {
          if (!renderedBusinesses.has(item.name) && item.duplicate_count > 1) {
            renderedBusinesses.add(item.name);
            /* if there are multiple of the business name in db - render all results message
             * add to set to avoid re rendering same name
             */
            return {
              label: (
                <>
                  <div
                    onClick={() =>
                      handleBusinessListingsClick({
                        businessName: item.name,
                        city,
                        state,
                      })
                    }
                  >
                    {item.name}
                  </div>
                  <div className="text-neutral-600">See all results</div>
                </>
              ),
              value: item.name,
              type: "multipleBusinesses",
            };
          } else if (
            !renderedBusinesses.has(item.name) &&
            item.duplicate_count <= 1
          ) {
            // if only one occurrence of this business name
            return {
              label: <BusinessSearchLabel business={item} />,
              value: item.id,
              type: item.type,
            };
          }
        } else {
          // for categories return base object
          return {
            label: item.name,
            value: item.id,
            type: item.type,
          };
        }
      });
      // filter out undefined values from map
      return menuItems.filter((item) => item !== undefined);
    } catch (e) {
      console.log(e);

      // react select NoOptions message to handle results errors
    }
  };

  return (
    <AsyncSelect
      //   cacheOptions
      //   defaultOptions
      //   // value displayed in input on change
      //   inputValue={searchValue}
      //   // Function that returns a promise, which is the set of options to be used once the promise resolves.
      //   loadOptions={fetchSearchResults}
      noOptionsMessage={noOptionsMessage}
      //   // set on select
      //   // onChange={handleSearchChange}
      //   onChange={(value) => {
      //     handleSearchChange(value); // Set the state
      //   }}
      //   // set on input change
      //   onInputChange={handleSearchInputChange}
      placeholder="Things to do..."
      styles={customStyles}
    />
  );
};

export default CategoryAndBusinessSearch;

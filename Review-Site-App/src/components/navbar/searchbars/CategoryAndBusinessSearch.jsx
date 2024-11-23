import { forwardRef } from 'react';
import BusinessSearchLabel from './BusinessSearchLabel';
import MultiBusinessLabel from './MultiBusinessLabel';
import { toast } from 'react-hot-toast';
import AsyncSelect from 'react-select/async';

/*
 * TODO:
 *   - Add icons to default search options (categories)
 */

const CategoryAndBusinessSearch = forwardRef(
  (
    {
      customStyles,
      handleSingleBusinessClick,
      noOptionsMessage,
      setCurrentLocation,
      setSearchValue,
    },
    ref
  ) => {
    const fetchSearchResults = async (searchParameter) => {
      const res = await fetch(
        // `http://localhost:8080/api/search/businesses_and_categories?query=${searchParameter}`
        `https://api-review-site.onrender.com/api/search/businesses_and_categories?query=${searchParameter}`
      );

      if (res.status !== 200 && res.status !== 400) {
        toast.error('Unable to fetch search results');
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
        if (item.type === 'business') {
          if (!renderedBusinesses.has(item.name) && item.duplicate_count > 1) {
            renderedBusinesses.add(item.name);
            /* if there are multiple of the business name in db - render all results message
             * add to set to avoid re rendering same name
             */
            return {
              label: <MultiBusinessLabel business={item} />,
              value: item.name,
              type: 'multipleBusinesses',
            };
          } else if (
            !renderedBusinesses.has(item.name) &&
            item.duplicate_count <= 1
          ) {
            // console.log(item);
            // if only one occurrence of this business name
            // info for custom label
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
    };

    const handleSearchChange = (value) => {
      // value = {value: "", label: ""}
      // change label shown to just name for multi business label
      if (value.type === 'multipleBusinesses') {
        value.label = value.value;
      } else if (value.type === 'business') {
        // set location on single business select
        setCurrentLocation({
          city: value.label.props?.business.city,
          state: value.label.props?.business.state,
        });

        // random number of categories array index
        const randomCategory = Math.floor(
          Math.random() * value.label.props?.business.categories?.length
        );

        // pull out business data from value before changing
        const businessObj = {
          businessId: value.value,
          businessName: value.label.props?.business.name,
          categoryName:
            value.label.props?.business.categories[randomCategory]?.name,
          categoryId:
            value.label.props?.business.categories[randomCategory]?.id,
        };

        // set search value and label to a category from business
        // with type, id, and name, it will become a searchable category
        value.label = businessObj.categoryName;
        value.value = businessObj.categoryId;
        value.type = 'category';

        // navigate to businessPage
        handleSingleBusinessClick({
          businessId: businessObj.businessId,
          businessName: businessObj.businessName,
        });
      }
      setSearchValue(value);
    };

    return (
      <AsyncSelect
        // cacheOptions
        defaultOptions
        //  value displayed in input on change
        //  Function that returns a promise, which is the set of options to be used once the promise resolves.
        loadOptions={fetchSearchResults}
        noOptionsMessage={noOptionsMessage}
        //  set on select
        onChange={handleSearchChange}
        //  set on input change
        placeholder='Things to do...'
        ref={ref}
        styles={customStyles}
      />
    );
  }
);

CategoryAndBusinessSearch.displayName = 'CategoryAndBusinessSearch';
export default CategoryAndBusinessSearch;

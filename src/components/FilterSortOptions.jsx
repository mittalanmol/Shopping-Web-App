import React from "react";

function FilterSortOptions({
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
  handleSort,
}) {
  const handleFilter = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to first page after filter change
  };

  return (
    <div>
      <div>
        <h5>Filter by Category</h5>
        <div>
          <input
            type='checkbox'
            value='all'
            onChange={handleFilter}
            checked={selectedCategory === "all"} // agr selectedcategory === all to checkbox mark wrna nhi
          />
          All
        </div>

        <div>
          <input
            type='checkbox'
            value="men's clothing"
            onChange={handleFilter}
            checked={selectedCategory === "men's clothing"}
          />
          <label>Men's Clothing</label>
        </div>
        <div>
          <input
            type='checkbox'
            value="women's clothing"
            onChange={handleFilter}
            checked={selectedCategory === "women's clothing"}
          />
          <label htmlFor="women's-clothing">Women's Clothing</label>
        </div>
        <div>
          <input
            type='checkbox'
            value='jewelery'
            onChange={handleFilter}
            checked={selectedCategory === "jewelery"}
          />
          <label htmlFor='jewelery'>Jewelery</label>
        </div>

        <div>
          <input
            type='checkbox'
            value='electronics'
            onChange={handleFilter}
            checked={selectedCategory === "electronics"}
          />
          <label htmlFor='electronics'>Electronics</label>
        </div>
      </div>

      <div>
        <h5 className='mt-2'>Sort By</h5>
        <select onChange={handleSort}>
          <option value='default'>Default</option>
          <option value='priceAsc'>Price: Low to High</option>
          <option value='priceDesc'>Price: High to Low</option>
          <option value='ratingAsc'>Rating: Low to High</option>
          <option value='ratingDesc'>Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSortOptions;

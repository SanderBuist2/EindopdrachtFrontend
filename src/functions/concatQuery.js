import PropTypes from "prop-types";

export const concatQuery = (Query) => {
  let query = "?";
  if (Query.textSearch) {
    query = query + "q=" + Query.textSearch + "&";
  }
  if (Query.categoryIds1) {
    query = query + "categoryIds=1" + "&" + "categoryIds=1,2" + "&";
  }
  if (Query.categoryIds2) {
    query = query + "categoryIds=2" + "&" + "categoryIds=1,2" + "&";
  }
  if (Query.sortBy) {
    console.log(Query.sortBy);
    query = query + `_sort=${Query.sortBy}` + "&";
  }
  query.slice(0, -1);
  return query;
};

concatQuery.proptypes = {
  Query: PropTypes.shape({
    textSearch: PropTypes.string,
    categoryIds1: PropTypes.number,
    categoryIds2: PropTypes.number,
    sortBy: PropTypes.string,
  }),
};

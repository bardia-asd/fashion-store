import { Link } from "react-router";
import PropTypes from "prop-types";

const SearchTermLink = ({ term }) => {
    return (
        // Link to the products page for the selected search term
        <Link
            to="/products"
            className="px-3.5 py-2 md:px-5 md:py-2.5 rounded-full bg-muted font-medium text-xs md:text-sm">
            {/* Display the search term */}
            {term}
        </Link>
    );
};

SearchTermLink.propTypes = {
    term: PropTypes.string.isRequired,
};

export default SearchTermLink;

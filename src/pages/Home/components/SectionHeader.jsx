import PropTypes from "prop-types";

const SectionHeader = ({ eyebrow, title, actions }) => {
    return (
        // Section header with title and optional actions
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            {/* Eyebrow and section title */}
            <div>
                {/* Small label above the section title */}
                <span className="font-semibold text-[10px] text-muted-foreground">
                    {eyebrow}
                </span>

                {/* Main section title */}
                <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
                    {title}
                </h2>
            </div>

            {/* Render actions when provided */}
            {actions && <div>{actions}</div>}
        </div>
    );
};

SectionHeader.propTypes = {
    eyebrow: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    actions: PropTypes.node,
};

export default SectionHeader;

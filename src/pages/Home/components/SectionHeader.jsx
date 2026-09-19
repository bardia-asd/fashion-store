import PropTypes from "prop-types";
import { cn } from "cn";

const SectionHeader = ({ eyebrow, title, actions, direction = "col" }) => {
    return (
        // Section header with title and optional actions
        <div
            className={cn(
                "flex justify-between gap-5 mb-12",
                direction === "col"
                    ? "flex-col sm:flex-row sm:items-end"
                    : "flex-row items-end",
            )}>
            {/* Eyebrow and section title */}
            <div>
                {/* Small label above the section title */}
                <span className="font-semibold text-[10px] text-muted-foreground">
                    {eyebrow}
                </span>

                {/* Main section title */}
                <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mt-3">
                    {title}
                </h2>
            </div>

            {/* Render actions when provided */}
            {actions && (
                <div className="flex items-center gap-2">{actions}</div>
            )}
        </div>
    );
};

SectionHeader.propTypes = {
    eyebrow: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    actions: PropTypes.node,
    direction: PropTypes.oneOf(["row", "col"]),
};

export default SectionHeader;

import React from "react";

const JobCard = ({ job }) => {
  const {
    title,
    companyName,
    placeholders,
    experienceText,
    salaryDetail,
    tagsAndSkills,
    footerPlaceholderLabel,
    companyApplyJob,
    companyApplyUrl,
    applyRedirectUrl,
    additionalData,
  } = job;

  const location = placeholders?.location || "Location not specified";

  const experience =
    experienceText || placeholders?.experience || "Experience not specified";

  const salary =
    placeholders?.salary ||
    (salaryDetail?.hideSalary
      ? "Not disclosed"
      : `${salaryDetail?.minimumSalary} - ${salaryDetail?.maximumSalary}`);

  const logo = additionalData?.logoPathV3 || additionalData?.logoPath;

  const applyUrl =
    companyApplyJob && companyApplyUrl ? companyApplyUrl : applyRedirectUrl;

  return (
    <div className="w-full h-72 max-h-96 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          {/* Company Logo */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            {logo ? (
              <img
                src={logo}
                alt={`${companyName} logo`}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="text-lg font-semibold text-gray-400">
                {companyName?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </div>

          {/* Title + Company */}
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-gray-900">
              {title}
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-600">
              {companyName}
            </p>
          </div>
        </div>

        {/* Save */}
        <button
          type="button"
          className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Save job"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1-.13 2.063.73 2.063 1.838v16.017l-7.656-4.378-7.656 4.378V5.16c0-1.108.963-1.968 2.063-1.838l5.593.663 5.593-.663Z"
            />
          </svg>
        </button>
      </div>

      {/* Job Info */}
      <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-3">
        {/* Location */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-4 w-4 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <span className="truncate">{location}</span>
        </div>

        {/* Experience */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-4 w-4 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.073a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V14.15m16.5 0a2.25 2.25 0 0 0-1.98-2.232l-3.037-.38a2.25 2.25 0 0 1-1.98-2.232V7.5a3.75 3.75 0 0 0-7.5 0v1.806a2.25 2.25 0 0 1-1.98 2.232l-3.037.38A2.25 2.25 0 0 0 3.75 14.15"
            />
          </svg>

          <span>{experience}</span>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-4 w-4 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.5h5a2.5 2.5 0 1 0 0-5H10a2.5 2.5 0 1 1 0-5h5"
            />
          </svg>

          <span>{salary}</span>
        </div>
      </div>

      {/* Skills */}
      {tagsAndSkills?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tagsAndSkills.slice(0, 8).map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-gray-500">
          {footerPlaceholderLabel || "Recently posted"}
        </div>

        <a
          href={applyUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard;

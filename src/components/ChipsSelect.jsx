const ChipsSelect = ({
  options = [],
  multiple = true,
  value,
  onChange,
  // ✅ new props with defaults
  activeBg = "bg-gradient-to-r from-amber-400 to-orange-400",
  activeText = "text-white",
  inactiveBg = "bg-gray-200 hover:bg-gray-400",
  inactiveText = "text-[#7C7C7C] hover:text-gray-200",
}) => {
  const toggleChip = (chip) => {
    if (multiple) {
      const isAlreadyOn = value?.includes(chip);
      const newValue = isAlreadyOn
        ? value.filter((c) => c !== chip)
        : [...(value || []), chip];
      onChange?.(newValue);
    } else {
      const newValue = value === chip ? null : chip;
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 w-full font-geistMono font-light">
      {options.map((item, idx) => {
        const isActive = multiple ? value?.includes(item) : value === item;

        return (
          <div
            key={idx}
            onClick={() => toggleChip(item)}
            className={`cursor-pointer px-2 py-1 rounded-full transition duration-200 hover:scale-110
              ${
                isActive
                  ? `${activeBg} ${activeText} shadow-lg`
                  : `${inactiveBg} ${inactiveText}`
              }
            `}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default ChipsSelect;

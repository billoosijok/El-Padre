export const TabTitle = ({
  icon,
  label,
}: {
  icon: JSX.Element;
  label: string;
}) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span>{label}</span>
  </div>
);

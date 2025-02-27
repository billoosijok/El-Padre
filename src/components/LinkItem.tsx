import { ReactNode } from "react";
import { Link } from "react-router-dom";

import "./LinkItem.css";

interface LinkItemProps {
  children: ReactNode;
  to: string;
  Icon: React.FC<{ size: number }>;
  bg: string;
}

export function LinkItem({ children, to, Icon, bg }: LinkItemProps) {
  return (
    <Link
      className="LinkItem"
      style={{ display: "block", background: bg, backgroundSize: "cover" }}
      target={to.startsWith("https") ? "_blank" : "_self"}
      to={to}
    >
      <div className="flex flex-row gap-6">
        <Icon size={50} />
        {children}
      </div>
    </Link>
  );
}

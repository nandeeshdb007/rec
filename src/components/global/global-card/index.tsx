import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type Props = {
  title: string;
  description: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

const GlobalCard = ({ title, description, children, footer }: Props) => {
  return (
    <div className="bg-transparent mt-4 border border-white/10 rounded-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-md text-[#9d9d9d]">{title}</CardTitle>
        <CardDescription className="text-[#707070]">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <div className="pt-4 px-1 pb-1">{children}</div>}
      {footer && <CardFooter className="pt-4">{footer}</CardFooter>}
    </div>
  );
};

export default GlobalCard;

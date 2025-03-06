import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const GlobalCard = ({ title, description, children, footer }: Props) => {
  return (
    <Card className="bg-transparent mt-4">
      <CardHeader className="p-4">
        <CardTitle className="text-md text-[#9d9d9d]">{title}</CardTitle>
        <CardDescription className="text-[#707070]">
          {description}
        </CardDescription>
      </CardHeader>
      <div className="pt-4">{children}</div>
    </Card>
  );
};

export default GlobalCard;

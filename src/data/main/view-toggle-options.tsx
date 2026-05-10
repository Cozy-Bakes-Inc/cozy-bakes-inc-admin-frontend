import { ViewToggleOption } from "@/interfaces";
import { LayoutGrid, Rows3 } from "lucide-react";

export const viewToggleOptions: ViewToggleOption[] = [
  {
    value: "table",
    label: "Table",
    icon: <Rows3 className="size-4" strokeWidth={2.2} />,
  },
  {
    value: "card",
    label: "Card",
    icon: <LayoutGrid className="size-4" strokeWidth={2.2} />,
  },
];

import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export function SwitchComponent() {
  const [icon, setIcon] = useState(false);
  const { setTheme } = useTheme();

  function handleToggleTheme() {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
    setIcon((prevState) => !prevState);
  }

  return (
    <div className="flex items-center gap-2 float-right p-2 m-2 border rounded-2xl">
      {icon ? <SunIcon /> : <MoonIcon />}
      <Switch onClick={handleToggleTheme} />
    </div>
  );
}

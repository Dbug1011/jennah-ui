import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DurationSelectorProps {
  value: number; // defined in seconds
  onChange: (value: number) => void;
  className?: string;
}

export function DurationSelector({
  value,
  onChange,
  className,
}: DurationSelectorProps) {
  // Max duration is 4 hours (14400 seconds) per API
  const MAX_SECONDS = 14400;

  // Convert seconds to H/M/S for display
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  const handleSliderChange = (vals: number[]) => {
    // Slider returns minutes (0 - 240), convert to seconds
    onChange(vals[0] * 60);
  };

  const handleInputChange = (
    type: "hours" | "minutes" | "seconds",
    newVal: string,
  ) => {
    let num = parseInt(newVal) || 0;
    let newTotalSeconds = 0;

    if (type === "hours") {
      num = Math.min(Math.max(num, 0), 4);
      newTotalSeconds = num * 3600 + minutes * 60 + seconds;
    } else if (type === "minutes") {
      num = Math.min(Math.max(num, 0), 59);
      newTotalSeconds = hours * 3600 + num * 60 + seconds;
    } else {
      // seconds
      num = Math.min(Math.max(num, 0), 59);
      newTotalSeconds = hours * 3600 + minutes * 60 + num;
    }

    if (newTotalSeconds > MAX_SECONDS) {
      onChange(MAX_SECONDS);
    } else {
      onChange(newTotalSeconds);
    }
  };

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Max Duration (Timeout)</Label>
        <span className="text-sm text-muted-foreground">
          {value === 0 ? "0" : `${hours}h ${minutes}m ${seconds}s`}
        </span>
      </div>

      {/* Visual Slider (Step = 5 minutes for better UX) */}
      <Slider
        defaultValue={[0]}
        value={[value / 60]} // Convert seconds to minutes for slider position
        max={240} // 4 hours in minutes
        step={5}
        onValueChange={handleSliderChange}
        className="py-2"
      />

      <div className="flex gap-4">
        <div className="grid gap-1.5 flex-1">
          <Label htmlFor="hours-input" className="text-xs">
            Hours (Max 4)
          </Label>
          <Input
            id="hours-input"
            type="number"
            min={0}
            max={4}
            value={hours}
            onChange={(e) => handleInputChange("hours", e.target.value)}
          />
        </div>
        <div className="grid gap-1.5 flex-1">
          <Label htmlFor="minutes-input" className="text-xs">
            Minutes
          </Label>
          <Input
            id="minutes-input"
            type="number"
            min={0}
            max={59}
            value={minutes}
            onChange={(e) => handleInputChange("minutes", e.target.value)}
            disabled={hours === 4}
          />
        </div>
        <div className="grid gap-1.5 flex-1">
          <Label htmlFor="seconds-input" className="text-xs">
            Seconds
          </Label>
          <Input
            id="seconds-input"
            type="number"
            min={0}
            max={59}
            value={seconds}
            onChange={(e) => handleInputChange("seconds", e.target.value)}
            disabled={hours === 4}
          />
        </div>
      </div>

      <p className="text-[0.8rem] text-muted-foreground">
        Set to 0 to use the default timeout from your selected resource profile.
        Max limit is 4 hours.
      </p>
    </div>
  );
}

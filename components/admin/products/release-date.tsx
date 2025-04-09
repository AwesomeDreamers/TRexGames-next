"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface DatePickerProps {
  setDateValue: React.Dispatch<React.SetStateAction<Date | null>>;
  initialDate?: Date | null;
}

export function DatePicker({ setDateValue, initialDate }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | null>(initialDate || null);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
    }
  }, [initialDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[full justify-start text-left font-normal cursor-pointer",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "yyyy-MM-dd") : "출시 날짜 선택"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date!}
          onSelect={(selectedDate) => {
            setDate(selectedDate!);
            setDateValue(selectedDate!);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

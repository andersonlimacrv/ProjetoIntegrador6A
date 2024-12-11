"use client";

import * as React from "react";
import { format, getYear, setYear, setMonth, getMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
}

export function DatePicker({ startYear = getYear(new Date()) -100 , endYear = getYear(new Date()) + 1, initialDate = new Date('2000-01-01'), onDateChange } : DatePickerProps) {
  const [date, setDate] = React.useState<Date>(initialDate);
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",  
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  
  const handleMonthChange = (month: string) => {
     const newDate = setMonth(date, months.indexOf(month));
     setDate(newDate);
     onDateChange?.(newDate);
  };
  const handleYearChange = (year: string) => {
    const newDate = setYear(date, parseInt(year));
    setDate(newDate);
    onDateChange?.(newDate);
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange?.(selectedDate);
    }
  };
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[250px] justify-start text-center font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          <span className="text-muted-foreground mx-auto">
            {date ? format(date, "PPP", { locale: ptBR }) : "Escolha a data"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-between p-4 mt-2 space-x-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(date)]}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={getYear(date).toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          month={date}
          onMonthChange={setDate}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}

type Employee = {
  id: number;
  name: string;
  position: string;
  category: number;
  medical: string;
  training: "Platné" | "Končí";
  ppe: boolean;
  status: "ok" | "warning" | "error";
};

export const employees: Employee[] = [
  {
    id: 1,
    name: "Jan Novák",
    position: "Seřizovač",
    category: 3,
    medical: "25. 5. 2024",
    training: "Platné",
    ppe: true,
    status: "ok",
  },
  {
    id: 2,
    name: "Petr Svoboda",
    position: "Svářeč",
    category: 2,
    medical: "31. 8. 2024",
    training: "Končí",
    ppe: true,
    status: "warning",
  },
  {
    id: 3,
    name: "Jana Horáková",
    position: "Manipulant",
    category: 1,
    medical: "5. 6. 2024",
    training: "Platné",
    ppe: false,
    status: "error",
  },
];

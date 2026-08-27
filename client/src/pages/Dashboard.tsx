import { Users, HardHat, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import StatCard from "../components/StatCard";
import UpcomingEvents from "../components/UpcomingEvents";
import ComplianceCard from "../components/ComplianceCard";
import EmployeesSection from "../components/EmployeesSection";
import useEmployees from "../hooks/useEmployees";
import { getEmployeeMedicalExamInfo } from "../functions/medicalExam";
import { getPercentage } from "../functions/mathUtils";

type DashboardStat = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
};
const Dashboard = () => {
  const { employees, error, isLoading, loadEmployees } = useEmployees();

  const medicalExamStatusCounts = employees.reduce(
    (acc, employee) => {
      const { status } = getEmployeeMedicalExamInfo(
        employee.medicalExamDate,
        employee.category,
      );
      acc[status]++;
      return acc;
    },
    {
      valid: 0,
      expiring: 0,
      expired: 0,
      unknown: 0,
    },
  );

  const knownMedicalExamCount =
    medicalExamStatusCounts.expired +
    medicalExamStatusCounts.expiring +
    medicalExamStatusCounts.valid;

  const validPercent = getPercentage(
    medicalExamStatusCounts.valid,
    knownMedicalExamCount,
  );
  const expiringPercent = getPercentage(
    medicalExamStatusCounts.expiring,
    knownMedicalExamCount,
  );
  const expiredPercent = getPercentage(
    medicalExamStatusCounts.expired,
    knownMedicalExamCount,
  );

  const progressData = [
    { title: "Splněno", id: 1, percent: validPercent },
    {
      title: "Blíží se termín",
      id: 2,
      percent: expiringPercent,
    },
    {
      title: "Po termínu",
      id: 3,
      percent: expiredPercent,
    },
  ];

  const stats: DashboardStat[] = [
    {
      title: "Zaměstnanci",
      value: employees.length,
      description: "celkový počet zaměstnanců",
      icon: Users,
    },

    {
      title: "Vydané OOPP",
      value: 356,
      description: "vydání čeká",
      icon: HardHat,
    },
    {
      title: "Lékařské prohlídky",
      value: medicalExamStatusCounts.expiring,
      description: "končí do 30 dnů",
      icon: HeartPulse,
    },
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Přehled BOZP</h1>

      <p className="text-gray-500 mb-8">
        Aktuální stav bezpečnosti práce ve firmě
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div>
          <UpcomingEvents employees={employees} />
        </div>

        <div className="xl:col-span-2">
          <ComplianceCard
            data={progressData}
            unknownStatus={medicalExamStatusCounts.unknown}
          />
        </div>
      </div>

      <div className="mb-8">
        {isLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-600">Načítám zaměstnance...</p>
            <p className="mt-1 text-xs text-gray-400">
              První načtení může u testovací verze chvíli trvat.
            </p>
          </div>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <EmployeesSection
            employees={employees}
            showViewAll
            showAddEmployee
            onEmployeeAdded={loadEmployees}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

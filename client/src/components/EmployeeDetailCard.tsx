import type { Employee } from "../types/employee";

type EmployeeDetailCardProps = {
  employee: Employee;
};

const trainingConfig = {
  Platné: "bg-green-100 text-green-700",
  Končí: "bg-yellow-100 text-yellow-700",
};

const EmployeeDetailCard = ({ employee }: EmployeeDetailCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
        <p className="mt-1 text-sm text-gray-500">{employee.position}</p>
      </div>

      <div className="pt-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Základní informace
        </h2>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Kategorie práce</p>
          <p className="mt-1 font-medium text-gray-900">
            Kategorie {employee.category}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Lékařská prohlídka</p>
          <p className="mt-1 font-medium text-gray-900">
            {new Date(employee.medicalExamDate).toLocaleDateString("cs-CZ")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Školení</p>

          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
              trainingConfig[employee.training]
            }`}
          >
            {employee.training}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">OOPP</p>

          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
              employee.ppe
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {employee.ppe ? "V pořádku" : "Chybí výdej"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailCard;

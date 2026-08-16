import type { EmployeeFormData } from "../types/employee";

type EmployeeFormFieldsProps = {
  formData: EmployeeFormData;
  setFormData: React.Dispatch<React.SetStateAction<EmployeeFormData>>;
};

const EmployeeFormFields = ({
  formData,
  setFormData,
}: EmployeeFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Jméno
        </label>

        <input
          type="text"
          value={formData.name}
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Pozice
        </label>

        <input
          type="text"
          value={formData.position}
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              position: e.target.value,
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Kategorie
        </label>
        <select
          value={formData.category}
          onChange={(e) => {
            setFormData({
              ...formData,
              category: Number(e.target.value),
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Lékařské prohlídky
        </label>
        <input
          type="date"
          value={formData.medicalExamDate.slice(0, 10)}
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              medicalExamDate: e.target.value,
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Školení
        </label>
        <select
          value={formData.training}
          onChange={(e) => {
            setFormData({
              ...formData,
              training: e.target.value as "Platné" | "Končí",
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        >
          <option value="Platné">Platné</option>
          <option value="Končí">Končí</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          OOPP
        </label>

        <label className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            checked={formData.ppe}
            onChange={(e) => {
              setFormData({
                ...formData,
                ppe: e.target.checked,
              });
            }}
            className="h-4 w-4"
          />
          <span className="text-sm text-gray-700">Výdej OOPP v pořádku</span>
        </label>
      </div>
    </div>
  );
};

export default EmployeeFormFields;

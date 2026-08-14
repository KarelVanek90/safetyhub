import { useState } from "react";
import type { EmployeeFormData } from "../types/employee";

type EditEmployeeFormProps = {
  employee: EmployeeFormData;
  isSaving: boolean;
  saveError: string | null;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  onCancel: () => void;
};

const EditEmployeeForm = ({
  employee,
  isSaving,
  saveError,
  onSubmit,
  onCancel,
}: EditEmployeeFormProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>(employee);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit}>
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
              <span className="text-sm text-gray-700">
                Výdej OOPP v pořádku
              </span>
            </label>
          </div>
        </div>
        {saveError && <p className="mt-4 text-sm text-red-600">{saveError}</p>}
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Zrušit
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Ukládám..." : "Uložit změny"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;

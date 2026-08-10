import { useState } from "react";
import type { EmployeeFormData } from "../types/employee";
import { createEmployee } from "../services/employeesService";

type AddEmployeeFormProps = {
  onEmployeeAdded: () => void;
  onClose: () => void;
};

const AddEmployeeForm = ({
  onEmployeeAdded,
  onClose,
}: AddEmployeeFormProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    category: 1,
    medicalExamDate: "",
    training: "Platné",
    ppe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      await createEmployee(formData);

      onEmployeeAdded();
      onClose();
    } catch (error) {
      console.error("Zaměstnance se nepodařilo přidat:", error);
      setError("Zaměstnance se nepodařilo přidat.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Přidat zaměstnance
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Vyplňte základní údaje nového zaměstnance.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          Zrušit
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Kategorie práce
            </label>

            <select
              value={formData.category}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  category: Number(e.target.value),
                });
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Lékařská prohlídka platná do
            </label>

            <input
              type="date"
              value={formData.medicalExamDate}
              required
              onChange={(e) => {
                setFormData({
                  ...formData,
                  medicalExamDate: e.target.value,
                });
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="Platné">Platné</option>
              <option value="Končí">Končí</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-7">
            <input
              type="checkbox"
              name="ppe"
              checked={formData.ppe}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  ppe: e.target.checked,
                });
              }}
              className="h-4 w-4"
            />

            <label className="text-sm font-medium text-gray-700">
              OOPP vydány
            </label>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Zrušit
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Ukládám..." : "Přidat zaměstnance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;

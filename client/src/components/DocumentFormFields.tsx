import type { DocumentCategory, DocumentFormData } from "../types/document";
import type { Employee } from "../types/employee";

type DocumentFormFieldsProps = {
  formData: DocumentFormData;
  setFormData: React.Dispatch<React.SetStateAction<DocumentFormData>>;
  employees: Employee[];
};

const DocumentFormFields = ({
  formData,
  setFormData,
  employees,
}: DocumentFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Název dokumentu
        </label>

        <input
          type="text"
          value={formData.title}
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              title: e.target.value,
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
              category: e.target.value as DocumentCategory,
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        >
          <option value="employee-documentation">
            Zaměstnanecká dokumentace
          </option>
          <option value="bozp">BOZP</option>
          <option value="po">Požární ochrana</option>
          <option value="internal-regulations">Interní předpisy</option>
          <option value="other">Ostatní</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Datum vydání
        </label>

        <input
          type="date"
          value={formData.issueDate}
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              issueDate: e.target.value,
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Platnost do
        </label>

        <input
          type="date"
          value={formData.expiryDate}
          onChange={(e) => {
            setFormData({
              ...formData,
              expiryDate: e.target.value,
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Přiřazení
        </label>

        <select
          value={formData.employeeId}
          onChange={(e) => {
            setFormData({
              ...formData,
              employeeId: e.target.value,
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        >
          <option value="">Firemní dokument</option>

          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Poznámka
        </label>

        <textarea
          value={formData.note}
          onChange={(e) => {
            setFormData({
              ...formData,
              note: e.target.value,
            });
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default DocumentFormFields;

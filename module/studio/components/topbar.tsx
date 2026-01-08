// components/Topbar.tsx
'use client';

export const Topbar = () => {
  return (
    <div className="mt-3 mb-1 px-2 py-2 bg-info/20 rounded-box">
      <div className="flex items-center">

        {/* Switch */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="toggle toggle-primary toggle-sm"
          />
          <span className="text-sm">Enable</span>
        </label>

        {/* Button */}
        <button className="ml-auto btn btn-sm btn-outline btn-secondary">
          Serialize JSON to console
        </button>

      </div>
    </div>
  );
};

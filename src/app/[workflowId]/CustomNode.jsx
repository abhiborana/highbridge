import { TrashIcon } from "@heroicons/react/16/solid";
import { Handle, Position } from "@xyflow/react";

export default function CustomNode({ id, data, isConnectable }) {
  const handleDelete = () => {
    if (id !== "start" && id !== "end" && data.onDelete) {
      data.onDelete(id);
    }
  };

  // Determine node styling based on node type
  const getNodeClasses = () => {
    // Base classes for all nodes
    let classes = "relative p-3";

    if (id === "start") {
      // Start node - rounded with green background
      classes +=
        " rounded-full bg-[#849E4C] text-white shadow-lg border-4 border-[#849E4C] outline outline-4 outline-offset-4 outline-[#849E4C] aspect-square flex items-center justify-center text-base font-medium";
    } else if (id === "end") {
      // End node - rounded with red background
      classes +=
        " rounded-full bg-[#EE3425] text-white shadow-lg border-4 border-[#EE3425] outline outline-4 outline-offset-4 outline-[#EE3425] aspect-square flex items-center justify-center text-base font-medium";
    } else {
      // Regular node
      classes += " rounded-md bg-white border border-gray-200 shadow-sm pr-10";
    }

    return classes;
  };

  return (
    <div className={getNodeClasses()}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className={id === "start" ? "opacity-0" : ""}
      />
      <div
        className={`${id === "start" || id === "end" ? "font-bold text-center" : ""}`}
      >
        {data.label}
      </div>
      {id !== "start" && id !== "end" && (
        <button
          className="absolute top-1/4 right-1 cursor-pointer flex items-center justify-center"
          onClick={handleDelete}
        >
          <TrashIcon className="w-4 h-4 text-red-500" />
        </button>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className={id === "end" ? "opacity-0" : ""}
      />
    </div>
  );
}

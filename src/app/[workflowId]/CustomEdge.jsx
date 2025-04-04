import { PlusIcon } from "@heroicons/react/16/solid";
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
            background: "white",
            padding: 5,
            borderRadius: "100%",
            fontSize: 12,
            fontWeight: 500,
            border: "1px solid gray",
            cursor: "pointer",
          }}
        >
          <PlusIcon style={{ width: 16, height: 16, color: "#333" }} />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

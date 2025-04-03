"use client";

import { Button } from "@/components/ui/button";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

// Initial Nodes
const initialNodes = [
  {
    id: "start",
    type: "startNode",
    position: { x: 250, y: 50 },
    data: { label: "Start" },
  },
  {
    id: "end",
    type: "endNode",
    position: { x: 250, y: 400 },
    data: { label: "End" },
  },
];

// Initial Edges
const initialEdges = [{ id: "start-end", source: "start", target: "end" }];

// Custom Start & End Node Components
const CustomNode = ({ data }) => (
  <div className="bg-[#849E4C] text-white w-14 ring-4 flex items-center justify-center text-base ring-offset-4 ring-[#849E4C] aspect-square rounded-full p-2 text-center">
    {data.label}
  </div>
);

const CustomEndNode = ({ data }) => (
  <div className="bg-[#EE3425] text-white w-14 ring-4 flex items-center justify-center text-base ring-offset-4 ring-[#EE3425] aspect-square rounded-full p-2 text-center">
    {data.label}
  </div>
);

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(1);

  // Handle connecting nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  // Add a new step node
  const addNode = (type) => {
    const newNode = {
      id: `node-${nodeId}`,
      type: "default",
      position: { x: 250, y: 200 },
      data: { label: type },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId(nodeId + 1);
  };

  // Delete selected node
  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id),
    );
  };

  return (
    <div className="h-full w-full flex flex-col relative">
      <div
        className={
          "sticky z-[1000] top-10 py-3 px-6 bg-white shadow border border-gray-200 rounded-md left-10 w-fit h-fit gap-6 flex items-center flex-row text-base font-semibold"
        }
      >
        <Button asChild className={"underline"} variant={"ghost"}>
          <Link href={"/"}>&lt; - Go Back</Link>
        </Button>
        <span>Untitled</span>
        <SaveIcon className="size-4 shrink-0 fill-[#FBDC00]" />
      </div>
      <div className="flex flex-1 absolute inset-0 w-full h-full grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={{
            startNode: CustomNode,
            endNode: CustomEndNode,
            addNode: () => <div>Add Node</div>,
          }}
        >
          <Controls />
          <Background size={3} color="#F2E3C3" bgColor="#F8F2E7" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Workflow;

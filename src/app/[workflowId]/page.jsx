"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  addEdge,
  Background,
  Controls,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { use, useCallback, useMemo, useState } from "react";
import CustomEdge from "./CustomEdge";
import CustomNode from "./CustomNode";
import NodeDialog from "./NodeDialog";

const initialNodes = [
  {
    id: "start",
    type: "custom",
    data: { label: "Start" },
    position: { x: 0, y: 50 },
  },
  {
    id: "end",
    type: "custom",
    data: { label: "End" },
    position: { x: 300, y: 50 },
  },
];

// Define custom edge types
const edgeTypes = {
  custom: CustomEdge,
};

// Define custom node types
const nodeTypes = {
  custom: CustomNode,
};

export default function WorkflowEditor({ params }) {
  const { workflowId } = use(params);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newNodeData, setNewNodeData] = useState(null);
  const [newEdge, setNewEdge] = useState(null);

  // Define edges after dialogOpen state is declared
  const initialEdges = useMemo(
    () => [
      {
        id: "start-end",
        source: "start",
        target: "end",
        type: "custom",
      },
    ],
    [],
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onAddNode = useCallback(
    (data) => {
      const newNodeId = `node-${nodes.length}`;
      const newNode = {
        id: newNodeId,
        type: "custom",
        data: { label: data.label },
        position: { x: 150, y: 50 * (nodes.length + 1) },
      };
      setNodes((nds) => [...nds, newNode]);

      // If we have a new edge stored, update connections
      if (newEdge) {
        const sourceId = newEdge.source;
        const targetId = newEdge.target;

        // Remove original edge
        setEdges((eds) => eds.filter((e) => e.id !== newEdge.id));

        // Add two new edges
        setEdges((eds) => [
          ...eds,
          {
            id: `${sourceId}-${newNodeId}`,
            source: sourceId,
            target: newNodeId,
            type: "custom",
          },
          {
            id: `${newNodeId}-${targetId}`,
            source: newNodeId,
            target: targetId,
            type: "custom",
          },
        ]);

        // Reset new edge
        setNewEdge(null);
      } else {
        setEdges((eds) => [
          ...eds,
          {
            id: `edge-${newNodeId}`,
            source: "start",
            target: newNodeId,
            type: "custom",
          },
          {
            id: `edge-${newNodeId}-end`,
            source: newNodeId,
            target: "end",
            type: "custom",
          },
        ]);
      }

      setDialogOpen(false);
    },
    [nodes, setNodes, setEdges, newEdge],
  );

  const onEdgeClick = useCallback((evt, edge) => {
    evt.stopPropagation();
    setNewEdge(edge);
    setDialogOpen(true);
  }, []);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge({ ...params, type: "custom" }, eds));
    },
    [setEdges],
  );

  const onDeleteNode = useCallback(
    (nodeId) => {
      // Get all edges connected to this node
      const connectedEdges = edges.filter(
        (edge) => edge.source === nodeId || edge.target === nodeId,
      );

      // Get source-target pairs to reconnect after node deletion
      const reconnections = [];
      const incomingEdges = connectedEdges.filter(
        (edge) => edge.target === nodeId,
      );
      const outgoingEdges = connectedEdges.filter(
        (edge) => edge.source === nodeId,
      );

      incomingEdges.forEach((incoming) => {
        outgoingEdges.forEach((outgoing) => {
          reconnections.push({
            source: incoming.source,
            target: outgoing.target,
          });
        });
      });

      // Remove the node
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));

      // Remove connected edges
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      );

      // Add new connections
      reconnections.forEach((conn, index) => {
        setEdges((eds) => [
          ...eds,
          {
            id: `${conn.source}-${conn.target}-${index}`,
            source: conn.source,
            target: conn.target,
            type: "custom",
          },
        ]);
      });
    },
    [edges, setNodes, setEdges],
  );

  // Add onDeleteNode to each node's data
  const nodesWithDeleteHandler = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onDelete: onDeleteNode,
      },
    }));
  }, [nodes, onDeleteNode]);

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodesWithDeleteHandler}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#F2E3C3" size={3} bgColor="#F8F2E7" />
        <Controls />
        <Panel position="top-left">
          <div
            className={
              "py-3 px-6 bg-white shadow border border-gray-200 rounded-md w-fit h-fit gap-6 flex items-center flex-row text-base font-semibold"
            }
          >
            <Button asChild className={"underline"} variant={"ghost"}>
              <Link href={"/"}>&lt; - Go Back</Link>
            </Button>
            <span>{decodeURIComponent(workflowId)}</span>
            <Dialog>
              <DialogTrigger asChild>
                <SaveIcon className="size-5 shrink-0 fill-[#FBDC00] cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="max-w-3xl flex flex-col justify-between gap-6">
                <DialogHeader className={""}>
                  <DialogTitle>Save your workflow</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-normal text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={decodeURIComponent(workflowId)}
                    placeholder="Name here..."
                    className="w-full bg-white border border-gray-200 p-3 text-base rounded-md placeholder:text-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="description"
                    className="font-normal text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Write here..."
                    className="w-full bg-white border border-gray-200 p-3 text-base rounded-md placeholder:text-gray-300"
                  />
                </div>
                <DialogFooter
                  className={
                    "border-t w-full border-gray-200 pt-4 flex justify-end items-center gap-4"
                  }
                >
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className={
                        "bg-[#EE3425] text-white hover:bg-[#EE3425] hover:text-white"
                      }
                    >
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Panel>
      </ReactFlow>
      {dialogOpen && (
        <NodeDialog
          onClose={() => {
            setDialogOpen(false);
            setNewEdge(null);
          }}
          onSubmit={(data) => onAddNode(data)}
        />
      )}
    </div>
  );
}

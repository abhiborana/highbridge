"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import CircleDotIcon from "@/svgs/circleDot";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/16/solid";
import { format } from "date-fns";
import {
  EllipsisVerticalIcon,
  PinIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [workflows, setWorkflows] = useState(mockWorkFlows);
  const [execute, setExecute] = useState(false);

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      workflow.name.toLowerCase().includes(query.toLowerCase()) ||
      workflow.id.toString().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="bg-[#FDFBF6] w-full h-full p-7 flex flex-col gap-6 overflow-hidden">
        <h1 className="text-2xl font-semibold text-gray-800">
          Workflow Builder
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-xs py-2 px-3 pr-8 bg-white rounded border border-gray-200 focus:outline-[#88CAD1] w-full"
              placeholder="Search By Workflow Name/ID"
            />
            <MagnifyingGlassIcon className="absolute shrink-0 size-4 text-gray-300 right-2 top-0 h-full" />
          </div>
          <Link
            href={"/untitled"}
            className="flex text-xs gap-2 items-center font-medium text-white bg-gray-800 rounded-md px-3 py-2"
          >
            <PlusIcon className="size-4 shrink-0 text-white" />
            Create New Process
          </Link>
        </div>
        <div className="flex w-full h-full bg-white p-6 flex-col gap-6 overflow-auto">
          <Accordion
            type="single"
            collapsible
            className="w-full text-gray-600 text-sm"
          >
            <div className="grid grid-cols-12 gap-1 flex-1 text-sm font-medium text-black leading-[150%] border-b border-orange-400">
              <div className="col-span-3 pb-2 px-6">Workflow name</div>
              <div className="pb-2 px-6">ID</div>
              <div className="col-span-2 pb-2 px-6">Last Edited On</div>
              <div className="col-span-3 pb-2 px-6">Description</div>
              <div className="col-span-3 pb-2 px-6"></div>
            </div>
            {filteredWorkflows.map((workflow) => (
              <AccordionItem
                value={workflow.id}
                key={workflow.id}
                className="grid grid-cols-12 gap-1 border-b border-orange-50"
              >
                <div className="py-4 px-6 font-medium col-span-3">
                  {workflow.name}
                </div>
                <div className="py-4 px-6 col-span-1">#{workflow.id}</div>
                <div className="col-span-2 py-4 px-6 text-xs capitalize">
                  {workflow.updatedBy} |{" "}
                  {format(workflow.updatedAt, "hh:mm a 'IST' - dd/MM")}
                </div>
                <div className="col-span-3 py-4 px-6 text-xs">
                  {" "}
                  {workflow.description}
                </div>
                <div className="flex col-span-3 items-center gap-4 text-xs font-medium">
                  <button
                    onClick={() => {
                      const updatedWorkflows = workflows.map((wf) => {
                        if (wf.id === workflow.id) {
                          return { ...wf, isPinned: !wf.isPinned };
                        }
                        return wf;
                      });
                      setWorkflows(updatedWorkflows);
                    }}
                  >
                    <PinIcon
                      className={cn(
                        "size-5 shrink-0 text-gray-800 cursor-pointer",
                        workflow.isPinned ? "fill-[#FBDC00]" : "",
                      )}
                    />
                  </button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setExecute(workflow.name)}
                        className="text-gray-800 bg-white px-3 py-2 border rounded-md border-gray-200 hover:bg-gray-50"
                      >
                        Execute
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl h-64 flex flex-col items-center justify-between text-center gap-1.5">
                      <DialogHeader className={"invisible"}>
                        <DialogTitle>Execution Modal</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to Execute the process '
                          {execute}
                          '?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#333333]">
                          Are you sure you want to Execute the process '
                          {execute}
                          '?
                        </p>
                        <p className="text-[#EE3425] text-xs font-medium">
                          You cannot Undo this step
                        </p>
                      </div>
                      <DialogFooter
                        className={
                          "border-t w-full border-gray-200 pt-4 flex justify-end items-center gap-4"
                        }
                      >
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            onClick={() => setExecute(false)}
                          >
                            Yes
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            onClick={() => setExecute(false)}
                          >
                            No
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Link
                    href={`/${workflow.name}`}
                    className="text-gray-800 bg-white px-3 py-2 border rounded-md border-gray-200 hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                  <EllipsisVerticalIcon className="size-4 shrink-0 text-white" />
                  <AccordionTrigger />
                </div>
                <div className="col-span-12">
                  <AccordionContent
                    className={
                      "w-full px-9 py-6 bg-[#FFFAF2] flex flex-col gap-y-9 text-black"
                    }
                  >
                    {workflow.tests.map((test) => (
                      <div
                        key={`test-${test.id}-${workflow.id}`}
                        className="flex items-center gap-4 relative"
                      >
                        <div className="absolute w-0.5 h-14 top-1/2 left-[7px] bg-[#FFE1D2] shrink-0"></div>
                        <CircleDotIcon />
                        {/* 28/05 - 22:43 IST */}
                        <span>
                          {format(
                            new Date(test.createdAt),
                            "dd/MM - hh:mm a 'IST'",
                          )}
                        </span>
                        <Badge
                          variant={"secondary"}
                          className={cn(
                            "text-gray-800 font-normal",
                            test.success ? "bg-[#DDEBC0]" : "bg-[#F8AEA8]",
                          )}
                        >
                          {test.success ? "Passed" : "Failed"}
                        </Badge>
                        <SquareArrowOutUpRightIcon className="size-4 shrink-0 cursor-pointer" />
                      </div>
                    ))}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex w-full justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className={"hover:bg-orange-50"}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive
                    className={"bg-orange-50 hover:bg-orange-50"}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className={"hover:bg-orange-50"}>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className={"hover:bg-orange-50"}>
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className={"hover:bg-orange-50"} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const mockWorkFlows = [
  {
    id: 494,
    name: "Workflow Name here...",
    updatedBy: "zubin Khanna",
    updatedAt: "2025-04-03T05:46:46.381Z",
    description: "Some description here regarding the flow..",
    isPinned: true,
    tests: [
      {
        id: 1,
        success: true,
        createdAt: "2025-04-03T05:46:46.381Z",
      },
      {
        id: 2,
        success: false,
        createdAt: "2025-04-03T05:46:46.381Z",
      },
      {
        id: 3,
        success: true,
        createdAt: "2025-04-03T05:46:46.381Z",
      },
    ],
  },
  {
    id: 495,
    name: "Another Workflow",
    updatedBy: "alice roberts",
    updatedAt: "2025-06-10T11:32:22.381Z",
    description: "This workflow handles user registration.",
    isPinned: false,
    tests: [
      {
        id: 4,
        success: true,
        createdAt: "2025-06-10T11:32:22.381Z",
      },
      {
        id: 5,
        success: true,
        createdAt: "2025-06-10T11:32:22.381Z",
      },
    ],
  },
  {
    id: 496,
    name: "Data Processing Workflow",
    updatedBy: "john smith",
    updatedAt: "2025-07-15T09:12:00.000Z",
    description: "Workflow for processing data pipeline tasks.",
    isPinned: false,
    tests: [
      {
        id: 6,
        success: false,
        createdAt: "2025-07-15T09:12:00.000Z",
      },
      {
        id: 7,
        success: false,
        createdAt: "2025-07-15T09:12:00.000Z",
      },
      {
        id: 8,
        success: true,
        createdAt: "2025-07-15T09:12:00.000Z",
      },
    ],
  },
  {
    id: 497,
    name: "Notification Workflow",
    updatedBy: "rachel lee",
    updatedAt: "2025-08-20T14:22:30.000Z",
    description: "Handles sending notifications to users.",
    isPinned: false,
    tests: [
      {
        id: 9,
        success: true,
        createdAt: "2025-08-20T14:22:30.000Z",
      },
    ],
  },
  {
    id: 498,
    name: "Report Generation Workflow",
    updatedBy: "michael donald",
    updatedAt: "2025-09-05T16:45:10.000Z",
    description: "Generates reports from raw data.",
    isPinned: false,
    tests: [
      {
        id: 10,
        success: true,
        createdAt: "2025-09-05T16:45:10.000Z",
      },
      {
        id: 11,
        success: false,
        createdAt: "2025-09-05T16:45:10.000Z",
      },
    ],
  },
];

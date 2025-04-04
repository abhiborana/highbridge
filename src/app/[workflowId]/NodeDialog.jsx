import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function NodeDialog({ onClose, onSubmit }) {
  const [nodeType, setNodeType] = useState("API Call");
  const [formData, setFormData] = useState({
    name: "",
    method: "",
    url: "",
    headers: "",
    body: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setNodeType(value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const nodeName = formData.name || nodeType;
    onSubmit({
      label: nodeName,
      type: nodeType,
      ...formData,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Node</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Node Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Enter a name for this node"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="nodeType" className="text-sm font-medium">
              Node Type
            </label>
            <Select defaultValue={nodeType} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select node type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="API Call">API Call</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Text Box">Text Box</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {nodeType === "API Call" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="method" className="text-sm font-medium">
                  HTTP Method
                </label>
                <Select
                  defaultValue={formData.method || "GET"}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, method: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium">
                  URL
                </label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://api.example.com/endpoint"
                  value={formData.url}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="headers" className="text-sm font-medium">
                  Headers
                </label>
                <Textarea
                  id="headers"
                  name="headers"
                  placeholder="Content-Type: application/json"
                  value={formData.headers}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="body" className="text-sm font-medium">
                  Body
                </label>
                <Textarea
                  id="body"
                  name="body"
                  placeholder="{}"
                  value={formData.body}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </div>
          )}

          {nodeType === "Email" && (
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="recipient@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          )}

          {nodeType === "Text Box" && (
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Enter your message here"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
              />
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">Add Node</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

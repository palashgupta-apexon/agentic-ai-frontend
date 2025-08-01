"use client"

import React from "react"
import { useCallback, useEffect, useState, memo, useTransition } from "react"
import { Handle, Position, useReactFlow, type NodeProps } from "reactflow"
import { Wrench, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { toast } from "react-toastify"

import { fileUploadForTool, getAllUploadedFile, getUploadedFileByName } from "@/services/ToolsServices";
import { useToolStore } from "@/store/ToolStore"
import PreLoader from "../PreLoader"

function ToolNodeComponent({ id, data, selected }: NodeProps) {

  const { tools: allTools, fetchTools } = useToolStore()
  const { setNodes } = useReactFlow()
  const [isOpen, setIsOpen] = useState(false)
  const [toolName, setToolName] = useState(data?.tool_name || "New Tool")
  const [selectedTool, setSelectedTool] = useState<any>(null)
  const [schema, setSchema] = useState<any>({})
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<String>('No file selected');
  const [filePath, setFilePath] = React.useState<any>('');
  const [isDisable, setIsDisable] = React.useState<boolean>(true);
  const [allUploadedFiles, setAllUploadedFiles] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  /** set node data state */
  const [nodeData, setNodeData] = useState<{ [key: string]: any }>({
    tool_name: data?.tool_name || "",
    tool_description: data?.tool_description || "",
    tool_class_name: data?.tool_class_name || "",
    ...data,
  })

  /** Debounced update function */
  const debouncedUpdate = useCallback(
    (updatedData: any) => {
    const timeoutId = setTimeout(() => {
      startTransition(() => {
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === id) {
              const event = new CustomEvent("tool-node-updated", {
                detail: {
                  id,
                  data: updatedData,
                  position: node.position,
                },
              })
              document.dispatchEvent(event)

              return {
                ...node,
                data: {
                  ...node.data,
                  ...updatedData,
                },
              }
            }
            return node
          }),
        )
      })
    }, 300)

    return () => clearTimeout(timeoutId)
  },
  [id, setNodes]
  )

  /** On tool change */
  const handleChange = useCallback(
    async (e: any) => {
      const selected_tool_id = e.target.value;

      /** Find selected tools in all tools to save an extra API call */
      const tool = allTools.find((t) => t.original_id === selected_tool_id)
      if (!tool) return

      /** load uploaded file if rag tool is selected */
      if(e.target.value === 'RagTool') {
        await fetchAndSetUploadedFiles();
      }

      /** Set name of tool to show as card title */
      setToolName(tool.name);

      /** set selected tool in state for further use */
      setSelectedTool(tool)
      setSchema(tool.parameters_schema || {})

      /** Reset dynamic field values when changing tools */
      const newNodeData = {
        tool_name: tool.name,
        tool_id: selected_tool_id,
        tool_description: tool.description,
        tool_class_name: tool.class_name,
      }

      /** Initialize dynamic fields with default values */
      if (tool.parameters_schema) {
        Object.entries(tool.parameters_schema).forEach(([fieldName, config]: [string, any]) => {
          newNodeData[fieldName] = config.default || ""
        })
      }

      setNodeData(newNodeData)
      debouncedUpdate(newNodeData)
    },
    [allTools, debouncedUpdate],
  )

  /** On changing dynamic fields */
  const handleFieldChange = useCallback(
    (fieldName: string, value: any) => {
      setNodeData(prev => ({
        ...prev,
        [fieldName]: value,
      }));
    },
    []
  )

  /** Function to upload file */
  const doFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    let fileNameLocal = '';
    if(e.target.files && e.target.files.length > 0) {

      /** Set data in state */
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      fileNameLocal = e.target.files[0].name

      /** Create file data object */
      const formData = new FormData();
      formData.append('files', e.target.files[0]);
      
      /** Call API to upload file, immedietly after an upload */
      fileUploadForTool(formData).then( (resp: any) => {
        /** Once file is uploaded call the service to get file path */
        getUploadedFileByName(fileNameLocal).then( (resp: any) => {
          console.log(resp);
          setFilePath(resp.file_url);

          // here I need to call fileload api to re render the list.
          fetchAndSetUploadedFiles();
          setIsLoading(false);
          
        } ).catch( (err: any) => {
          setIsLoading(false);
          console.log(err);
        } );
      } ).catch( (err: any) => {
        console.log(err);
      } );      
    }
  }

  /** Function to get all uploaded files */
  const fetchAndSetUploadedFiles = async () => {
    setIsLoading(true);
    try {
      const files = await getAllUploadedFile();
      setAllUploadedFiles(files);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error("Unable to load uploaded files.");
    }
  };

  /** Function to render configuration fields dynamically */
  const renderField = useCallback((fieldName: string, config: any, index: string) => {
    const fieldValue = nodeData[fieldName] ?? config.default ?? "";
    const commonProps = {
      id: `${id}-${fieldName}`,
      name: fieldName,
      required: config.required,
      value: fieldValue,
      onBlur: () => debouncedUpdate({ ...nodeData, [fieldName]: nodeData[fieldName] }),
      className: "nodrag",
    }

    const fieldType = config.type

    return (
      <div className="grid gap-1" key={fieldName}>
        {fieldType === 'textarea' && (
          <>
            <Label className="text-xs font-medium text-muted-foreground">{config.label}</Label>
            <Textarea
              {...commonProps}
              className="resize-none nodrag"
              rows={3}
              placeholder={config.description}
              onChange={ (e: any ) => handleFieldChange(fieldName, e.target.value)}
            />
          </>
        )}
        {fieldType === 'fileupload' && (
          <>
            <Label className="text-xs font-medium text-muted-foreground">{config.label}</Label>
            <div
              className="file-input-group flex items-center"
              style={{
                border: 'solid 1px #dfdfdf',
                paddingLeft: '0.5rem',
                borderRadius: '0.5rem',
                color: 'darkgray'
              }}
            >
              <span className="file-name text-sm flex-grow">{fileName}</span>
              <div className="file-upload-group relative overflow-hidden">
                <label className="cursor-pointer inline-block">
                  <input
                    {...commonProps}
                    type="file"
                    onChange={doFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button className="bg-blue hover:bg-blue-dark w-full px-3 py-2 text-xs">
                    Upload
                  </Button>
                </label>
              </div>
            </div>
          </>
        )}
        {(fieldType === 'text' || fieldType === 'number'  )  && (
          <>
            <Label className="text-xs font-medium text-muted-foreground">{config.label}</Label>
            {
              fieldName === 'file_path' ? (
                <Input
                  {...commonProps}
                  type={fieldType}
                  placeholder={config.description}
                  disabled={true}
                  value={nodeData[fieldName] || filePath}
                />
              ) : (
                <Input
                  {...commonProps}
                  type={fieldType}
                  placeholder={config.description}
                  onChange={ (e: any ) => handleFieldChange(fieldName, e.target.value)}
                  value={nodeData[fieldName] || ''}
                />
              )
            }
            {/* <Input
              {...commonProps}
              type={fieldType}
              placeholder={config.description}
              onChange={ (e: any ) => handleFieldChange(fieldName, e.target.value)}
              disabled={ fieldName === 'file_path' ? true : false}
              {...(fieldName === 'file_path' ? { value: nodeData[fieldName] } : {})}
            /> */}
          </>
        )}
        {(fieldType === 'select') && (
          <>
            <Label className="text-xs font-medium text-muted-foreground">{config.label}</Label>
            <Select
              name="uploadedFile"
              onValueChange={(value: any) => {
                handleFieldChange(fieldName, value)
                debouncedUpdate({ ...nodeData, [fieldName]: value });
              }}
              value={nodeData.uploaded_file ?? "__none__"}
            >
              <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select A file" />
              </SelectTrigger>
              <SelectContent className="w-full max-w-[300px]">
                <SelectItem value="__none__" className="truncate px-2">Select A file</SelectItem>
                {allUploadedFiles
                  .filter((value: string) => value.trim() !== "")
                  .map((value: string, index: number) => (
                    <SelectItem key={index} value={value} className="truncate px-2 max-w-full">
                      {value}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>
    )},
    [id, nodeData, handleFieldChange, schema],
  )

  /** show dymanic fields of select tool in edit mode */
  useEffect(() => {
    if (!data?.tool_name || !allTools.length) return;
    const tool = allTools.find(
      (t: any) => t.original_id === data.tool_name || t.name === data.tool_name
    );
    if (tool) {
      setSelectedTool(tool);
      setSchema(tool.parameters_schema || {});
    }
  }, [allTools, data?.tool_name]);

  /** Initialize data from props */
  useEffect(() => {
    if (data) {
      /** When fetching the data if tool is RAG tool then call the API to list all uploaded files */
      if(data.tool_name && data.tool_name === 'RagTool') {
        fetchAndSetUploadedFiles();
      }
      setNodeData((prevData) => ({
        ...prevData,
        ...data,
      }))
      if (data.tool_name) {
        setToolName(data.tool_name)
      }
    }
  }, [data])

  /** Fetch all tools on mount; but from store only */
  useEffect(() => {
    fetchTools();
  }, [fetchTools])

  useEffect(() => {
    if (schema && Object.keys(schema).length > 0 && data) {
      const newData: Record<string, any> = {};
      for (const fieldName of Object.keys(schema)) {
        if (data[fieldName] !== undefined) {
          newData[fieldName] = data[fieldName];
        } else if (schema[fieldName].default !== undefined) {
          newData[fieldName] = schema[fieldName].default;
        }
      }

      setNodeData(prev => ({ ...prev, ...newData }));
    }
  }, [schema, data, selected]);

  useEffect(() => {
    if (filePath) {
      handleFieldChange('file_path', filePath);
      debouncedUpdate({ ...nodeData, file_path: filePath });
    }
  }, [filePath]);

  return (
    <>
      <Card className={`w-80 shadow-md node-type-tool`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-orange-500/10 text-orange-500">
              <Wrench className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-medium">{toolName}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
              Tool
            </Badge>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger className="rounded-md p-1 hover:bg-accent">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </CardHeader>

        <Collapsible open={isOpen}>
          {isLoading ? <PreLoader /> : <></>}
          <CollapsibleContent>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="grid gap-1">
                  <Label className="text-xs font-medium text-muted-foreground">Select Tool</Label>
                  <Select
                    value={nodeData.tool_id || ""}
                    onValueChange={(value) => handleChange({ target: { name: "tool_name", value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Tool" />
                    </SelectTrigger>
                    <SelectContent>
                      {allTools.map((tool) => (
                        <SelectItem key={tool.numeric_id} value={tool.original_id}>
                          {tool.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tool Description */}
                {selectedTool && (
                  <div className="grid gap-1">
                    <Label className="text-xs font-medium text-muted-foreground">Description</Label>
                    <p className="text-sm text-muted-foreground p-2 bg-muted rounded-md">{selectedTool.description}</p>
                  </div>
                )}

                {/* Dynamic Fields */}
                {Object.entries(schema).length > 0 && (
                  <div className="space-y-3">
                    <div className="border-t pt-3">
                      <Label className="text-xs font-medium text-muted-foreground">Parameters</Label>
                    </div>
                    {Object.entries(schema).map(([fieldName, config], index) => renderField(fieldName, config, `${id}-${fieldName}-${index}`))}
                  </div>
                )}

                {/* No parameters message */}
                {selectedTool && Object.entries(schema).length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">This tool has no configurable parameters.</p>
                  </div>
                )}

                {/* <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div> */}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>

        <Handle type="target" position={Position.Left} className="w-3 h-3 border-2" />
        <Handle type="source" position={Position.Right} className="w-3 h-3 border-2" />
      </Card>
    </>
  )
}

export const ToolNode = memo(ToolNodeComponent)

"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SubmissionDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  instanceId: string
  onSave?: () => void
}

interface ParsedField {
  key: string
  value: string
  label: string
}

export function SubmissionDetailDialog({ open, onOpenChange, instanceId, onSave }: SubmissionDetailDialogProps) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [xmlData, setXmlData] = useState<string>("")
  const [fields, setFields] = useState<ParsedField[]>([])
  const [error, setError] = useState<string | null>(null)

  // Parse XML to extract fields
  const parseXML = (xmlString: string): ParsedField[] => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlString, "text/xml")

    // Get the root data element
    const dataElement = xmlDoc.documentElement

    const parsedFields: ParsedField[] = []

    // Iterate through all child elements
    Array.from(dataElement.children).forEach((child) => {
      const tagName = child.tagName
      const value = child.textContent || ""

      // Skip meta fields and empty instanceID
      if (tagName !== "meta" && tagName !== "instanceID" && value) {
        // Convert camelCase or snake_case to readable label
        const label = tagName
          .replace(/([A-Z])/g, " $1")
          .replace(/_/g, " ")
          .replace(/^./, (str) => str.toUpperCase())
          .trim()

        parsedFields.push({
          key: tagName,
          value,
          label,
        })
      }
    })

    return parsedFields
  }

  // Fetch submission XML data
  const fetchSubmissionData = async () => {
    try {
      setLoading(true)
      setError(null)

      const encodedId = encodeURIComponent(instanceId)
      const response = await fetch(`/api/submissions/${encodedId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch submission data")
      }

      const xmlText = await response.text()
      setXmlData(xmlText)

      // Parse XML and extract fields
      const parsedFields = parseXML(xmlText)
      setFields(parsedFields)
    } catch (err) {
      console.error("Error fetching submission:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  // Update field value
  const updateField = (key: string, newValue: string) => {
    setFields(fields.map((field) => (field.key === key ? { ...field, value: newValue } : field)))
  }

  // Reconstruct XML with updated values
  const reconstructXML = (): string => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlData, "text/xml")
    const dataElement = xmlDoc.documentElement

    // Update values in XML
    fields.forEach((field) => {
      const element = dataElement.getElementsByTagName(field.key)[0]
      if (element) {
        element.textContent = field.value
      }
    })

    // Serialize back to string
    const serializer = new XMLSerializer()
    return serializer.serializeToString(xmlDoc)
  }

  // Save changes
  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      const updatedXML = reconstructXML()
      const encodedId = encodeURIComponent(instanceId)

      const response = await fetch(`/api/submissions/${encodedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/xml",
        },
        body: updatedXML,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update submission")
      }

      console.log("✅ Submission updated successfully")

      // Call parent callback
      if (onSave) {
        onSave()
      }

      // Close dialog
      onOpenChange(false)
    } catch (err) {
      console.error("Error updating submission:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
      alert(`Error: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setSaving(false)
    }
  }

  // Fetch data when dialog opens
  useEffect(() => {
    if (open && instanceId) {
      fetchSubmissionData()
    }
  }, [open, instanceId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Detail Submission</DialogTitle>
          <DialogDescription>
            Edit data submission dan simpan perubahan. Instance ID: {instanceId}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="ml-4 text-muted-foreground">Memuat data submission...</p>
          </div>
        ) : (
          <div className="h-[500px] overflow-y-auto pr-4">
            <div className="space-y-4">
              {fields.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Tidak ada data untuk ditampilkan</p>
              ) : (
                fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key} className="text-sm font-medium">
                      {field.label}
                    </Label>
                    {field.value.length > 100 ? (
                      <Textarea
                        id={field.key}
                        value={field.value}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <Input
                        id={field.key}
                        value={field.value}
                        onChange={(e) => updateField(field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Batal
          </Button>
          <Button onClick={handleSave} disabled={loading || saving || fields.length === 0}>
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

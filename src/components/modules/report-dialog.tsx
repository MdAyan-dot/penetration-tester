"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Printer, ShieldCheck } from "lucide-react";
import { Result } from "@/lib/modules";

interface ReportDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  results: Result[];
  moduleName: string;
}

const severityColors = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-blue-500",
};

export default function ReportDialog({
  isOpen,
  setIsOpen,
  results,
  moduleName,
}: ReportDialogProps) {

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <div id="printable-report" className="flex-grow overflow-y-auto p-8 bg-background text-foreground">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-10 text-primary" />
                <h1 className="font-headline text-4xl font-bold">
                  Security Assessment Report
                </h1>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Tool:</strong> PentestBoard</p>
              </div>
            </div>
            <Separator />
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">
                Module: <span className="text-primary">{moduleName}</span>
              </h2>
              <p className="text-muted-foreground">
                Summary of vulnerabilities and findings from the security scan.
              </p>
            </div>
          </header>

          <main>
            <h3 className="font-headline text-2xl mb-4 border-b pb-2">Findings</h3>
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="break-inside-avoid rounded-lg border bg-card p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold">{result.vulnerability}</h4>
                    <Badge className={`${severityColors[result.severity]} text-white`}>{result.severity}</Badge>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-sm text-muted-foreground">Description</h5>
                      <p className="text-sm">{result.description}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-muted-foreground">Recommendation</h5>
                      <p className="text-sm">{result.remediation}</p>
                    </div>
                  </div>
                </div>
              ))}
               {results.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No vulnerabilities found.</p>
              )}
            </div>
          </main>
        </div>
        <DialogFooter className="p-4 border-t print:hidden">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2" /> Print Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

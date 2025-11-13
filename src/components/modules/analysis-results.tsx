"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";
import { Result } from "@/lib/modules";
import ReportDialog from './report-dialog';

interface AnalysisResultsProps {
  results: Result[];
  moduleName: string;
}

const severityConfig = {
  Critical: {
    variant: "destructive",
    icon: AlertTriangle,
    className: "text-destructive",
  },
  High: {
    variant: "destructive",
    icon: AlertTriangle,
    className: "text-destructive/80",
  },
  Medium: {
    variant: "secondary",
    icon: ShieldAlert,
    className: "text-yellow-500",
  },
  Low: {
    variant: "outline",
    icon: ShieldCheck,
    className: "text-muted-foreground",
  },
} as const;

export default function AnalysisResults({ results, moduleName }: AnalysisResultsProps) {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <>
      <Card className="border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="font-headline text-2xl text-primary">Analysis Complete</CardTitle>
            <CardDescription>
              {results.length} issue(s) found in {moduleName}.
            </CardDescription>
          </div>
          <Button onClick={() => setIsReportOpen(true)}>
            <FileText className="mr-2" />
            Generate Report
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Severity</TableHead>
                <TableHead>Vulnerability</TableHead>
                <TableHead className="w-[120px] text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => {
                const SeverityIcon = severityConfig[result.severity].icon;
                return (
                  <TableRow key={result.id}>
                    <TableCell>
                      <Badge variant={severityConfig[result.severity].variant} className="gap-1.5">
                        <SeverityIcon className="size-3.5"/>
                        {result.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{result.vulnerability}</p>
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-semibold ${result.status === 'Vulnerable' ? 'text-destructive' : result.status === 'Warning' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {result.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ReportDialog 
        isOpen={isReportOpen} 
        setIsOpen={setIsReportOpen}
        results={results}
        moduleName={moduleName}
      />
    </>
  );
}

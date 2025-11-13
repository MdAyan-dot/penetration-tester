"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Terminal } from "lucide-react";
import type { SecurityModule, Result } from "@/lib/modules";
import AnalysisResults from "./analysis-results";

interface SecurityModuleViewProps {
  module: SecurityModule;
}

export default function SecurityModuleView({ module }: SecurityModuleViewProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<Result[] | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setScanResults(module.mockResults);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isScanning, module.mockResults]);

  const handleRunScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <module.icon className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl">{module.name}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        {!scanResults && (
           <CardContent className="flex flex-col items-center justify-center space-y-4 pt-8 pb-12 text-center">
            {isScanning ? (
              <>
                <Progress value={scanProgress} className="w-3/4 max-w-md" />
                <p className="text-muted-foreground animate-pulse">Scanning... {Math.round(scanProgress)}%</p>
                <p className="text-sm text-muted-foreground/80">Analyzing targets and potential vulnerabilities</p>
              </>
            ) : (
              <>
                <p className="text-lg">Ready to start the security scan.</p>
                <Button size="lg" onClick={handleRunScan}>
                  <Terminal className="mr-2" />
                  Run Scan
                </Button>
              </>
            )}
          </CardContent>
        )}
      </Card>
      
      {scanResults && (
        <AnalysisResults results={scanResults} moduleName={module.name} />
      )}
    </div>
  );
}

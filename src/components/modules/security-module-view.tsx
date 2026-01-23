"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { SecurityModule, Result } from "@/lib/modules";
import AnalysisResults from "./analysis-results";

interface SecurityModuleViewProps {
  module: SecurityModule;
}

export default function SecurityModuleView({ module }: SecurityModuleViewProps) {
  const [target, setTarget] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<Result[] | null>(null);
  const [currentScanTarget, setCurrentScanTarget] = useState("");

  useEffect(() => {
    // Reset view when module changes
    setTarget("");
    setScanResults(null);
    setIsScanning(false);
    setScanProgress(0);
  }, [module]);

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
    if (!target) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);
    setCurrentScanTarget(target);
  };
  
  const getPlaceholder = () => {
    switch(module.id) {
      case 'network-scan':
        return 'e.g., 192.168.1.1 or example.com';
      case 'webapp-audit':
        return 'e.g., https://example.com';
      case 'sql-injection':
        return 'e.g., https://api.example.com/users?id=1';
      case 'auth-bypass':
        return 'e.g., https://app.example.com/login';
      default:
        return 'Enter target URL or IP address';
    }
  }

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
                <p className="text-muted-foreground animate-pulse">Scanning {currentScanTarget}... {Math.round(scanProgress)}%</p>
                <p className="text-sm text-muted-foreground/80">Analyzing for potential vulnerabilities</p>
              </>
            ) : (
              <div className="w-full max-w-lg space-y-3">
                <p className="text-lg font-medium">Ready to Scan</p>
                <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder={getPlaceholder()}
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="flex-1 text-base"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && target) {
                          handleRunScan();
                        }
                      }}
                    />
                    <Button size="lg" onClick={handleRunScan} disabled={!target}>
                        <Terminal className="mr-2" />
                        Run Scan
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Enter a target URL or IP address to begin the security assessment.
                </p>
              </div>
            )}
          </CardContent>
        )}
      </Card>
      
      {scanResults && (
        <AnalysisResults results={scanResults} moduleName={`${module.name} on '${currentScanTarget}'`} />
      )}
    </div>
  );
}

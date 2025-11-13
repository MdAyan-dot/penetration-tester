"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { securityModules } from "@/lib/modules";

interface WelcomeProps {
  onModuleSelect: (id: string) => void;
}

export default function Welcome({ onModuleSelect }: WelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-12 text-center">
      <h1 className="font-headline text-4xl font-bold tracking-tight">
        Welcome to <span className="text-primary">PentestBoard</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Your centralized hub for web security assessments. Select a module from the sidebar to begin analyzing your applications and networks for vulnerabilities.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {securityModules.map((module) => (
          <Card key={module.id} className="text-left transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                  <module.icon className="size-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-lg">{module.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
              <Button className="w-full" variant="outline" onClick={() => onModuleSelect(module.id)}>
                Select
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
